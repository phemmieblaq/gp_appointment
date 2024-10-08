const express = require("express");
const userController = require("../controller/userController");
const specialityController = require("../controller/specialityController");
const schedulesController = require("../controller/schedulesController");
const patientController = require("../controller/patientController");
const appointmentController = require("../controller/appointmentController");
const doctorController = require("../controller/doctorController");

const authenticateToken = require("../middleware/authMiddleware");
const authorizer = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/auth/signup", userController.addUser);
router.get("/user/:email", userController.getUserByEmail);

//router.get('/user/:id', userController.getUserById)
router.post("/auth/login", userController.loginUser);
router.post("/auth/verify-otp", userController.verifyOTP);

router.post("/auth/logout", userController.logoutUser);
router.post("/auth/token", userController.token);
router.post("/password/verify-otp", userController.verifyPasswordOtp);
router.post("/forgot-password", userController.forgotPassword);
router.post("/reset-password", userController.passwordReset);
router.delete("/delete-user", userController.deleteUserByEmail);

router.post("/speciality", authorizer, specialityController.addSpecialty);
router.get("/speciality", specialityController.getAllSpecialties);
router.get(
  "/doctors/by-specialty/:specialty",
  doctorController.getDoctorsBySpecialty
);

router.get("/schedule/:doctorId", schedulesController.getSchedule);
router.post("/timeslot", authorizer, schedulesController.addTimeSlot);
router.put(
  "/timeslot/:scheduleId",
  authorizer,
  schedulesController.updateTimeSlot
);
router.put(
  "/timeslot/unavailable/:scheduleId",
  authorizer,
  schedulesController.markUnavailable
); // Route for marking unavailable
router.post("/timeslots", authorizer, schedulesController.createTimeSlots); // Route for creating multiple time slots
router.get(
  "/available-timeslots/:doctorId",
  schedulesController.getAvailableTimeSlots
);

router.get(
  "/patient-records/patient/:patientId",
  patientController.getPatientRecordsByPatientId
);
router.get(
  "/patient-record/:recordId",
  patientController.getPatientRecordDetails
);
router.post("/patient-record", authorizer, patientController.addPatientRecord);

router.post(
  "/book/:scheduleId",
  authorizer,
  appointmentController.bookAppointment
);
router.get(
  "/appointments/:doctor_id",
  appointmentController.GetAppointmentsByDoctorId
);
router.get(
  "/appointments/patient/:patient_id",

  appointmentController.GetAppointmentsByPatientId
);

router.delete(
  "/appointment/:appointmentId",
  authorizer,
  appointmentController.DeleteAppointmentsById
);

router.post("/medical-history/", authorizer, userController.addUserHistory);
router.get("/medical-history/:userId", userController.getHistoryByUserId);
router.put(
  "/medical-history/:historyId/:userId",
  authorizer,
  userController.updateUserHistory
);

module.exports = router;
