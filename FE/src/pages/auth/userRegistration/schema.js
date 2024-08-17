import * as yup from "yup";
import { sanitizeInput } from "../../../utils/config";

export const userRegistrationSchema = yup.object().shape({
  first_name: yup
    .string()
    .required("Enter your first name")
    .test(
      "is-sanitized",
      "first name contains potentially malicious content",
      (value) => {
        const sanitizedValue = sanitizeInput(value);
        return sanitizedValue === value;
      }
    ),
  last_name: yup
    .string()
    .required("Enter your last name")
    .test(
      "is-sanitized",
      "last name contains potentially malicious content",
      (value) => {
        const sanitizedValue = sanitizeInput(value);
        return sanitizedValue === value;
      }
    ),
  dateOfBirth: yup.string().required("kindly pick your date of birth"),
  email: yup
    .string()
    .email("Enter a valid email address")
    .required("Enter your email"),
  phone: yup
    .string()
    .min(10, "Invalid phone number")
    .required("Enter your phone number"),
  gender: yup.string().required("pick your gender"),

  password: yup
    .string()
    .min(6)
    .max(15)
    .required("Enter a password")
    .matches(/^(?=.*[A-Z])/, " Must Contain One Uppercase Character")
    .matches(/^(?=.*[a-z])/, " Must Contain One Lowercase Character")
    .matches(/^(?=.*[0-9])/, "  Must Contain One Number"),
});
