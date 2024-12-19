import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../css/create.css";
import axios from "axios";
import Header from '../components/Header';

const Create = ({ isEdit }) => {
  const { id } = useParams(); // Get trainee ID from URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    nic: "",
    email: "",
    address: "",
    startDate: "",
    endDate: "",
    institute: "",
    languages: "",
    specialization: "",
    supervisor: "",
    tdate: "",
    assignedWork: "",
  });

  useEffect(() => {
    console.log("Edit Mode:", isEdit, "ID:", id); // Debugging log
    if (isEdit && id) {
      const fetchTrainee = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/trainees/${id}`);
          if (response.data) {
            setFormData(response.data); // Pre-fill the form
          } else {
            alert("Trainee not found.");
            navigate("/edit-trainees"); // Redirect if not found
          }
        } catch (err) {
          console.error("Error fetching trainee data:", err);
          alert("Error fetching trainee data.");
          navigate("/edit-trainees");
        }
      };
      fetchTrainee();
    }
  }, [isEdit, id, navigate]);  
  

  const specializations = ["Software Engineering", "Data Science", "Networking", "AI", "Web Development, Cyber Security"];
  const supervisors = ["Amalya Damsari Dayarathna", "Jaya Mohan", "Nishantha Alwis", "Buthsara Geeganage"];

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validate mobile number input
    if (name === "mobile") {
        const regex = /^[0-9+]*$/; // Allow only numbers and +, allow empty value
        if (!regex.test(value)) {
        return; // Do nothing if input is invalid
        }
    }

    setFormData({ ...formData, [name]: value });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     if (isEdit) {
  //       // Update trainee
  //       await axios.put(`http://localhost:5000/trainees/${id}`, formData);
  //       alert("Trainee updated successfully!");
  //       navigate("/edit-trainees"); // Navigate to trainee list after update
  //     } else {
  //       // Create new trainee
  //       await axios.post("http://localhost:5000/trainees", formData);
  //       alert("Trainee created successfully!");
  //       setFormData({
  //         name: "",
  //         mobile: "",
  //         nic: "",
  //         email: "",
  //         address: "",
  //         startDate: "",
  //         endDate: "",
  //         institute: "",
  //         languages: "",
  //         specialization: "",
  //         supervisor: "",
  //         tdate: "",
  //         assignedWork: "",
  //       }); // Reset form after creation
  //     }
  //   } catch (err) {
  //     console.error("Error submitting form:", err);
  //     alert("Operation failed.");
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        console.log("Updating trainee with ID:", id); // Debugging log
        console.log("Data being sent:", formData); // Debugging log
        await axios.put(`http://localhost:5000/trainees/${id}`, formData);
        alert("Trainee updated successfully!");
        navigate("/EditTrainees"); // Navigate back to trainee list
      } else {
        await axios.post("http://localhost:5000/trainees", formData);
        alert("Trainee created successfully!");
        setFormData({
          name: "",
          mobile: "",
          nic: "",
          email: "",
          address: "",
          startDate: "",
          endDate: "",
          institute: "",
          languages: "",
          specialization: "",
          supervisor: "",
          tdate: "",
          assignedWork: "",
        }); // Reset the form
      }
    } catch (err) {
      console.error("Error submitting form:", err.response || err.message);
      alert("Operation failed.");
    }
  };

  return (
    <>
    <Header />
    <div className="create-container">
      <form className="create-form" onSubmit={handleSubmit}>
        <h1 className="create-title">Create Trainee</h1>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="input-name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="mobile">Mobile</label>
          <input
            type="tel"
            id="mobile"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            className="input-mobile"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="nic">NIC</label>
          <input
            type="text"
            id="nic"
            name="nic"
            value={formData.nic}
            onChange={handleChange}
            className="input-nic"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="input-email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Home Address/City</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="input-address"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="startDate">Training Start Date</label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="input-start-date"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="endDate">Training End Date</label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className="input-end-date"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="institute">Institute</label>
          <input
            type="text"
            id="institute"
            name="institute"
            value={formData.institute}
            onChange={handleChange}
            className="input-institute"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="languages">Languages Known</label>
          <input
            type="text"
            id="languages"
            name="languages"
            value={formData.languages}
            onChange={handleChange}
            className="input-languages"
            required
          />
          <small className="create-hint">Enter Programming Languages</small>
        </div>
        <div className="form-group">
          <label htmlFor="specialization">Field of Specialization</label>
          <select
            id="specialization"
            name="specialization"
            value={formData.specialization}
            onChange={handleChange}
            className="input-specialization"
            required
          >
            <option value="" disabled>Select Specialization</option>
            {specializations.map((spec, index) => (
              <option key={index} value={spec}>{spec}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="supervisor">Supervisor</label>
          <select
            id="supervisor"
            name="supervisor"
            value={formData.supervisor}
            onChange={handleChange}
            className="input-supervisor"
            required
          >
            <option value="" disabled>Select Supervisor</option>
            {supervisors.map((supervisor, index) => (
              <option key={index} value={supervisor}>{supervisor}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="assignedWork">Assigned Work</label>
          <textarea
            id="assignedWork"
            name="assignedWork"
            value={formData.assignedWork}
            onChange={handleChange}
            className="textarea-assigned-work"
            rows="4"
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="tdate">Target Date</label>
          <input
            type="date"
            id="tdate"
            name="tdate"
            value={formData.tdate}
            onChange={handleChange}
            className="target-date"
            required
          />
        </div>
        <button type="submit" className="create-submit-button">
          {isEdit ? "Update" : "Create"}
        </button>
      </form>
    </div>
    </>
  );
};

export default Create;
