require('dotenv').config();
const { Pool } = require('pg');

<<<<<<< HEAD


// Set up pool using the environment variables
const pool = new Pool({
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT,
=======
// Set up pool using the environment variables
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
>>>>>>> 4dc7301 (server added)
});

// Function to test the database connection and set the schema
const testDBConnection = async () => {
  const client = await pool.connect(); // Attempt to get a client from the connection pool
  try {
<<<<<<< HEAD
    await client.query('SET search_path TO public');
    console.log('Connected to the database and search_path set');
=======
    await client.query('SET search_path TO blog, public'); // Set the schema search path
    //console.log('Connected to the database and search_path set');
>>>>>>> 4dc7301 (server added)
  } catch (err) {
    //console.log('Database connection failed:', err);
  } finally {
    client.release(); //  client being released back to the pool
  }
};

<<<<<<< HEAD
// Call this function on startup to verify connection


// Set schema (adjust the schema name as necessary)
=======
>>>>>>> 4dc7301 (server added)


// Export pool and testDBConnection for use elsewhere in the application
module.exports = {
  pool,
  testDBConnection
};


<<<<<<< HEAD
// {
//   "username": "john_111",
//   "email": "phemmieblaq12@example.com",
//   "phone": "1234567890",
//   "password_hash": "hashed_password1231"
// }
=======
>>>>>>> 4dc7301 (server added)
