import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/index.css";
import Header from "../components/Header";
import Footer from '../components/Footer';

const EditTrainees = () => {
  const [trainees, setTrainees] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch trainees
  useEffect(() => {
    const fetchTrainees = async () => {
      try {
        const response = await axios.get("http://localhost:5000/trainees");
        console.log("Fetched trainees:", response.data); // Debugging log
        setTrainees(response.data); // Set the fetched trainees
      } catch (err) {
        console.error("Error fetching trainees:", err.response || err.message);
        setError("Failed to fetch trainees.");
      }
    };
    fetchTrainees();
  }, []);
  

  // Delete trainee
  const handleDelete = async (id) => {
    console.log("Delete ID:", id); // Debugging log
    if (!id) {
      alert("Invalid trainee selected for deletion.");
      return;
    }
    try {
      await axios.delete(`http://localhost:5000/trainees/${id}`);
      setTrainees(trainees.filter((trainee) => trainee._id !== id));
      alert("Trainee deleted successfully!");
    } catch (err) {
      console.error("Error deleting trainee:", err.response || err.message);
      alert("Failed to delete trainee.");
    }
  };
  
  const handleEdit = (id) => {
    console.log("Edit ID:", id); // Debugging log
    if (!id) {
      alert("Invalid trainee selected for editing.");
      return;
    }
    navigate(`/edit/${id}`);
  };  
  

  return (
    <>
      <Header />
      <div className="index-container">
        <h1 className="index-title">Edit Trainees</h1>
        {error && <div className="error">{error}</div>}
        <table className="trainee-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Mobile</th>
              <th>NIC</th>
              <th>Email</th>
              <th>Address</th>
              <th>Training Starts</th>
              <th>Training Ends</th>
              <th>Institute</th>
              <th>Languages</th>
              <th>Field of Specialization</th>
              <th>Supervisor</th>
              <th>Assign Work</th>
              <th>Target Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {trainees.map((trainee) => (
              <tr key={trainee._id}>
                <td>{trainee.name}</td>
                <td>{trainee.mobile}</td>
                <td>{trainee.nic}</td>
                <td>{trainee.email}</td>
                <td>{trainee.address}</td>
                <td>{trainee.startDate}</td>
                <td>{trainee.endDate}</td>
                <td>{trainee.institute}</td>
                <td>{trainee.languages}</td>
                <td>{trainee.specialization}</td>
                <td>{trainee.supervisor}</td>
                <td>{trainee.assignedWork}</td>
                <td>{trainee.tdate}</td>
                <td>
                  <button onClick={() => handleEdit(trainee._id)}>Edit</button>
                  <button onClick={() => handleDelete(trainee._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  );
};

export default EditTrainees;
