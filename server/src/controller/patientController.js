

const { pool } = require("../database");
const queries = require("../queries/userQueries");



const getPatientRecordsByPatientId = async (req, res) => {
  const { patientId } = req.params;

  try {
    const result = await pool.query(queries.getPatientRecordsByPatientId, [patientId]);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("An unexpected database error occurred:", error);
    res.status(500).json({ error: "An unexpected error occurred." });
  }
};

const getPatientRecordDetails = async (req, res) => {
  const { recordId } = req.params;

  try {
    const result = await pool.query(queries.getPatientRecordDetails, [recordId]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Record not found" });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("An unexpected database error occurred:", error);
    res.status(500).json({ error: "An unexpected error occurred." });
  }
};

const addPatientRecord = async (req, res) => {
    const {
      patient_id,
      description,
      prescription,
      allergies,
      family_medical_history,
      past_medical_history,
      current_medication
    } = req.body;
  
    try {
      // Check if patient_id exists in the users table
      const patientCheck = await pool.query('SELECT * FROM users WHERE user_id = $1', [patient_id]);
      if (patientCheck.rows.length === 0) {
        return res.status(400).json({ error: "Patient ID does not exist" });
      }
  
      // Insert the new patient record into the database
      const result = await pool.query(queries.addPatientRecord, [
        patient_id,
        description,
        prescription,
        allergies,
        family_medical_history,
        past_medical_history,
        current_medication
      ]);
      res.status(201).json({ message: "Patient record added successfully", data: result.rows[0] });
    } catch (error) {
      console.error("An unexpected database error occurred:", error);
      res.status(500).json({ error: "An unexpected error occurred." });
    }
  };
  


  
  module.exports = {
    getPatientRecordsByPatientId,
    getPatientRecordDetails,
    addPatientRecord
  };