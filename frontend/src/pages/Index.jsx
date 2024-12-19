import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/index.css";
import Header from '../components/Header';
import Footer from '../components/Footer';

const Index = () => {
  const [trainees, setTrainees] = useState([]);
  const [filteredTrainees, setFilteredTrainees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch trainees data from the server
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/trainees");
        setTrainees(response.data);
        setFilteredTrainees(response.data); // Initialize with all trainees
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch trainees data.");
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Handle search functionality
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = trainees.filter((trainee) =>
      trainee.name.toLowerCase().includes(query) ||
      trainee.email.toLowerCase().includes(query) ||
      trainee.address.toLowerCase().includes(query) ||
      trainee.institute.toLowerCase().includes(query) ||
      trainee.supervisor.toLowerCase().includes(query) ||
      trainee.specialization.toLowerCase().includes(query)
    );
    setFilteredTrainees(filtered);
  };

  if (loading) return <div className="loading">Loading trainees...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <>
      <Header />
      <div className="index-container">
        <h1 className="index-title">All Trainees</h1>

        {/* Search Bar */}
        <div className="search-bar-container">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearch}
            className="search-bar"
          />
        </div>

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
            {filteredTrainees.map((trainee, index) => (
              <tr key={index}>
                <td>{trainee.trainee_id || "N/A"}</td>
                <td>{trainee.name}</td>
                <td>
                  {trainee.mobile}<br />
                  {trainee.email}<br />
                  {trainee.address}
                </td>
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
      <Footer />
    </>
  );
};

export default Index;
