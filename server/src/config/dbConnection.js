// Import the required library for connecting to PostgreSQL
const { Pool } = require("pg");

// Import the dotenv library for managing environment variables
const dotenv = require("dotenv");

// Load environment variables from the .env file into process.env
dotenv.config();

// Set up connection parameters using environment variables
const connectionParameters = {
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT,
};

// Create a new instance of the PostgreSQL connection pool
const dbPool = new Pool(connectionParameters);

// Function to establish a database connection
const DatabaseConnection = async () => {
  try {
    // Attempt to connect to the database
    const connection = await dbPool.connect();

    // Log a successful connection message
    console.log("Database connection established successfully");

    // Return the connection object
    return connection;
  } catch (error) {
    // Log any errors that occur during the connection process
    console.log("Error occurred while connecting to the database:", error);
  }
};

// Export the database connection function and the connection pool for use in other modules
module.exports = { DatabaseConnection, dbPool };
