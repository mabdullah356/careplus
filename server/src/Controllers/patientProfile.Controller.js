const PatientProfile = require("../Models/patientProfile.Model");

module.exports.updatePatientProfile = async (req, res) => {
  try {
    const {
      dob,
      gender,
      bloodGroup,
      allergies,
      emergencyContact,
    } = req.body;

    const patientProfile = await PatientProfile.findOne({ userId: req.user.id });

    if (!patientProfile) {
      return res.status(404).json({ message: "Patient profile not found" });
    }

    if (dob) patientProfile.dob = dob;
    if (gender) patientProfile.gender = gender;
    if (bloodGroup) patientProfile.bloodGroup = bloodGroup;
    if (allergies) patientProfile.allergies = allergies;
    if (emergencyContact) patientProfile.emergencyContact = emergencyContact;

    await patientProfile.save();

    return res.status(200).json({
      message: "Profile updated successfully",
      profile: patientProfile,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
