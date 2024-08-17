import React, { useEffect, useRef, useState } from "react";
import { Wrapper, Label, ErrMsg, Top } from "./styled";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./flag.css";

const NumberInput = ({
  label,
  labelStyle,
  containerStyle,
  edit,
  error,
  errorMessage,
  container,
  onSelectedChange = () => {},
  placeholder,
  onChange,
  value,
  type,
  options,
  name,
  phoneInputStyles,
  register,
  ...rest
}) => {
  const [active, setActive] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (active) {
      inputRef.current.focus();
    }
  }, [active]);

  const activeStyle = {
    border: "1px solid #3c0fbd",
    height: "48px",
    borderRadius: "10px",
    // marginTop: "20px",
  };

  const nonActiveStyle = {
    border: "1px solid #ececec",
    height: "48px",
    borderRadius: "10px",
    // marginTop: "20px",
  };

  const errorStyle = {
    border: "1px solid red",
    height: "48px",
    borderRadius: "10px",
  };

  return (
    <Wrapper>
      <Top>
        {label && <Label className={labelStyle}>{label}</Label>}
        {errorMessage ? <ErrMsg>{errorMessage}</ErrMsg> : null}
      </Top>
      <div
        // className={errorMessage ? "error" : active ? "active" : "nonActive"}
        className={errorMessage ? "error" : ""}
        ref={inputRef}
        onFocus={() => setActive(true)}
        onBlur={() => setActive(false)}
        // style={
        //   !errorMessage && active
        //     ? { ...activeStyle, ...phoneInputStyles }
        //     : { ...nonActiveStyle, ...phoneInputStyles }
        // }
        style={
          !errorMessage
            ? active
              ? { ...activeStyle, ...phoneInputStyles }
              : { ...nonActiveStyle, ...phoneInputStyles }
            : { ...errorStyle, ...phoneInputStyles }
        }
        // style={phoneInputStyles}
      >
        <PhoneInput
          country={"gb"}
          // countryCallingCodeEditable={false}
          value={value}
          onChange={onChange}
          containerStyle={{
            height: "100%",
            borderRadius: "20px",
          }}
          // inputProps={{
          //   name: 'phone',
          //   required: true,
          //   type: 'tel',
          // }}
          inputStyle={{
            paddingLeft: "clamp(60px, 4vw, 65px)",
            width: "100%",
            height: "95%",
            fontSize: phoneInputStyles?.fontSize,
          }}
        />
      </div>
    </Wrapper>
  );
};

export default NumberInput;
