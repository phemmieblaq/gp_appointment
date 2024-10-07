import React, { useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import { IoIosArrowDown } from "react-icons/io";
import { MdClear } from "react-icons/md";
import { TextWrapper } from "./styled";

const TagInputWithSearch = ({
  label, // The input label
  list, // The list of options
  placeholder, // The placeholder
  MultiSelect, //
  MaxError,
  maxTag,
  ExistsError, // The error displayed when typed value does not match the available options
  MatchError, // The error to display when reselecting an already selected value
  EmptyError, // () The error to display when no value is selected
  customError,
  getValue = () => {}, // (function): returns the selected tags as an argument
  initialValue,
  initialValues,
  suggestionLoading,
  noSuggestionText,
  fetchingText,
  fetchFailedText,
  disabled,
  validateTag,
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredList, setFilteredList] = useState(list);
  const [tags, setTags] = useState([]);
  const [error, setError] = useState(false);
  const [value, setValue] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [keyPressed, setKeyPressed] = useState("");

  const inputRef = useRef();
  const suggestionContainer = useRef();

  // This sets the tag values (if available) on mounth
  useEffect(() => {
    if (initialValues) {
      setTags([...initialValues]);
    }
  }, [initialValues]);

  // This sets the select value (if available) on mounth
  useEffect(() => {
    if (initialValue) {
      setValue(initialValue);
    }
  }, [initialValue]);

  // Update list when it chages
  const theList = useMemo(() => list, [list]);

  useEffect(() => {
    setFilteredList(theList);
  }, [theList]);

  useEffect(() => {
    if (keyPressed === "ArrowDown") {
      if (selectedIndex > 4) {
        suggestionContainer.current.scrollBy(0, 56);
      }
    } else if (keyPressed === "ArrowUp") {
      if (selectedIndex < filteredList?.length - 5) {
        suggestionContainer.current.scrollBy(0, -56);
      }
    }
  }, [selectedIndex, filteredList?.length, keyPressed]);

  // This function handles the input tag change event
  const handleChange = (e) => {
    let value = e.target.value;
    setError("");
    setValue(value);
    setShowSuggestions(true);
    let match = list.filter((element) => element.toLowerCase().includes(value.toLowerCase()));
    setFilteredList(match);
  };

  // This fires off when a value is selected
  const setSelected = (value) => {
    if (tags?.length > (maxTag || 3)) {
      setError(MaxError);
      return "error";
    }
    let tagAlreadyExists = tags.filter(
      (element) => element.trim().toLowerCase() === value.trim().toLowerCase()
    );
    if (tagAlreadyExists?.length > 0) {
      setError(ExistsError);
      return "error";
    }
    return "noError";
  };

  // This function handles the input tag keydown event
  const handleKeyDown = (e) => {
    let key = e.key;
    let value = e.target.value;

    if (key !== "Enter") {
      setError("");
      // This runs if an arrow up key is pressed
      if (key === "ArrowUp") {
        setKeyPressed("ArrowUp");
        if (selectedIndex > 0) {
          setSelectedIndex(selectedIndex - 1);
          return;
        }
      }
      // This runs if an arrow down key is pressed
      if (key === "ArrowDown") {
        setKeyPressed("ArrowDown");
        if (selectedIndex < list?.length - 1) {
          setSelectedIndex(selectedIndex + 1);
          return;
        }
      }
    }
    // This runs if an Enter key is pressed
    const handleEnter = () => {
      if (MultiSelect) {
        let res = setSelected(value);
        if (res === "error") return;

        let valueCheck = list.filter(
          (element) => element.trim().toLowerCase() === value.trim().toLowerCase()
        );
        if (valueCheck?.length !== 0) {
          setTags([...tags, ...valueCheck]);
          setError("");
          return;
        } else if (valueCheck?.length === 0) {
          setError(MatchError);
          return;
        }
        if (tags?.length === 0) {
          setError(EmptyError);
          return;
        }
      }
    };
    if (selectedIndex !== -1) {
      setValue(filteredList[selectedIndex]);
      setSelectedIndex(-1);
      setShowSuggestions(false);
      handleEnter();
      return;
    }
    handleEnter();
  };

  // This function is fired when a drop down suggestion is clicked
  const handleSuggestionClick = (value) => {
    if (MultiSelect) {
      let res = setSelected(value);
      if (res === "error") return;
      setError("");
      setValue("");
      setTags([...tags, value]);
      return;
    } else {
      getValue(value);
    }

    setValue(value);
  };

  // This function handles individual tag delete when clear(X) icon is clicked
  const handleTagDelete = (removedTag) => {
    setError("");
    let filteredTags = tags.filter((tag) => tag !== removedTag);
    setTags(filteredTags);
  };

  const handleNotExistAdd = () => {
    let res = setSelected(value);
    if (res === "error") return;
    if (validateTag) {
      const valid = validateTag(value);
      if (valid?.error) return;
    }
    setValue("");
    setTags([...tags, value]);
  };

  // This sends back the input data
  useEffect(() => {
    if (getValue && MultiSelect) {
      getValue(tags);
    }
  }, [tags.length]);

  return (
    <Container>
      <Title>
        <span>{label}</span>
        <ErrorMsg>{error}</ErrorMsg>
        {customError && <ErrorMsg>{customError}</ErrorMsg>}
      </Title>
      <Tags>
        {tags.map((tag, index) => (
          <Tag key={index}>
            <span>{tag}</span>{" "}
            <MdClear style={{ cursor: "pointer" }} size={20} onClick={() => handleTagDelete(tag)} />
          </Tag>
        ))}
      </Tags>
      <InputWrapper>
        <Input>
          <input
            ref={inputRef}
            type="text"
            placeholder={placeholder || "--"}
            value={value}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setShowSuggestions(false)}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            disabled={disabled}
          />
          <div onClick={() => inputRef.current.focus()}>
            <IoIosArrowDown size={16} style={{ backgroundColor: "white", padding: "" }} />
          </div>
        </Input>
        {showSuggestions && (
          <Suggestions ref={suggestionContainer}>
            {suggestionLoading && (
              <NoSuggestion $loading={suggestionLoading}>
                <span>{fetchingText}</span>
              </NoSuggestion>
            )}
            {!suggestionLoading && list?.length === 0 && tags?.length === 0 && (
              <NoSuggestion>
                <span>{fetchFailedText || "Could not fetch suggestions"}</span>
              </NoSuggestion>
            )}
            {MultiSelect &&
              filteredList?.length === 0 &&
              (list?.length > 0 || tags?.length > 0) && (
                <NoSuggestion>
                  <span>{noSuggestionText}</span>
                  <button onMouseDown={handleNotExistAdd}>Add</button>
                </NoSuggestion>
              )}
            {filteredList.map((element, index) => (
              <li
                key={index}
                onMouseDown={() => handleSuggestionClick(element)}
                style={{
                  backgroundColor: selectedIndex === index ? "#edf1f7" : "",
                }}
              >
                {element}
              </li>
            ))}
          </Suggestions>
        )}
      </InputWrapper>
    </Container>
  );
};

