import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import {
  ErrMsg,
  Input,
  InputWrapper,
  Label,
  Top,
  Wrapper,
} from "../input/styled";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";

const validationSchema = yup.object().shape({
  file: yup
    .mixed()
    .required("A file is required")
    .test("fileSize", "File is too large", (value) => {
      return value && value.size <= 2000000; // 2MB
    })
    .test("fileType", "Unsupported File Format", (value) => {
      return value && ["image/jpeg", "image/png"].includes(value.type);
    }),
});

const FileUpload = ({
  label,
  labelStyle,
  errorMessage,
  setValue,
  control,
  errors,
}) => {
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

  // const { control, handleSubmit, setValue, formState: { errors } } = useForm({
  //   resolver: yupResolver(validationSchema),
  // });

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      setValue("file", acceptedFiles[0], { shouldValidate: true });
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
  });

  return (
    <Wrapper>
      <Top>
        {label && <Label className={labelStyle}>{label}</Label>}

        {errorMessage ? <ErrMsg>{errorMessage}</ErrMsg> : null}
      </Top>

      <InputWrapper
        {...getRootProps({ className: "dropzone" })}
        border={
          errorMessage
            ? "1px solid red"
            : active
            ? "1px solid #3c0fbd"
            : "1px solid #ececec"
        }
        ref={inputRef}
        onFocus={() => handleBorder(true)}
        onBlur={() => handleBorder(false)}
      >
        <Input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </InputWrapper>
      {errors.file && <div className="error">{errors.file.message}</div>}
      <Controller
        name="file"
        control={control}
        render={({ field }) => (
          <div>
            {field.value && (
              <div>
                <strong>Selected file:</strong> {field.value.name}
              </div>
            )}
          </div>
        )}
      />
    </Wrapper>
  );
};

export default FileUpload;
