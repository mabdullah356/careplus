const express = require("express");
const router = express.Router();
const { getAllDoctors, updateDoctorProfile } = require("../Controllers/doctorProfile.Controller");
const { protect, authorize } = require("../Middlewares/authMiddleware");

router.get("/", getAllDoctors);
router.put("/profile", protect, authorize("doctor"), updateDoctorProfile);

module.exports = router;