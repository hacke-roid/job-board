import React, { useState } from "react";
import api from "../api"; // Ensure this is the correct path to your API module

const VerifyOTP = () => {
  const [email, setEmail] = useState("");
  const [otp, setOTP] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await api.post("/verification/verify-otp", { email, otp });
      alert("OTP verified successfully!"); // Optionally redirect to login or another page
    } catch (err) {
      setError("Verification failed. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleVerifyOTP}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOTP(e.target.value)}
        required
      />
      {error && <div style={{ color: "red" }}>{error}</div>}
      <button type="submit" disabled={loading}>
        {loading ? "Verifying..." : "Verify OTP"}
      </button>
    </form>
  );
};

export default VerifyOTP;
