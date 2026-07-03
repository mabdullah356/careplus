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

module.exports.getAppointments = async (req, res) => {
  try {
    let appointments;

    if (req.user.role === "patient") {
      const patientProfile = await PatientProfile.findOne({ userId: req.user.id });
      if (!patientProfile) {
        return res.status(404).json({ message: "Patient profile not found" });
      }
      appointments = await Appointment.find({ patientId: patientProfile._id })
        .populate("doctorId")
        .sort({ createdAt: -1 });
    } else if (req.user.role === "doctor") {
      const doctorProfile = await DoctorProfile.findOne({ userId: req.user.id });
      if (!doctorProfile) {
        return res.status(404).json({ message: "Doctor profile not found" });
      }
      appointments = await Appointment.find({ doctorId: doctorProfile._id })
        .populate("patientId")
        .sort({ createdAt: -1 });
    } else {
      return res.status(403).json({ message: "Access denied" });
    }

    return res.status(200).json({ appointments });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.confirmAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    const doctorProfile = await DoctorProfile.findOne({ userId: req.user.id });
    if (!doctorProfile) {
      return res.status(404).json({ message: "Doctor profile not found" });
    }

    const appointment = await Appointment.findOne({ _id: id, doctorId: doctorProfile._id });

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    if (appointment.status !== "pending") {
      return res.status(400).json({ message: "Only pending appointments can be confirmed" });
    }

    appointment.status = "confirmed";
    await appointment.save();

    return res.status(200).json({ message: "Appointment confirmed", appointment });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.cancelAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    let appointment;

    if (req.user.role === "patient") {
      const patientProfile = await PatientProfile.findOne({ userId: req.user.id });
      if (!patientProfile) {
        return res.status(404).json({ message: "Patient profile not found" });
      }
      appointment = await Appointment.findOne({ _id: id, patientId: patientProfile._id });
    } else if (req.user.role === "doctor") {
      const doctorProfile = await DoctorProfile.findOne({ userId: req.user.id });
      if (!doctorProfile) {
        return res.status(404).json({ message: "Doctor profile not found" });
      }
      appointment = await Appointment.findOne({ _id: id, doctorId: doctorProfile._id });
    } else {
      return res.status(403).json({ message: "Access denied" });
    }

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    if (appointment.status === "cancelled") {
      return res.status(400).json({ message: "Appointment is already cancelled" });
    }

    appointment.status = "cancelled";
    await appointment.save();

    return res.status(200).json({ message: "Appointment cancelled", appointment });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
