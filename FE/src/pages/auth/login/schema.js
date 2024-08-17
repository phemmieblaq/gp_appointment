import * as yup from "yup";

export const userLoginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Enter a valid email address")
    .required("Enter your email"),

  password: yup
    .string()
    .min(6)
    .max(15)
    .required("Enter a password")
    .matches(/^(?=.*[A-Z])/, " Must Contain One Uppercase Character")
    .matches(/^(?=.*[a-z])/, " Must Contain One Lowercase Character")
    .matches(/^(?=.*[0-9])/, "  Must Contain One Number"),
});

export const userForgotSchema = yup.object().shape({
  email: yup
    .string()
    .email("Enter a valid email address")
    .required("Enter your email"),
});

export const passwordSchema = yup.object().shape({
  newPassword: yup
    .string()
    .min(6)
    .max(15)
    .required("Enter a password")
    .matches(/^(?=.*[A-Z])/, " Must Contain One Uppercase Character")
    .matches(/^(?=.*[a-z])/, " Must Contain One Lowercase Character")
    .matches(/^(?=.*[0-9])/, "  Must Contain One Number"),
});
