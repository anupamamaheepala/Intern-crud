// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "../css/index.css"; // Use same CSS as Index.jsx
// import Header from '../components/Header';

// const EditTrainees = () => {
//   const [trainees, setTrainees] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [editIndex, setEditIndex] = useState(null); // To track which row is being edited
//   const [updatedData, setUpdatedData] = useState({}); // To store the updated trainee data

//   // Fetch trainees data from the server
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/trainees");
//         setTrainees(response.data);
//         setLoading(false);
//       } catch (err) {
//         setError("Failed to fetch trainees data.");
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   // Handle Search Functionality
//   const handleSearch = (e) => {
//     setSearchQuery(e.target.value.toLowerCase());
//   };

//   // Filter trainees based on the search query
//   const filteredTrainees = trainees.filter((trainee) =>
//     trainee.name.toLowerCase().includes(searchQuery) ||
//     trainee.email.toLowerCase().includes(searchQuery) ||
//     trainee.address.toLowerCase().includes(searchQuery)
//   );

//   // Enable editing for a specific trainee
//   const handleEdit = (index, trainee) => {
//     setEditIndex(index);
//     setUpdatedData(trainee);
//   };

//   // Handle changes in the input fields while editing
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUpdatedData({ ...updatedData, [name]: value });
//   };

//   // Save updates to the backend
//   const handleSave = async (id) => {
//     try {
//       await axios.put(`http://localhost:5000/trainees/${id}`, updatedData);
//       const updatedTrainees = [...trainees];
//       updatedTrainees[editIndex] = updatedData;
//       setTrainees(updatedTrainees);
//       setEditIndex(null);
//       alert("Trainee updated successfully!");
//     } catch (err) {
//       console.error("Error updating trainee:", err);
//       alert("Failed to update trainee.");
//     }
//   };

//   // Delete a trainee
//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/trainees/${id}`);
//       const filtered = trainees.filter((trainee) => trainee._id !== id);
//       setTrainees(filtered);
//       alert("Trainee deleted successfully!");
//     } catch (err) {
//       console.error("Error deleting trainee:", err);
//       alert("Failed to delete trainee.");
//     }
//   };

//   if (loading) return <div className="loading">Loading trainees...</div>;
//   if (error) return <div className="error">{error}</div>;

//   return (
//     <>
//       <Header />
//       <div className="index-container">
//         <h1 className="index-title">Edit Trainees</h1>

//         {/* Search Bar */}
//         <div className="search-bar-container">
//           <input
//             type="text"
//             placeholder="Search"
//             value={searchQuery}
//             onChange={handleSearch}
//             className="search-bar"
//           />
//         </div>

//         <table className="trainee-table">
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Address</th>
//               <th>Institute</th>
//               <th>Specialization</th>
//               <th>Supervisor</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredTrainees.map((trainee, index) => (
//               <tr key={index}>
//                 {editIndex === index ? (
//                   <>
//                     {/* Editable Fields */}
//                     <td>
//                       <input
//                         type="text"
//                         name="name"
//                         value={updatedData.name}
//                         onChange={handleChange}
//                       />
//                     </td>
//                     <td>
//                       <input
//                         type="email"
//                         name="email"
//                         value={updatedData.email}
//                         onChange={handleChange}
//                       />
//                     </td>
//                     <td>
//                       <input
//                         type="text"
//                         name="address"
//                         value={updatedData.address}
//                         onChange={handleChange}
//                       />
//                     </td>
//                     <td>
//                       <input
//                         type="text"
//                         name="institute"
//                         value={updatedData.institute}
//                         onChange={handleChange}
//                       />
//                     </td>
//                     <td>
//                       <input
//                         type="text"
//                         name="specialization"
//                         value={updatedData.specialization}
//                         onChange={handleChange}
//                       />
//                     </td>
//                     <td>
//                       <input
//                         type="text"
//                         name="supervisor"
//                         value={updatedData.supervisor}
//                         onChange={handleChange}
//                       />
//                     </td>
//                     <td>
//                       <button onClick={() => handleSave(trainee._id)}>Save</button>
//                       <button onClick={() => setEditIndex(null)}>Cancel</button>
//                     </td>
//                   </>
//                 ) : (
//                   <>
//                     {/* Non-Editable Fields */}
//                     <td>{trainee.name}</td>
//                     <td>{trainee.email}</td>
//                     <td>{trainee.address}</td>
//                     <td>{trainee.institute}</td>
//                     <td>{trainee.specialization}</td>
//                     <td>{trainee.supervisor}</td>
//                     <td>
//                       <button onClick={() => handleEdit(index, trainee)}>Edit</button>
//                       <button onClick={() => handleDelete(trainee._id)}>Delete</button>
//                     </td>
//                   </>
//                 )}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </>
//   );
// };

// export default EditTrainees;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/index.css";
import Header from "../components/Header";

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
    </>
  );
};

export default EditTrainees;
