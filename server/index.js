const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");
const jobRoutes = require("./routes/job");
const verificationRoutes = require("./routes/verification");


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const mongourl = process.env.MONGO_URI;

console.log("Mongo URI:", mongourl); // Debugging step

mongoose
  .connect(mongourl)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
// app.use("/api/verification", verificationRoutes);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
