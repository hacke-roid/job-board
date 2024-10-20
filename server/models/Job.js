const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
  title: String,
  description: String,
  experienceLevel: String,
  endDate: { type: Date, required: true }
});

module.exports = mongoose.model("Job", jobSchema);
