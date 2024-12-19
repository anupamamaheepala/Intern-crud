import React, { useState, useEffect } from "react";
import "../css/footer.css";

const Footer = () => {
  const [currentDateTime, setCurrentDateTime] = useState("");

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const formattedDateTime = now.toLocaleString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
      setCurrentDateTime(formattedDateTime);
    };

    // Update the date and time every second
    const intervalId = setInterval(updateDateTime, 1000);

    // Set the initial date and time
    updateDateTime();

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <footer className="footer">
      <p>© 2024 - Digital Platform</p>
      <p>Your last login was at: {currentDateTime}</p>
    </footer>
  );
};

export default Footer;
