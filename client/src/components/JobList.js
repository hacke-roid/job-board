import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem("token"); // Get the token
        const { data } = await api.get("/jobs", {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in the request
          },
        });
        setJobs(data);
      } catch (err) {
        setError("Failed to fetch jobs. Please try again later.");
        console.error(err.message); // Log the error message for debugging
      } finally {
        setLoading(false);
      }
    };
    
    useEffect(() => {
      fetchJobs();
    }, []);

  const handleAddJob = () => {
    navigate("/add-job");
  };

  if (loading) {
    return <div>Loading jobs...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Job List</h1>
      <button onClick={handleAddJob} style={{ marginBottom: '20px' }}>
        Add Job
      </button>
      {jobs.length === 0 ? (
        <p>No jobs available at the moment.</p>
      ) : (
        jobs.map((job) => (
          <div key={job._id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
            <h3>{job.title}</h3>
            <p>{job.description}</p>
            <p>Experience Level: {job.experienceLevel}</p>
            <p>End Date: {new Date(job.endDate).toLocaleDateString()}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default JobList;
