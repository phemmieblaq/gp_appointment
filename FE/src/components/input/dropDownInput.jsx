import React, { useState } from "react";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";
import './style.css';

const DropDownInput = ({
  Options,
  errorMessage,
  label,
  initialValue,
  handleChange, // Accept handleChange as a prop
  useObjectOptions = false, // New prop to determine if Options is an array of objects
}) => {
  const [selectedValue, setSelectedValue] = useState(initialValue);
  const [open, setOpen] = useState(false);

  const handleOpenDropdown = () => {
    setOpen(!open);
  };

  const handleSelect = (selected) => {
    setSelectedValue(useObjectOptions ? selected.name : selected);
    setOpen(false);
    if (handleChange) {
      handleChange(selected); // Call the handleChange function when a selection is made
    }
  };

  return (
    <div className={`custom-div `} key="DropDownInput">
      <div className="Top">
        {label && <label className='Label'>{label}</label>}
        {errorMessage ? <div className='ErrMsg'>{errorMessage}</div> : null}
      </div>

      <div className={`InputWrapper ${errorMessage ? 'error' : ''}`}>
        <div
          onClick={handleOpenDropdown}
          style={{
            width: "100%",
            display: "flex",
            justifyContent: 'space-between',
            alignItems: 'center',
            height: "100%",
          }}>
          <div className="showList">
            {selectedValue}
          </div>
          <div className='ShowListIcon'>
            {open ? (
              <HiChevronUp size={24} color="#4E5152" />
            ) : (
              <HiChevronDown size={24} color="#4E5152" />
            )}
          </div>
        </div>
        {open && (
          <>
            <div className='InvisibleBackDrop' onClick={() => setOpen(false)} />
            <div className='DropDown'>
              <div className="ListItems">
                {Options.map((option, index) => (
                  <div className='ListItem' key={index} onClick={() => handleSelect(option)}>
                    {useObjectOptions ? option.name : option}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DropDownInput;
