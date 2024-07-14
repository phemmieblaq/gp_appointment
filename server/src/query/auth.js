const checkUserByEmailQuery = `SELECT * FROM users WHERE email = $1`;
const checkCodeExistenceQuery = `SELECT * FROM users WHERE ressetcode = $1 AND email = $2`;
const checkUserExistenceQueryById = `SELECT * FROM users WHERE id = $1`;
const createUserQuery = `INSERT INTO "users" (full_name, email, password, phone, role) 
                          VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
const updateUserCodeQuery = `
  UPDATE "users"
  SET ressetcode = null,
  password = $1
  WHERE id = $2 
  RETURNING *
`;
const updateUserQuery = `
  UPDATE "users"
  SET ressetcode = $1
  WHERE id = $2 
  RETURNING *
`;
const deleteUserQuery = `
  DELETE FROM "users"
  WHERE email = $1
  RETURNING *
`;

const checkUserByRoleAndIDQuery = `SELECT * FROM users WHERE id = $1 AND role = $2`;

module.exports = {
  checkUserByEmailQuery,
  checkUserExistenceQueryById,
  createUserQuery,
  updateUserCodeQuery,
  updateUserQuery,
  checkCodeExistenceQuery,
  deleteUserQuery,
  checkUserByRoleAndIDQuery,
};
