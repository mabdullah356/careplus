const mongoose = require("mongoose");

const patientProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, 
    },
    dob: {
      type: Date,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },
    bloodGroup: {
      type: String,
      trim: true,
    },
    allergies: [String],
    emergencyContact: {
      name: { type: String, trim: true },
      phone: { type: String, trim: true },
    },
  },
  { timestamps: true }
);

const PatientProfile = mongoose.model("PatientProfile", patientProfileSchema);

module.exports = PatientProfile;