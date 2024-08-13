const { pool } = require("../database");
const queries = require("../queries/userQueries");

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

// Add a time slot for the doctor
const addTimeSlot = async (req, res) => {
  const { doctor_id, available_date, start_time, end_time } = req.body;
  try {
    await pool.query("SET search_path TO public");
    const result = await pool.query(queries.addTimeSlot, [
      doctor_id,
      available_date,
      start_time,
      end_time,
    ]);
    res
      .status(201)
      .json({ message: "Time slot added successfully", data: result.rows[0] });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "An unexpected error occurred." });
  }
};

// Update time slot for the doctor (mark as booked)

// Create multiple time slots for the doctor
const createTimeSlots = async (req, res) => {
  const { doctor_id, available_slots } = req.body; // Array of available slots

  // Get the current date and time
  const currentDate = new Date();

  // Filter out any slots that are not greater than the current date and time
  const validSlots = available_slots.filter(
    (slot) => new Date(slot.available_date) > currentDate
  );

  if (validSlots.length === 0) {
    return res
      .status(400)
      .json({ error: "All provided time slots are in the past or invalid." });
  }

  try {
    let queryText =
      "INSERT INTO Schedules (doctor_id, available_date, start_time, end_time) VALUES ";
    const queryValues = [doctor_id];
    validSlots.forEach((slot, index) => {
      queryText += `($1, $${index * 3 + 2}, $${index * 3 + 3}, $${
        index * 3 + 4
      }),`;
      queryValues.push(slot.available_date, slot.start_time, slot.end_time);
    });
    queryText = queryText.slice(0, -1) + " RETURNING *"; // Remove trailing comma and add RETURNING *

    const result = await pool.query(queryText, queryValues);
    res
      .status(201)
      .json({ message: "Time slots created successfully", data: result.rows });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "An unexpected error occurred." });
  }
};

// Mark time slot as unavailable
const markUnavailable = async (req, res) => {
  const { scheduleId } = req.params;
  try {
    const result = await pool.query(queries.markUnavailable, [scheduleId]);
    res.status(200).json({
      message: "Time slot marked as unavailable",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "An unexpected error occurred." });
  }
};

// schedulesController.js

const updateTimeSlot = async (req, res) => {
  const { scheduleId } = req.params;
  const { available_date, start_time, end_time, is_booked } = req.body;

  try {
    const result = await pool.query(
      "UPDATE Schedules SET available_date = $1, start_time = $2, end_time = $3, is_booked = $4 WHERE schedule_id = $5 RETURNING *",
      [available_date, start_time, end_time, is_booked, scheduleId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Schedule not found" });
    }

    res.status(200).json({
      message: "Time slot updated successfully",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("An unexpected database error occurred:", error);
    res.status(500).json({ error: "An unexpected error occurred." });
  }
};

const getAvailableTimeSlots = async (req, res) => {
  const { doctorId } = req.params;

  try {
    const result = await pool.query(queries.getAvailableTimeSlots, [doctorId]);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("An unexpected database error occurred:", error);
    res.status(500).json({ error: "An unexpected error occurred." });
  }
};

module.exports = {
  getSchedule,
  addTimeSlot,
  updateTimeSlot,
  createTimeSlots,
  getAvailableTimeSlots,
  markUnavailable,
};
