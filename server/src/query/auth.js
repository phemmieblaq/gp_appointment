const checkUserByEmailQuery = `SELECT * FROM users WHERE email = $1`;
const checkCodeExistenceQuery = `SELECT * FROM users WHERE ressetcode = $1 AND email = $2`;
const checkUserExistenceQueryById = `SELECT * FROM users WHERE id = $1`;
const getDoctorsByState = `SELECT * FROM users WHERE state = $1 AND role = 'DOCTOR'`;
const createUserQuery = `INSERT INTO "users" (full_name, email, password, role) 
                          VALUES ($1, $2, $3, $4) RETURNING *`;
const updateUserQuery = `
  UPDATE "users"
  SET state = $1,
  city = $2,
  phone = $3,
  updated_at = CURRENT_TIMESTAMP
  WHERE id = $4 
  RETURNING *
`;
const updateUserStatusQuery = `
  UPDATE "users"
  SET isVerified = TRUE
  WHERE id = $1 
  RETURNING *
`;
const deleteUserQuery = `
  DELETE FROM "users"
  WHERE email = $1
  RETURNING *
`;

const checkUserByRoleAndIDQuery = `SELECT * FROM users WHERE id = $1 AND role = $2`;
const checkUsersByRole = `SELECT id, full_name, email, phone, role, state, city, created_at, updated_at FROM users WHERE role = $1`;

module.exports = {
  checkUserByEmailQuery,
  checkUserExistenceQueryById,
  createUserQuery,
  updateUserQuery,
  checkCodeExistenceQuery,
  getDoctorsByState,
  deleteUserQuery,
  checkUserByRoleAndIDQuery,
  checkUsersByRole,
  updateUserStatusQuery,
};