export default TagInputWithSearch;

// Styled components
const Container = styled.div`
  display: flex;
  flex-flow: column;
  flex: 1;
  gap: 8px;
`;
const Title = styled.div`
  display: flex;
  justify-content: space-between;
  color: #4e5152;
  font-size: clamp(12px, 1.5rem, 14px);
  font-weight: 500;
`;
const Tags = styled.div`
  display: flex;
  flex-flow: row wrap;
  gap: 10px;
`;
const ErrorMsg = styled.span`
  font-size: clamp(10px, 1.5rem, 12px);
  color: red;
`;
const Tag = styled.p`
  display: flex;
  align-items: center;
  gap: 0.5em;
  font-size: clamp(12px, 1.5vw, 14px);
  color: white;
  background-color: #0082aa;
  border-radius: 8px;
  padding: clamp(4px, 1vw, 7px) clamp(7px, 1vw, 11px);
  text-transform: capitalize;
`;
const InputWrapper = styled.div`
  position: relative;
  display: flex;
  flex-flow: column;
`;
const Input = styled.div`
  position: relative;
  display: flex;
  > input {
    border: 1px solid #edf1f6;
    padding: 24px;
    border-radius: 8px;
    height: 48px;
    width: 100%;
    outline: 0;
    transition: 0.3s all ease;
    &:focus {
      border: 1px solid #00c3ff;
      /* box-shadow: -2px -2px 4px 2px #00c3ff28, 2px 2px 4px 2px #00c3ff28; */
    }

    &::placeholder {
      opacity: 0.7;
    }
  }
  > div {
    position: absolute;
    top: 19px;
    right: 25px;
    color: #151717;
  }
`;
const Suggestions = styled.div`
  position: absolute;
  top: 52px;
  display: flex;
  flex-flow: column;
  width: 100%;
  max-height: 296px;
  overflow-y: scroll;
  background-color: white;
  border: 1px solid #edf1f7;
  border-radius: 8px;
  box-shadow: 0 10px 15px #9d9d9d44;
  z-index: 1;
  > li {
    display: flex;
    align-items: center;
    min-height: 56px;
    padding: 24px;
    list-style-type: none;
    transition: 0.3s all ease;
    font-size: clamp(13px, 1.5vw, 14px);
    &:hover {
      background-color: #edf1f7;
    }
  }
  &::-webkit-scrollbar {
    width: 6px;
    border-radius: 50%;
    background-color: white;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #edf1f7;
  }
`;

export const NoSuggestion = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding-block: 10px;
  font-size: 14px;
  color: #717171;
  animation: ${({ $loading }) => $loading && "suggession"} 1s ease infinite;

  button {
    padding: 5px;
    border: none;
    outline: none;
    border-radius: 5px;
    background-color: #00c3ff;
    transition: 0.3s ease all;
    cursor: pointer;

    :hover {
      opacity: 0.8;
    }
  }

  @keyframes suggession {
    0% {
      color: #717171;
    }
    50% {
      color: #aeaeae;
    }
    100% {
      color: #717171;
    }
  }
`;
