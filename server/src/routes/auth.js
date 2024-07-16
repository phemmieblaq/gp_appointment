const {
  GetAllDoctorsByState,
  GetUsersByRole,
  Login,
  UpdateUser,
  UserRegistration,
  UserVerification,
} = require("../controller/auth");
const express = require("express");
const router = express.Router();

router.post("/", UserRegistration); //
router.get("/verify/:token", UserVerification); //
router.post("/login", Login); //
router.get("/:role", GetUsersByRole); //
router.get("/doctors/:state", GetAllDoctorsByState); //
router.put("/", UpdateUser);

module.exports = router;
