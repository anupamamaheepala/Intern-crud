import React from "react";
import { Link } from "react-router-dom";
import "../css/header.css";

const Header = () => {
  return (
    <header className="header">
      <nav className="navbar">
        <div className="navbar-logo">
          <Link to="/">Trainee Registration</Link>
        </div>
        <ul className="navbar-links">
          <li>
            <Link to="/">Create Trainee</Link>
          </li>
          <li>
            <Link to="/index">View Trainees</Link>
          </li>
          <li>
            <Link to="/EditTrainees">Edit Trainees</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
