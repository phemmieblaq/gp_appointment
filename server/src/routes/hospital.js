const express = require("express");
const { GetAllHospitalsByState } = require("../controller/hospital");
const router = express.Router();

router.get("/:state", GetAllHospitalsByState);

module.exports = router;
