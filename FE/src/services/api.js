import axios from 'axios';
import {  getSession } from '../utils/config';



// Base URL for the backend server
const api = axios.create({
  baseURL: 'http://localhost:4000', // Backend base URL
  withCredentials: true, // Include credentials (cookies) with each request
});

// Function to get CSRF token
export const getCsrfToken = async () => {
  try {
    const response = await api.get('/csrf-token'); // Fetch CSRF token from the server
    console.log('CSRF Token:', response.data.csrfToken); // Log the CSRF token
    return response.data.csrfToken;
  } catch (error) {
    console.log('Error fetching CSRF token:', error); // Log any errors
    return null;
  }
};

// Add a request interceptor for CSRF token
api.interceptors.request.use(async (config) => {
  if (['post', 'put', 'delete'].includes(config.method)) {
    const csrfToken = await getCsrfToken();
    if (csrfToken) {
      config.headers['CSRF-Token'] = csrfToken;
    }
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});


// Function to validate session for specific endpoints
const validateSession = async () => {
  const sessionData = await getSession();
  if (!sessionData) {
    throw new Error('Session invalid or expired');
  }
};

// Auth Endpoints (no session validation needed)
const registerUser = async (userData) => {
  return await api.post('/auth/signup', userData);
};

const loginUser = async (loginData) => {
  return await api.post('/auth/login', loginData);
};
const verifyOTP = async (verifyOTP) => {
  return await api.post('/auth/verify-otp', verifyOTP);
};

 const logoutUser = async () => {
  return await api.post('/auth/logout');
 }
// User Endpoints (session validation needed)
const getUserById = async (userId) => {
 
  return await api.get(`/users/${userId}`);
};

const updateUser = async (userId, updateData) => {
  //await validateSession();
  return await api.put(`/users/${userId}`, updateData);
};

const deleteUser = async (userId) => {
  //await validateSession();
  return await api.delete(`/users/${userId}`);
};

const getDoctorsBySpecialty = async (specialtyName, ) => {
  
  return await api.get(`/doctors/by-specialty/${specialtyName}`);
};

const getScheduleByDoctorID = async (doctorID ) => {
  
  return await api.get(`/doctors/by-specialty/${doctorID }`);
};
const getAllSpecialties = async () => {
  return await api.get(`/speciality`);
}

// Appointment Endpoints (session validation needed)
const getAppointments = async () => {
  await validateSession();
  return await api.get('/appointments');
};

const bookAppointment = async (appointmentData) => {
  await validateSession();
  return await api.post('/appointments/book', appointmentData);
};

const cancelAppointment = async (appointmentId) => {
  await validateSession();
  return await api.delete(`/appointments/${appointmentId}`);
};

// Schedule Endpoints (session validation needed)
const getScheduleByDoctor = async (doctorId) => {
  await validateSession();
  return await api.get(`/schedule/${doctorId}`);
};

const addTimeSlot = async (timeSlotData) => {
  await validateSession();
  return await api.post('/timeslot', timeSlotData);
};

const updateTimeSlot = async (scheduleId, updateData) => {
  await validateSession();
  return await api.put(`/timeslot/${scheduleId}`, updateData);
};

const markUnavailable = async (scheduleId) => {
  await validateSession();
  return await api.put(`/timeslot/unavailable/${scheduleId}`);
};

const createTimeSlots = async (timeSlotsData) => {
  await validateSession();
  return await api.post('/timeslots', timeSlotsData);
};

// Export all functions
export {
  registerUser,
  loginUser,
  verifyOTP,
  getUserById,
  getAllSpecialties,
  getDoctorsBySpecialty,
  getScheduleByDoctorID,
  logoutUser,
  updateUser,
  deleteUser,
  getAppointments,
  bookAppointment,
  cancelAppointment,
  getScheduleByDoctor,
  addTimeSlot,
  updateTimeSlot,
  markUnavailable,
  createTimeSlots,
};
