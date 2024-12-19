import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Create from './pages/Create';
import Index from './pages/Index';
import EditTrainees from './pages/EditTrainees';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Create />} />
        <Route path="/index" element={<Index />} />
        <Route path="/EditTrainees" element={<EditTrainees />} />
        <Route path="/edit/:id" element={<Create isEdit />} />
      </Routes>
    </Router>
  );
}

export default App;