// Index.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/index.css";
import Header from '../components/Header';

const Index = () => {
  const [trainees, setTrainees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch trainees data from the server
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/trainees");
        setTrainees(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch trainees data.");
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="loading">Loading trainees...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <>
    <Header />
    <div className="index-container">
      <h1 className="index-title">All Trainees</h1>
      <table className="trainee-table">
        <thead>
          <tr>
            <th>Trainee ID</th>
            <th>Name</th>
            <th>Mobile/ Email/ Address</th>
            <th>NIC</th>
            <th>Training Ends</th>
            <th>Institute</th>
            <th>Field of Specialization</th>
            <th>Supervisor</th>
          </tr>
        </thead>
        <tbody>
          {trainees.map((trainee, index) => (
            <tr key={index}>
              <td>{trainee.trainee_id || "N/A"}</td>
              <td>{trainee.name}</td>
              <td>{trainee.mobile}<br/>
                {trainee.email}<br/>
                {trainee.address}</td>
              <td>{trainee.nic}</td>
              <td>{trainee.endDate}</td>
              <td>{trainee.institute}</td>
              <td>{trainee.specialization}</td>
              <td>{trainee.supervisor}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
};

export default Index;
