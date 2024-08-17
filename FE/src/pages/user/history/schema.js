import * as yup from "yup";
import { sanitizeInput } from "../../../utils/config";

export const medicalHistorySchema = yup.object().shape({
  sugar_level: yup
    .string()
    .nullable()
    .test(
      "is-sanitized",
      "Sugar level contains potentially malicious content",
      (value) => {
        const sanitizedValue = sanitizeInput(value);
        return sanitizedValue === value;
      }
    ),

  blood_pressure: yup
    .string()
    .nullable()
    .test(
      "is-sanitized",
      "Blood pressure contains potentially malicious content",
      (value) => {
        const sanitizedValue = sanitizeInput(value);
        return sanitizedValue === value;
      }
    ),

  allergies: yup
    .string()
    .nullable()
    .test(
      "is-sanitized",
      "Allergies contains potentially malicious content",
      (value) => {
        const sanitizedValue = sanitizeInput(value);
        return sanitizedValue === value;
      }
    ),

  last_medication: yup
    .string()
    .nullable()
    .test(
      "is-sanitized",
      "Last medication contains potentially malicious content",
      (value) => {
        const sanitizedValue = sanitizeInput(value);
        return sanitizedValue === value;
      }
    ),

  genotype: yup
    .string()
    .nullable()
    .test(
      "is-sanitized",
      "Genotype contains potentially malicious content",
      (value) => {
        const sanitizedValue = sanitizeInput(value);
        return sanitizedValue === value;
      }
    ),

  blood_group: yup
    .string()
    .nullable()
    .test(
      "is-sanitized",
      "Blood group contains potentially malicious content",
      (value) => {
        const sanitizedValue = sanitizeInput(value);
        return sanitizedValue === value;
      }
    ),

  vaccination_history: yup
    .string()
    .nullable()
    .test(
      "is-sanitized",
      "Vaccination history contains potentially malicious content",
      (value) => {
        const sanitizedValue = sanitizeInput(value);
        return sanitizedValue === value;
      }
    ),

  smoking_status: yup.boolean().nullable(),

  alcohol_consumption: yup.boolean().nullable(),

  current_medications: yup
    .string()
    .nullable()
    .test(
      "is-sanitized",
      "Current medications contains potentially malicious content",
      (value) => {
        const sanitizedValue = sanitizeInput(value);
        return sanitizedValue === value;
      }
    ),

  immunization_status: yup
    .string()
    .nullable()
    .test(
      "is-sanitized",
      "Immunization status contains potentially malicious content",
      (value) => {
        const sanitizedValue = sanitizeInput(value);
        return sanitizedValue === value;
      }
    ),
});
