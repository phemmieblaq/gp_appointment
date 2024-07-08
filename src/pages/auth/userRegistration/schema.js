import * as yup from "yup";
//import { parsePhoneNumberFromString } from "libphonenumber-js";

export const userRegistrationSchema = yup.object().shape({
  first_name: yup.string().required("Enter your first name"),
  last_name: yup.string().required("Enter your last name"),
  dateOfBirth: yup.string().required ("kindly pick your check in date"),
  email: yup.string().email("Enter a valid email address").required("Enter your email"),
  phone: yup.string().min(10, "Invalid phone number").required("Enter your phone number"),
 
  password: yup
    .string()
    .min(6)
    .max(15)
    .required("Enter a password")
    .matches(/^(?=.*[A-Z])/, " Must Contain One Uppercase Character")
    .matches(/^(?=.*[a-z])/, " Must Contain One Lowercase Character")
    .matches(/^(?=.*[0-9])/, "  Must Contain One Number"),


});
