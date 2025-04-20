import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import image2 from '../../public/assets/images/WhatsApp Image 2025-04-18 at 22.34.44_1fca03f5.jpg';
import image3 from '../../public/assets/images/WhatsApp Image 2025-04-18 at 22.36.11_9bbbbf5c.jpg';
import image4 from '../../public/assets/images/WhatsApp Image 2025-04-18 at 22.36.35_e83babe7.jpg';
import image5 from '../../public/assets/images/WhatsApp Image 2025-04-18 at 22.37.10_19fa8e23.jpg';
import { AuthContext } from '../context/AuthContext';

const Home = () => {
  const { user } = useContext(AuthContext) || {};
  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const handleTripClick = () => {
    if (!user) {
      navigate('/signup');
    } else {
      navigate('/trip');
    }
  };

  return (
    <section className="container my-5">
      {/* Theme Toggle Button */}
      <div className="text-end mb-3">
        <button className="btn btn-outline-secondary" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      <div className="row align-items-center">
        <div className="col-md-6">
          <h2 className="fw-bold hero-text">Intelligent AI <span className="highlight">Agents</span> Designed To</h2>
          <h2 className="fw-bold hero-text">Transform your <span className="text-success">JOURNEY</span><span className="text-danger">.</span></h2>

          <button className="btn btn-eco mt-4" onClick={handleTripClick}>
            Plan My ECOTrip
          </button>

          <div className="row mt-5">
            <div className="col-md-4 mb-4">
              <div className="feature-box">
                <img src={image3} alt="Public Transport" className="img-fluid" />
                <h6 className="fw-bold mt-2">Public Transport</h6>
                <p className="text-muted">Know all local options in one click.</p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="feature-box">
                <img src={image4} alt="CO Comparison" className="co-image" />
                <h6 className="fw-bold mt-2">CO Comparison</h6>
                <p className="text-muted">Get real-time emissions estimate.</p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="feature-box">
                <img src={image5} alt="Cost Saver" className="img-fluid" />
                <h6 className="fw-bold mt-2">Cost Saver</h6>
                <p className="text-muted">Save money by choosing smarter</p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6 text-center mt-4 mt-md-0">
          <div className="logo-wrapper">
            <img src={image2} alt="AI Logo" className="img-fluid fitted-logo" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;