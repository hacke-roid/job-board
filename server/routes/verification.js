// const express = require("express");
// const nodemailer = require("nodemailer");
// const twilio = require("twilio");
// const User = require("../models/User");

// const router = express.Router();

// // Configure nodemailer
// const transporter = nodemailer.createTransport({
//   service: "Gmail",
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// // Configure Twilio
// const twilioClient = twilio(
//   process.env.TWILIO_ACCOUNT_SID,
//   process.env.TWILIO_AUTH_TOKEN
// );

// // Generate a random OTP
// const generateOTP = () =>
//   Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP

// // Send email with OTP
// const sendEmailWithOTP = (email, otp) => {
//   const mailOptions = {
//     from: process.env.EMAIL_USER,
//     to: email,
//     subject: "Your OTP for Verification",
//     text: `Your OTP is: ${otp}. It is valid for 10 minutes.`,
//   };

//   return transporter.sendMail(mailOptions);
// };

// // Send SMS with OTP
// const sendSMSWithOTP = (phone, otp) => {
//   return twilioClient.messages.create({
//     body: `Your OTP is: ${otp}. It is valid for 10 minutes.`,
//     from: process.env.TWILIO_PHONE_NUMBER,
//     to: phone,
//   });
// };

// // Route to register user and send OTP
// router.post("/register", async (req, res) => {
//   const { name, email, phone, password } = req.body;

//   // Generate OTP
//   const otp = generateOTP();
//   const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // OTP expires in 10 minutes

//   const newUser = new User({ name, email, phone, password, otp, otpExpires });

//   try {
//     await newUser.save();
//     await sendEmailWithOTP(email, otp);
//     await sendSMSWithOTP(phone, otp);

//     res
//       .status(201)
//       .json({ message: "User registered. OTP sent to your email and phone." });
//   } catch (error) {
//     console.error(error);
//     res.status(400).json({ message: "Error registering user." });
//   }
// });

// // Route to verify OTP
// router.post("/verify-otp", async (req, res) => {
//   const { email, otp } = req.body;

//   const user = await User.findOne({ email });
//   if (!user) {
//     return res.status(400).json({ message: "User not found." });
//   }

//   // Check if OTP is valid and not expired
//   if (user.otp !== otp) {
//     return res.status(400).json({ message: "Invalid OTP." });
//   }
//   if (new Date() > user.otpExpires) {
//     return res.status(400).json({ message: "OTP has expired." });
//   }

//   // Mark user as verified
//   user.isVerified = true;
//   user.otp = null; // Clear the OTP
//   user.otpExpires = null; // Clear the expiration time
//   await user.save();

//   res.status(200).json({ message: "User verified successfully." });
// });

// module.exports = router;
