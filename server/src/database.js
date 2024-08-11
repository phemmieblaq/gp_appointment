require("dotenv").config();
const { Pool } = require("pg");

// Set up pool using the environment variables
const pool = new Pool({
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT,
});

// Function to test the database connection and set the schema
const testDBConnection = async () => {
  const client = await pool.connect(); // Attempt to get a client from the connection pool
  try {
    await client.query("SET search_path TO public");
    console.log("Connected to the database and search_path set");
  } catch (err) {
    //console.log('Database connection failed:', err);
  } finally {
    client.release(); //  client being released back to the pool
  }
};

// Call this function on startup to verify connection

// Set schema (adjust the schema name as necessary)

// Export pool and testDBConnection for use elsewhere in the application
module.exports = {
  pool,
  testDBConnection,
};

// {
//   "username": "john_111",
//   "email": "phemmieblaq12@example.com",
//   "phone": "1234567890",
//   "password_hash": "hashed_password1231"
// }
