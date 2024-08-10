<<<<<<< HEAD
const addUser = 'INSERT INTO Users (first_name, last_name, phone_number,email, password,gender,date_of_birth,role) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *';

const getUserByEmail = 'SELECT * FROM Users WHERE email = $1';
const checkEmailExists = 'SELECT 1 FROM Users WHERE email = $1';
const checkUsernameExists = 'SELECT 1 FROM Users WHERE username = $1';
const deleteUserByEmail = 'DELETE FROM Users WHERE email = $1';
const getUserById = 'SELECT * FROM Users WHERE user_id = $1';



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



const getSchedule = `
  SELECT * FROM Schedules
  WHERE doctor_id = $1
  ORDER BY available_date
`;

const getScheduleById = `
  SELECT * FROM Schedules
  WHERE schedule_id = $1
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








module.exports = {
  addUser,
  getUserByEmail,
  checkEmailExists,
  checkUsernameExists,
  getUserById,
  deleteUserByEmail,

  addSpecialty,
  getAllSpecialties,
  getSpecialtyByName,
  getDoctorsBySpecialty,

  addDoctor,

  getSchedule,
  getScheduleById,
  updateSchedule,
  viewPatients,
  bookAppointment,
  viewAppointments,

  addTimeSlot,
  updateTimeSlot,
  markUnavailable,
  getAvailableTimeSlots,


  getPatientRecordsByPatientId,
  getPatientRecordDetails,
  addPatientRecord
};
=======
const addUser='Insert into users (username  , email, password_hash) values ($1, $2, $3) RETURNING * ';
const getUserByEmail='Select * from users where email=$1';
const checkEmailExists = 'SELECT 1 FROM users WHERE email = $1';
const checkUsernameExists = 'SELECT 1 FROM users WHERE username = $1';
const deleteUserByEmail='Delete from users where email=$1';

const getUserById='Select * from users where id=$1';


const createPasswordResetToken = 'INSERT INTO password_reset_tokens (user_id, token, expires_at) VALUES ($1, $2, $3) RETURNING *';
const getPasswordResetToken = 'SELECT * FROM password_reset_tokens WHERE token = $1 AND expires_at > NOW()';
const deleteUserPasswordResetTokens = 'DELETE FROM password_reset_tokens WHERE user_id = $1';
const updateUserPassword = 'UPDATE users SET password_hash = $1 WHERE id = $2';


const addNewBlog='INSERT INTO blog_posts (user_id, title, content) VALUES ($1, $2, $3) RETURNING *';
const updateBlog = 'UPDATE blog_posts SET title = $1, content = $2 WHERE id = $3 AND user_id = $4 RETURNING *';
const deleteBlog = 'DELETE FROM blog_posts WHERE id = $1 AND user_id = $2 RETURNING *;';
const getAllBlogs = 'SELECT * FROM blog.blog_posts';

module.exports={
  addUser
  ,getUserByEmail,
  checkEmailExists,
  checkUsernameExists,
  getUserById,
  createPasswordResetToken,
  getPasswordResetToken,
  deleteUserPasswordResetTokens,
  updateUserPassword,
  addNewBlog,
  updateBlog,
  deleteBlog,
  getAllBlogs,
  deleteUserByEmail
};
>>>>>>> 4dc7301 (server added)
