const { pool } = require("../database");
const queries = require("../queries/userQueries");

const addSpecialty = async (req, res) => {
  const { specialty_name, description } = req.body;

  // Validate request body
  if (!specialty_name || !description) {
    return res.status(400).json({ error: "specialty_name and description are required." });
  }

  try {
    await pool.query("SET search_path TO public");
    const newSpecialty = await pool.query(queries.addSpecialty, [specialty_name, description]);
    res.status(201).json({ message: "Specialty added successfully", data: newSpecialty.rows[0] });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "An unexpected error occurred." });
  }
};

const getAllSpecialties = async (req, res) => {
  try {
    await pool.query("SET search_path TO public");
    const specialties = await pool.query(queries.getAllSpecialties);
    res.status(200).json({ data: specialties.rows });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "An unexpected error occurred." });
  }
};

module.exports = { addSpecialty, getAllSpecialties };