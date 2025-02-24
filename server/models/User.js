const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  otp: { type: String }, // Add OTP field
  otpExpires: { type: Date }, // Add expiration time for OTP
});

const User = mongoose.model("User", userSchema);

module.exports = User;
