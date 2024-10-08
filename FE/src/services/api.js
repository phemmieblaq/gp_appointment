import axios from "axios";
import { getSession } from "../utils/config";

// Base URL for the backend server
const api = axios.create({
  baseURL: "http://localhost:5500", // Backend base URL
  withCredentials: true, // Include credentials (cookies) with each request
});

// Function to get CSRF token
export const getCsrfToken = async () => {
  try {
    const response = await api.get("/csrf-token"); // Fetch CSRF token from the server
    console.log("CSRF Token:", response.data.csrfToken); // Log the CSRF token
    return response.data.csrfToken;
  } catch (error) {
    console.log(error);
    console.log("Error fetching CSRF token:", error); // Log any errors
    return null;
  }
};

// Add a request interceptor for CSRF token
api.interceptors.request.use(
  async (config) => {
    if (["post", "put", "delete"].includes(config.method)) {
      const csrfToken = await getCsrfToken();
      if (csrfToken) {
        config.headers["CSRF-Token"] = csrfToken;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Function to validate session for specific endpoints
const validateSession = async () => {
  const sessionData = await getSession();
  if (!sessionData) {
    throw new Error("Session invalid or expired");
  }
};

// Auth Endpoints (no session validation needed)
const registerUser = async (userData) => {
  return await api.post("/auth/signup", userData);
};

const loginUser = async (loginData) => {
  return await api.post("/auth/login", loginData);
};
const verifyOTP = async (verifyOTP) => {
  return await api.post("/auth/verify-otp", verifyOTP);
};

const logoutUser = async () => {
  return await api.post("/auth/logout");
};
// User Endpoints (session validation needed)
const getUserById = async (userId) => {
  return await api.get(`/users/${userId}`);
};

const updateUser = async (userId, updateData) => {
  //
  return await api.put(`/users/${userId}`, updateData);
};

const deleteUser = async (userId) => {
  //
  return await api.delete(`/users/${userId}`);
};

const getDoctorsBySpecialty = async (specialtyName) => {
  return await api.get(`/doctors/by-specialty/${specialtyName}`);
};

const getScheduleByDoctorID = async (doctorID) => {
  return await api.get(`/doctors/by-specialty/${doctorID}`);
};
const getAllSpecialties = async () => {
  return await api.get(`/speciality`);
};

// Appointment Endpoints (session validation needed)
const getAppointments = async () => {
  return await api.get("/appointments");
};

const bookAppointment = async (appointmentData) => {
  //
  return await api.post(`/book/${appointmentData?.scheduleId}`, {
    reason: appointmentData?.reason,
    patient_id: appointmentData?.patient_id,
  });
};

const cancelAppointment = async (appointmentId) => {
  return await api.delete(`/appointments/${appointmentId}`);
};

// Schedule Endpoints (session validation needed)
const getScheduleByDoctor = async (doctorId) => {
  //
  return await api.get(`/schedule/${doctorId}`);
};

const addTimeSlot = async (timeSlotData) => {
  //
  return await api.post("/timeslot", timeSlotData);
};

const updateTimeSlot = async (scheduleId, updateData) => {
  return await api.put(`/timeslot/${scheduleId}`, updateData);
};

const markUnavailable = async (scheduleId) => {
  return await api.put(`/timeslot/unavailable/${scheduleId}`);
};
const getAppointmentsList = async (doctor_id) => {
  return await api.get(`/appointments/${doctor_id}`);
};
const getAppointmentsListPatientId = async (patient_id) => {
  //
  return await api.get(`/appointments/patient/${patient_id}`);
};
const deleteAppointment = async (appointmentId) => {
  return await api.delete(`/appointment/${appointmentId}`);
};

const createTimeSlots = async (timeSlotsData) => {
  return await api.post("/timeslots", timeSlotsData);
};
const forgotPassword = async (payload) => {
  return await api.post("/forgot-password", payload);
};
const verifyPasswordOTP = async (payload) => {
  return await api.post("/password/verify-otp", payload);
};
const resetPassword = async (payload) => {
  return await api.post("/reset-password", payload);
};
const addUserHistory = async (payload) => {
  return await api.post("/medical-history", payload);
};
const getUserHistory = async (patientId) => {
  return await api.get(`/medical-history/${patientId}`);
};
const updateUserHistory = async (payload, historyId, userId) => {
  return await api.put(`/medical-history/${historyId}/${userId}`, payload);
};
// Export all functions
export {
  registerUser,
  loginUser,
  forgotPassword,
  verifyPasswordOTP,
  verifyOTP,
  resetPassword,
  getUserById,
  getAllSpecialties,
  getDoctorsBySpecialty,
  getScheduleByDoctorID,
  deleteAppointment,
  logoutUser,
  updateUser,
  deleteUser,
  getAppointments,
  addUserHistory,
  getUserHistory,
  updateUserHistory,
  bookAppointment,
  cancelAppointment,
  getAppointmentsList,
  getScheduleByDoctor,
  getAppointmentsListPatientId,
  addTimeSlot,
  updateTimeSlot,
  markUnavailable,
  createTimeSlots,
};
