const DoctorProfile = require("../Models/doctorProfile.Model");

module.exports.updateDoctorProfile = async (req, res) => {
  try {
    const {
      specialty,
      licenseNo,
      experienceYears,
      consultationFee,
    } = req.body;

    const doctorProfile = await DoctorProfile.findOne({ userId: req.user.id });

    if (!doctorProfile) {
      return res.status(404).json({ message: "Doctor profile not found" });
    }

    if (specialty) doctorProfile.specialty = specialty;
    if (licenseNo) doctorProfile.licenseNo = licenseNo;
    if (experienceYears !== undefined) doctorProfile.experienceYears = experienceYears;
    if (consultationFee !== undefined) doctorProfile.consultationFee = consultationFee;

    await doctorProfile.save();

    return res.status(200).json({
      message: "Profile updated successfully",
      profile: doctorProfile,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
