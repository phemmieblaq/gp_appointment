import * as yup from "yup";
const sanitizeInput = (value) => {
  // Example: Simple check for script tags
  const hasScript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi.test(value);
  if (hasScript) {
    return false; // Indicates invalid input if script tags are found
  }
  return true; // Indicates valid input if no script tags are found
};

export const userBookingSchema = yup.object().shape({

  
  reasons: yup
    .string()
    .required("Please provide a reason for booking an appointment")
    .min(20, "Reason must be at least 20 characters long")
    .max(500, "Reason must not exceed 500 characters")
    .test('is-safe', 'Input contains invalid characters', value => sanitizeInput(value)), 
    department: yup.string().required ("kindly pick th e department you want to book an appointment with"),
    descriptions: yup
    .string()
    .required("Please provide a reason for booking an appointment")
    .min(20, "Reason must be at least 20 characters long")
    .max(500, "Reason must not exceed 500 characters")
    .test('is-safe', 'Input contains invalid characters', value => sanitizeInput(value)),
    date: yup.string().required("kindly pick a date for the appointment"),
    time: yup.string().required("kindly pick a time for the appointment"),
});



