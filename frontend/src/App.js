// import React, { useState, useEffect } from 'react'

// function App() {
//   const [data, setData] = useState(null); // Start with null

//   useEffect(() => {
//     fetch("/ping_db")
//       .then((res) => res.json())
//       .then((data) => {
//         setData(data); // Set the entire response
//         console.log(data);
//       });
//   }, []);

//   return (
//     <div>
//       {/* Check if data is null */}
//       {!data ? (
//         <p>Loading...</p>
//       ) : (
//         <p>{data.message}</p> // Display the "message" property
//       )}
//     </div>
//   );
// }

// export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Create from './pages/Create';
import Index from './pages/Index';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Create />} />
        <Route path="/index" element={<Index />} />
      </Routes>
    </Router>
  );
}

export default App;