const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  verified: { type: Boolean, default: false },
});

module.exports = mongoose.model("Company", companySchema);
