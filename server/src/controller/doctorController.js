const { pool } = require("../database");
const queries = require("../queries/userQueries");



const getAllDoctors = async (req, res) => {
  try {
    const doctors = await pool.query(queries.getAllDoctors);
    res.status(200).json({ data: doctors.rows });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "An unexpected error occurred." });
  }
};

const getDoctorsBySpecialty = async (req, res) => {
  const { specialty } = req.params;
  //console.log("Specialty parameter received:", specialty);

  try {
    const result = await pool.query(queries.getDoctorsBySpecialty, [specialty]);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("An unexpected database error occurred:", error);
    res.status(500).json({ error: "An unexpected error occurred." });
  }
};



// Get doctor's schedule
const getSchedule = async (req, res) => {
  const { doctorId } = req.params;
  try {
    const result = await pool.query(queries.getSchedule, [doctorId]);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "An unexpected error occurred." });
  }
};

// Update doctor's schedule
const updateSchedule = async (req, res) => {
  const { doctorId } = req.params;
  const { schedule } = req.body;
  try {
    await pool.query(queries.updateSchedule, [schedule, doctorId]);
    res.status(200).json({ message: "Schedule updated successfully" });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "An unexpected error occurred." });
  }
};

// View patients assigned to the doctor
const viewPatients = async (req, res) => {
  const { doctorId } = req.params;
  try {
    const result = await pool.query(queries.viewPatients, [doctorId]);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "An unexpected error occurred." });
  }
};

// View appointments for the doctor
const viewAppointments = async (req, res) => {
  const { doctorId } = req.params;
  try {
    const result = await pool.query(queries.viewAppointments, [doctorId]);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "An unexpected error occurred." });
  }
};

// Add availability for the doctor
const addAvailability = async (req, res) => {
  const { doctor_id, available_date } = req.body;
  try {
    const result = await pool.query(queries.addAvailability, [doctor_id, available_date]);
    res.status(201).json({ message: "Availability added successfully", data: result.rows[0] });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "An unexpected error occurred." });
  }
};

// Update availability for the doctor
const updateAvailability = async (req, res) => {
  const { scheduleId } = req.params;
  const { is_booked } = req.body;
  try {
    const result = await pool.query(queries.updateAvailability, [is_booked, scheduleId]);
    res.status(200).json({ message: "Availability updated successfully", data: result.rows[0] });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "An unexpected error occurred." });
  }
};




module.exports = { 
    getAllDoctors,
    getDoctorsBySpecialty,
    getSchedule,
    updateSchedule,
    viewPatients,
    viewAppointments,
    addAvailability,
    updateAvailability };
