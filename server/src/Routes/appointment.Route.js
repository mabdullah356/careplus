const express = require("express");
const router = express.Router();
const { createAppointment } = require("../Controllers/appointment.Controller");
const { protect, authorize } = require("../Middlewares/authMiddleware");

router.post("/book", protect, authorize("patient"), createAppointment);

module.exports = router;
