const express = require("express");
const Job = require("../models/Job");
const authMiddleware = require("../middleware/auth");

const router = express.Router();


router.get('/', async (req, res) => {
    console.log('Fetching jobs...'); // Log when this endpoint is hit
    try {
      const jobs = await Job.find();
      res.json(jobs);
    } catch (err) {
      console.error(err); // Log error for debugging
      res.status(500).json({ message: 'Server error' });
    }
  });

  router.post('/', async (req, res) => {
    console.log(req.body); // Log the incoming request body
    const { title, description, experienceLevel, endDate } = req.body;
  
    try {
      const newJob = new Job({ title, description, experienceLevel, endDate });
      await newJob.save();
      res.status(201).json(newJob);
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: "Error creating job" });
    }
  });
  
// Email Automation
router.post("/notify", authMiddleware, async (req, res) => {
  const { jobId, candidates } = req.body;
  const job = await Job.findById(jobId).populate("company");

  const emailPromises = candidates.map((email) =>
    transporter.sendMail({
      to: email,
      subject: `New Job: ${job.title}`,
      html: `<p>${job.description}</p><p>From: ${job.company.name}</p>`,
    })
  );

  await Promise.all(emailPromises);
  res.json({ message: "Emails sent successfully!" });
});

module.exports = router;
