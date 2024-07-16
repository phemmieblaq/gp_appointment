import * as yup from "yup";
//import { parsePhoneNumberFromString } from "libphonenumber-js";
const FILE_SIZE = 1024 * 1024; // 1 MB
const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png', 'application/pdf'];

export const userRegistrationSchema = yup.object().shape({
  first_name: yup.string().required("Enter your first name"),
  last_name: yup.string().required("Enter your last name"),
   dateOfBirth: yup.string().required ("kindly pick your date of birth"),
   email: yup.string().email("Enter a valid email address").required("Enter your email"),
   phone: yup.string().min(10, "Invalid phone number").required("Enter your phone number"),
  gender: yup.string().required("pick your gender"),
  // file: yup.mixed()
  //   .required("A file is required")
  //   .test("fileSize", "File size is too large", value => {
  //     return value && value.size <= FILE_SIZE;
  //   })
  //   .test("fileFormat", "Unsupported file format", value => {
  //     return value && SUPPORTED_FORMATS.includes(value.type);
  //   }),

 
  password: yup
    .string()
    .min(6)
    .max(15)
    .required("Enter a password")
    .matches(/^(?=.*[A-Z])/, " Must Contain One Uppercase Character")
    .matches(/^(?=.*[a-z])/, " Must Contain One Lowercase Character")
    .matches(/^(?=.*[0-9])/, "  Must Contain One Number"),


});
