const mongoose = require("mongoose");

const doctorProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, 
    },
    specialty: {
      type: String,
    //   required: [true, "Specialty is required"],
      trim: true,
    },
    licenseNo: {
      type: String,
    //   required: [true, "License number is required"],
      unique: true,
      trim: true,
    },
    experienceYears: {
      type: Number,
      min: 0,
      default: 0,
    },
    consultationFee: {
      type: Number,
      min: 0,
    },
  },
  { timestamps: true }
);

const DoctorProfile = mongoose.model("DoctorProfile", doctorProfileSchema);

module.exports = DoctorProfile;