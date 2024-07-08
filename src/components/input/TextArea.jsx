import React, { useState, useEffect, useRef } from "react";
import {
  InputWrapper,
  Wrapper,
  Input,
  Label,
  Iconwrapper,
  RightIconwrapper,
  TextWrapper,
  ErrMsg,
  Top,
  Show,
  BottomText,
  WarnMsg,
  TextArea,
} from "./styled";

const Textarea = ({
  label,
  labelStyle,
  containerStyle,
  maxHeight,
  edit,
  error,
  errorMessage,
  warningMessage,
  rightText,
  leftText,
  leftIcon,
  rightIcon,
  container,
  placeholder,
  secureTextEntry,
  type,
  text,
  name,
  password,
  register,
  bottomText,
  topStyles,
  inputClass,
  bottomTextClass,
  disable,
  onChange,
  onBlur,
  onKeyDown = () => {},
  maxNumber,
  defaultValue,
  value,
  ref,
  inputId,
  nextElementId,
  step,
  overlayComponent,
  ...rest
}) => {
  const [show, setShow] = useState(false);
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

  const handleKeyDown = (e) => {
    onKeyDown(e);
    if (e.key === "Enter" && nextElementId) {
      e.preventDefault();
      let element = document.getElementById(nextElementId);
      element.focus();
    }
  };

  return (
    <Wrapper
      
    >
      <Top>
        {label && <Label className={labelStyle}>{label}</Label>}

        {errorMessage ? <ErrMsg>{errorMessage}</ErrMsg> : null}
        {warningMessage ? <WarnMsg>{warningMessage}</WarnMsg> : null}
      </Top>

      <InputWrapper
        border={errorMessage ? "1px solid red" : active ? "1px solid #00A2D4" : "1px solid #ececec"}
        height={maxHeight}
        className={inputClass}
        ref={inputRef}
        onFocus={() => handleBorder(true)}
        onBlur={() => handleBorder(false)}
        disable={disable}
      >
        {leftIcon && <Iconwrapper><img src={leftIcon} alt="" />   </Iconwrapper>}
        {leftText && <TextWrapper>{leftText}</TextWrapper>}
        {register ? (
          <TextArea
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
            edit={edit}
            type={!show ? type || "password" : "text"}
            step={step || "any"}
            name={name}
            id={inputId}
            disabled={disable}
            max={maxNumber}
            height={maxHeight}
            value={value}
            // onChange={onChange}
            onKeyDown={handleKeyDown}
            defaultValue={defaultValue}
            {...register(name, { onChange: onChange })}
            {...rest}
          > </TextArea>
        ) : (
          <TextArea
            ref={ref}
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
            edit={edit}
            type={!show ? type || "password" : "text"}
            step={step || "any"}
            name={name}
            id={inputId}
            disabled={disable}
            max={maxNumber}
            defaultValue={defaultValue}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            onKeyDown={handleKeyDown}
            {...rest}
          />
        )}
        {rightIcon && <RightIconwrapper><img src={rightIcon} alt="" /></RightIconwrapper>}
        {rightText ? (
          <div onClick={() => setShow(!show)}>
            <Show>{!show ? "show" : "hide"}</Show>
          </div>
        ) : null}

        {overlayComponent && overlayComponent}
      </InputWrapper>

      {bottomText ? <BottomText className={bottomTextClass}>{bottomText}</BottomText> : null}
    </Wrapper>
  );
};

export default Textarea;
