const express = require("express");
const app = express();
const http = require("http");
const dotenv = require("dotenv");
const authRoute = require("./src/routes/auth");
const doctorRoute = require("./src/routes/doctor");
const patientRoute = require("./src/routes/patient");
const { ErrorHandler } = require("./src/middleware/errorHandler");

app.use(express.json());

dotenv.config();

//routes
app.use("/user", authRoute);
app.use("/doctor", doctorRoute);
app.use("/patient", patientRoute);

//Error handler
app.use(ErrorHandler);

//create server
const server = http.createServer(app);

const port = process.env.PORT || 8000;

server.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
