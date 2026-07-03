const express = require("express");
const router = express.Router();
const { updatePatientProfile } = require("../Controllers/patientProfile.Controller");
const { protect, authorize } = require("../Middlewares/authMiddleware");

router.put("/profile", protect, authorize("patient"), updatePatientProfile);

module.exports = router;
