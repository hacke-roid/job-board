import React, { useState } from "react";
import api from "../api";

const CandidateNotify = () => {
  const [jobId, setJobId] = useState("");
  const [emails, setEmails] = useState("");

  const handleNotify = async (e) => {
    e.preventDefault();
    const candidates = emails.split(",").map((email) => email.trim());
    try {
      await api.post("/jobs/notify", { jobId, candidates });
      alert("Emails sent successfully!");
    } catch (err) {
      alert("Failed to send emails!");
    }
  };

  return (
    <form onSubmit={handleNotify}>
      <input type="text" placeholder="Job ID" value={jobId} onChange={(e) => setJobId(e.target.value)} required />
      <textarea placeholder="Candidate Emails (comma-separated)" value={emails} onChange={(e) => setEmails(e.target.value)} required />
      <button type="submit">Notify Candidates</button>
    </form>
  );
};

export default CandidateNotify;
