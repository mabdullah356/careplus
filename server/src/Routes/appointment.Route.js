const express = require("express");
const router = express.Router();
const { createAppointment, getAppointments, confirmAppointment, cancelAppointment } = require("../Controllers/appointment.Controller");
const { protect, authorize } = require("../Middlewares/authMiddleware");

router.post("/book", protect, authorize("patient"), createAppointment);
router.get("/", protect, getAppointments);
router.patch("/:id/confirm", protect, authorize("doctor"), confirmAppointment);
router.patch("/:id/cancel", protect, cancelAppointment);

module.exports = router;
