const addUser =
  "INSERT INTO Users (first_name, last_name, phone_number,email, password,gender,date_of_birth,role) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *";

const getUserByEmail = "SELECT * FROM Users WHERE email = $1";
const checkEmailExists = "SELECT 1 FROM Users WHERE email = $1";
const checkUsernameExists = "SELECT 1 FROM Users WHERE username = $1";
const deleteUserByEmail = "DELETE FROM Users WHERE email = $1";
const getUserById = "SELECT * FROM Users WHERE user_id = $1";

const addSpecialty = `INSERT INTO specialties (specialty_name, description) VALUES ($1, $2) RETURNING *`;
const getAllSpecialties = `SELECT * FROM specialties`;
const getSpecialtyByName = `SELECT * FROM specialties WHERE specialty_name = $1`;

const getDoctorsBySpecialty = `
  SELECT 
    s.specialty_name,
    d.doctor_id,
    u.user_id,
    u.first_name || ' ' || u.last_name AS doctor_name,
    u.email
  FROM 
    Doctors d
  JOIN 
    Users u ON d.user_id = u.user_id
  JOIN 
    Specialties s ON d.specialty_id = s.specialty_id
  WHERE
    s.specialty_name = $1
  ORDER BY 
    doctor_name;
`;

const addDoctor = `INSERT INTO doctors (user_id, specialty_id) VALUES ($1, $2) RETURNING *`;
const getDoctorById = `SELECT * FROM doctors WHERE user_id = $1`;
const getSchedule = `
  SELECT * FROM Schedules
  WHERE doctor_id = $1
  ORDER BY available_date
`;

const getScheduleById = `
  SELECT * FROM Schedules
  WHERE schedule_id = $1
`;
const getAppointmentById = `
  SELECT * FROM appointments
  WHERE appointment_id = $1
`;

const updateSchedule = `
  UPDATE Schedules
  SET available_date = $1
  WHERE doctor_id = $2
`;

const viewPatients = `
  SELECT Users.user_id, Users.first_name, Users.last_name, Users.email, Users.phone_number
  FROM Users
  JOIN Appointments ON Users.user_id = Appointments.patient_id
  WHERE Appointments.doctor_id = $1
  GROUP BY Users.user_id
`;

const viewAppointments = `
  SELECT Appointments.appointment_id, Appointments.appointment_date, Appointments.status, Appointments.reason, 
         Users.first_name AS patient_first_name, Users.last_name AS patient_last_name
  FROM Appointments
  JOIN Users ON Appointments.patient_id = Users.user_id
  WHERE Appointments.doctor_id = $1
  ORDER BY Appointments.appointment_date
`;

const addTimeSlot = `
  INSERT INTO Schedules (doctor_id, available_date, start_time, end_time)
  VALUES ($1, $2, $3, $4)
  RETURNING *
`;

const updateTimeSlot = `
  UPDATE Schedules SET is_booked = TRUE WHERE schedule_id = $1 RETURNING *;
`;

const markUnavailable = `
  UPDATE Schedules
  SET is_booked = TRUE
  WHERE schedule_id = $1
  RETURNING *
`;

const getAvailableTimeSlots = `
  SELECT s.*, u.first_name || ' ' || u.last_name AS doctor_name
  FROM Schedules s
  JOIN Doctors d ON s.doctor_id = d.doctor_id
  JOIN Users u ON d.user_id = u.user_id
  WHERE s.doctor_id = $1 AND s.available_date >= CURRENT_DATE AND s.is_booked = FALSE
  ORDER BY s.available_date, s.start_time
`;

const bookAppointment = `
  INSERT INTO Appointments (patient_id, doctor_id, schedule_id, appointment_date, start_time, end_time, reason)
  VALUES ($1, $2, $3, $4, $5, $6, $7)
  RETURNING *;
`;
const getAppointments = `SELECT appointment_id, patient_id, doctor_id, schedule_id, appointment_date, start_time, end_time, reason FROM Appointments WHERE doctor_id = $1`;
const getAppointmentsByUserId = `SELECT appointment_id, patient_id, doctor_id, schedule_id, appointment_date::date, start_time, end_time, reason FROM Appointments WHERE patient_id = $1`;
const getPatientRecordsByPatientId = `
  SELECT pr.*, u.first_name, u.last_name, u.email, u.gender, u.date_of_birth, u.phone_number
  FROM PatientRecords pr
  JOIN Users u ON pr.patient_id = u.user_id
  WHERE pr.patient_id = $1
`;

const getPatientRecordDetails = `
  SELECT pr.*, u.first_name, u.last_name, u.email, u.gender, u.date_of_birth, u.phone_number
  FROM PatientRecords pr
  JOIN Users u ON pr.patient_id = u.user_id
  WHERE pr.record_id = $1
`;

const addPatientRecord = `
  INSERT INTO PatientRecords (
    patient_id, description, prescription, allergies, family_medical_history, past_medical_history, current_medication
  ) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *
`;

const deleteAppointmentById =
  "DELETE FROM appointments WHERE appointment_id = $1";

const addHistory = `INSERT INTO medication_history (
  user_id, sugar_level, blood_pressure, allergies, 
  last_medication, genotype, blood_group, 
  vaccination_history, smoking_status, alcohol_consumption, 
  current_medications, immunization_status
) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
RETURNING *`;

const historyByUserId = "SELECT * FROM medication_history WHERE user_id = $1";

const updateHistory = `UPDATE medication_history SET 
sugar_level = $1, blood_pressure = $2, allergies = $3,
last_medication = $4, genotype = $5, blood_group = $6, 
vaccination_history = $7, smoking_status = $8, 
alcohol_consumption = $9, current_medications = $10, 
immunization_status = $11, updated_at = CURRENT_TIMESTAMP
WHERE history_id = $12 AND user_id = $13`;

module.exports = {
  addHistory,
  historyByUserId,
  updateHistory,
  addUser,
  getUserByEmail,
  checkEmailExists,
  checkUsernameExists,
  getUserById,
  deleteUserByEmail,
  getAppointments,

  addSpecialty,
  getAllSpecialties,
  getSpecialtyByName,
  getAppointmentById,
  getDoctorsBySpecialty,

  addDoctor,
  getDoctorById,

  getSchedule,
  getScheduleById,
  updateSchedule,
  getAppointmentsByUserId,
  viewPatients,
  bookAppointment,
  deleteAppointmentById,
  viewAppointments,

  addTimeSlot,
  updateTimeSlot,
  markUnavailable,
  getAvailableTimeSlots,

  getPatientRecordsByPatientId,
  getPatientRecordDetails,
  addPatientRecord,
};
