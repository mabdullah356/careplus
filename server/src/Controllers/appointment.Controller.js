const Appointment = require("../Models/appointment.Model");
const PatientProfile = require("../Models/patientProfile.Model");
const DoctorProfile = require("../Models/doctorProfile.Model");

module.exports.createAppointment = async (req, res) => {
  try {
    const { doctorId, date, time, reason } = req.body;

    if (!doctorId || !date || !time) {
      return res.status(400).json({ message: "doctorId, date and time are required" });
    }

    const patientProfile = await PatientProfile.findOne({ userId: req.user.id });

    if (!patientProfile) {
      return res.status(404).json({ message: "Patient profile not found" });
    }

    const doctorProfile = await DoctorProfile.findById(doctorId);

    if (!doctorProfile) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const existingAppointment = await Appointment.findOne({
      doctorId,
      date,
      time,
      status: { $in: ["pending", "confirmed"] },
    });

    if (existingAppointment) {
      return res.status(409).json({ message: "This slot is already booked" });
    }

    const appointment = await Appointment.create({
      patientId: patientProfile._id,
      doctorId,
      date,
      time,
      reason,
    });

    return res.status(201).json({
      message: "Appointment booked successfully",
      appointment,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
