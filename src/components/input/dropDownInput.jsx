import React, { useState, useEffect, useRef } from "react";
import { InputWrapper, Wrapper, Label, ErrMsg, Top, Select } from "./styled";

const DropDownInput = ({
  label,
  labelStyle,
  containerStyle,
  edit,
  error,
  errorMessage,
  OptionValues,
  onSelectedChange = () => {},
  container,
  placeholder,
  secureTextEntry,
  type,
  name,
  register,
  ...rest
}) => {
  const handleChange = (e) => {
    let selectedValue = e.target.value;
    onSelectedChange(selectedValue);
  };
  let options = OptionValues.map((data) => (
    <option key={data} value={data} style={{ color: "red" }}>
      {data}
    </option>
  ));
  const [active, setActive] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (active) {
      inputRef.current.focus();
    }
  }, [active]);
  const handleBorder = (bool) => {
    setActive(bool);
  };

  
  return (
    <Wrapper
      key="DropDownInput"
      className={containerStyle}
      
    >
      <Top>
        {label && <Label className={labelStyle}>{label}</Label>}

        {errorMessage ? <ErrMsg>{errorMessage}</ErrMsg> : null}
      </Top>

      <InputWrapper
      border={errorMessage ? "1px solid red" : active ? "1px solid #00A2D4" : "1px solid #ececec"}
     
      ref={inputRef}
      onFocus={() => handleBorder(true)}
      onBlur={() => handleBorder(false)}
      >
        <Select onChange={handleChange} {...register(name)}>
          <options style={{ backgroundColor: "red" }} value="">
            Select
          </options>
          {options}
        </Select>
      </InputWrapper>
    </Wrapper>
  );
};

export default DropDownInput;
