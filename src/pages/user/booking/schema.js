import * as yup from "yup";
import { sanitizeInput } from "../../../utils/config";





export const userBookingSchema = yup.object().shape({

  
  reasons: yup
    .string()
    .required("Please provide a reason for booking an appointment")
    .min(20, "Reason must be at least 20 characters long")
    .max(500, "Reason must not exceed 500 characters")
    .test('is-sanitized', 'Reason contains potentially malicious content', value => {
      const sanitizedValue = sanitizeInput(value);
      return sanitizedValue === value;
    }),
    department: yup.string().required ("kindly pick the department you want to book an appointment with"),
    doctor: yup.string().required ("kindly pick the department you want to book an appointment with"),
    descriptions: yup
    .string()
    .required("Please provide a reason for booking an appointment")
    .min(20, "Reason must be at least 20 characters long")
    .max(500, "Reason must not exceed 500 characters")
    .test('is-sanitized', 'Reason contains potentially malicious content', value => {
      const sanitizedValue = sanitizeInput(value);
      return sanitizedValue === value;
    }),
    date: yup.string().required("kindly pick a date for the appointment"),
    time: yup.string().required("kindly pick a time for the appointment"),
});

export  const otpSchema = yup.object().shape({

  otp: yup
    .string()
    .required("Please provide the OTP sent to your email address")
    .matches(/^\d{6}$/, "OTP must be a 6-digit number"),
});


