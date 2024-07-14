import { GetUsersByRole, Login, UserRegistration } from "../controller/auth";
const express = require("express");
const router = express.Router();

router.post("/", UserRegistration);
router.post("/login", Login);
router.get("/role", GetUsersByRole);

module.exports = router;
