import React, { useState, useEffect } from "react";
import { Controller, useWatch } from "react-hook-form";
import axios from "axios";
import { useContext } from "react";
import { AddressContext } from "../../pages/contextApi";
import { InputWrapper, Wrapper, Input, Label, ErrMsg, Top } from "./styled";
import { useRef } from "react";

const PostalCodeAddress = ({
  control,
  clearErrors,
  setError,
  errors,
  label,
  name,

  disable,
  labelStyle,
}) => {
  const { setAddress } = useContext(AddressContext);
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

  // Watch for changes in the postal code input
  const postcode = useWatch({ control, name: "postcode" });

  useEffect(() => {
    const fetchAddress = async () => {
      if (postcode && postcode.length > 0) {
        try {
          const response = await axios.get(
            `https://api.postcodes.io/postcodes/${postcode}`
          );
          setAddress(response.data.result);
          clearErrors("postcode"); // Clear error if the postcode is valid
        } catch (error) {
          setError("postcode", {
            type: "manual",
            message: "Invalid postal code",
          });
          setAddress(null);
        }
      }
    };

    fetchAddress();
  }, [postcode, setError, clearErrors, setAddress]);

  return (
    <Wrapper>
      <Top>
        {label && <Label className={labelStyle}>{label}</Label>}

        {errors.postcode ? <ErrMsg>{errors?.postcode?.message}</ErrMsg> : null}
      </Top>

      <InputWrapper
        border={
          errors?.postcode?.message
            ? "1px solid red"
            : active
            ? "1px solid #3c0fbd"
            : "1px solid #ececec"
        }
        ref={inputRef}
        onFocus={() => handleBorder(true)}
        onBlur={() => handleBorder(false)}
        disable={disable}
      >
        <Input
          {...control.register(name)}
          type="text"
          placeholder="Enter UK postal code"
        />
      </InputWrapper>
    </Wrapper>
  );
};

export default PostalCodeAddress;
