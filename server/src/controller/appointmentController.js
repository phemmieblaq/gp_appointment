const { pool } = require("../database");
const queries = require("../queries/userQueries");

const bookAppointment = async (req, res) => {
  const { patient_id, reason } = req.body;
  const { scheduleId } = req.params;

  try {
    await pool.query("BEGIN");

    // Check if the time slot is available
    const scheduleResult = await pool.query(queries.getScheduleById, [
      scheduleId,
    ]);

    if (scheduleResult.rows.length === 0 || scheduleResult.rows[0].is_booked) {
      await pool.query("ROLLBACK");
      return res
        .status(400)
        .json({ error: "The selected time slot is not available." });
    }

    const schedule = scheduleResult.rows[0];

    // Book the appointment
    const result = await pool.query(queries.bookAppointment, [
      patient_id,
      schedule.doctor_id,
      schedule.schedule_id,
      schedule.available_date,
      schedule.start_time,
      schedule.end_time,
      reason,
    ]);

    // Mark the time slot as booked
    const updateResult = await pool.query(queries.updateTimeSlot, [scheduleId]);

    await pool.query("COMMIT");

    res.status(200).json({
      message: "Appointment booked successfully",
      data: result.rows[0],
    });
  } catch (error) {
    await pool.query("ROLLBACK");
    console.error("An unexpected database error occurred:", error);
    res.status(500).json({ error: "An unexpected error occurred." });
  }
};

const GetAppointmentsByDoctorId = async (req, res) => {
  const { doctor_id } = req.params;

  try {
    await pool.query("BEGIN");

    // Check if the time slot is available
    const appointmentResult = await pool.query(queries.getAppointments, [
      doctor_id,
    ]);

    if (appointmentResult.rows.length === 0) {
      await pool.query("ROLLBACK");
      return res.status(400).json({ error: "Appointment is not available." });
    }

    await pool.query("COMMIT");

    res.status(200).json({
      message: "Appointments fetched successfully",
      data: appointmentResult.rows,
    });
  } catch (error) {
    await pool.query("ROLLBACK");
    console.error("An unexpected database error occurred:", error);
    res.status(500).json({ error: "An unexpected error occurred." });
  }
};

const GetAppointmentsByPatientId = async (req, res) => {
  const { patient_id } = req.params;

  try {
    await pool.query("BEGIN");

    // Check if the time slot is available
    const appointmentResult = await pool.query(
      queries.getAppointmentsByUserId,
      [patient_id]
    );

    if (appointmentResult.rows.length === 0) {
      await pool.query("ROLLBACK");
      return res.status(400).json({ error: "Appointment is not available." });
    }

    await pool.query("COMMIT");

    res.status(200).json({
      message: "Appointments fetched successfully",
      data: appointmentResult.rows,
    });
  } catch (error) {
    await pool.query("ROLLBACK");
    console.error("An unexpected database error occurred:", error);
    res.status(500).json({ error: "An unexpected error occurred." });
  }
};

const DeleteAppointmentsById = async (req, res) => {
  const { appointmentId } = req.params;

  try {
    await pool.query("BEGIN");

    const appointment = await pool.query(queries.getAppointmentById, [
      appointmentId,
    ]);

    if (appointment.rows.length === 0) {
      await pool.query("ROLLBACK");
      return res.status(400).json({ error: "Appointment is not available." });
    }

    const appointmentResult = await pool.query(queries.deleteAppointmentById, [
      appointmentId,
    ]);

    await pool.query("COMMIT");

    res.status(200).json({
      message: "Appointments deleted successfully",
    });
  } catch (error) {
    await pool.query("ROLLBACK");
    console.error("An unexpected database error occurred:", error);
    res.status(500).json({
      error: "An unexpected error occurred while deleting appointment.",
    });
  }
};

module.exports = {
  bookAppointment,
  GetAppointmentsByDoctorId,
  GetAppointmentsByPatientId,
  DeleteAppointmentsById,
};
