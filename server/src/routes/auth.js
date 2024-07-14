import { Login, UserRegistration } from "../module/auth/controller";
const express = require("express");
const router = express.Router();

router.post("/", UserRegistration);
router.post("/login", Login);

module.exports = router;
