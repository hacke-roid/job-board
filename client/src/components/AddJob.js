import React, { useState } from "react";
import api from "../api"; // Ensure this is the correct path to your API module
import { useNavigate } from "react-router-dom";

const AddJob = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");
  const [endDate, setEndDate] = useState(""); // Add this line to define endDate state
  const [loading, setLoading] = useState(false); // For loading state
  const [error, setError] = useState(null); // For error handling
  const navigate = useNavigate();

  const handleAddJob = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    try {
      await api.post("/jobs", { 
        title, 
        description, 
        experienceLevel, 
        endDate // Include endDate here
      });
      navigate(-1); // Redirect to job list after successful addition
    } catch (err) {
      setError("Failed to add job. Please try again."); // Set error message
      console.error(err); // Log error for debugging
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <form onSubmit={handleAddJob}>
      <input
        type="text"
        placeholder="Job Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Job Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Experience Level"
        value={experienceLevel}
        onChange={(e) => setExperienceLevel(e.target.value)}
        required
      />
      <input
        type="date" // Change to 'date' type for user-friendly date selection
        placeholder="End Date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)} // Capture the end date
        required
      />
      {error && <div style={{ color: "red" }}>{error}</div>} {/* Display error message */}
      <button type="submit" disabled={loading}>
        {loading ? "Adding..." : "Add Job"} {/* Change button text based on loading state */}
      </button>
    </form>
  );
};

export default AddJob;
