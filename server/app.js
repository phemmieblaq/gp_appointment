const express = require("express");
const app = express();
const http = require("http");
const dotenv = require("dotenv");
const authRoute = require("./src/routes/auth");
const doctorRoute = require("./src/routes/doctor");
const patientRoute = require("./src/routes/patient");
const hospitalRoute = require("./src/routes/hospital");
const { ErrorHandler } = require("./src/middleware/errorHandler");
const { DatabaseConnection } = require("./src/config/dbConnection");

app.use(express.json());

dotenv.config();

// Initialize database connection
DatabaseConnection();

//routes
app.use("/users", authRoute);
app.use("/doctor", doctorRoute);
app.use("/patient", patientRoute);
app.use("/hospitals", hospitalRoute);

//Error handler
app.use(ErrorHandler);

//create server
const server = http.createServer(app);

const port = process.env.PORT || 8000;

server.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
