import { GetUsersByRole, Login, UserRegistration } from "../controller/auth";
import authorizer from "../middleware/auth";
const express = require("express");
const router = express.Router();

router.post("/", UserRegistration);
router.post("/login", Login);
router.get("/role", authorizer("PATIENT"), GetUsersByRole);

module.exports = router;
