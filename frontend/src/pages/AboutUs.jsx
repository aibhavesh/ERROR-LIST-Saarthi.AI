import React from 'react';
import '../App.css'; // shared styles

import image from '../../public/assets/images/WhatsApp Image 2025-04-18 at 22.34.44_1fca03f5.jpg';
 // update with your actual logo path

const AboutUs = () => {
  return (
    <>
    

      {/* About Section */}
      <div className="container py-5 about-page">
        <h2 className="text-center fw-bold text-green mb-4">About Us</h2>

        <div className="row align-items-center">
          <div className="col-lg-7">
            <div className="mb-4 p-3 border rounded">
              <p><strong>At Saarthi.AI</strong>, we have to hold this  are on a mission to revolutionize how urban India moves — making every journey smarter, greener, and more sustainable. 🚶‍♂️🌍🛴</p>
              <p>We believe mobility isn’t just about reaching from point A to B — it’s about how we get there. With climate change knocking at our doors, sustainable urban transport is no longer optional — it’s essential.</p>
              <p>That’s why we built an Agentic AI-powered smart travel planner that helps citizens and city planners choose the most eco-friendly travel options by comparing routes, CO₂ emissions, cost, and time — all in one intelligent dashboard.</p>
              <p>Whether you’re a daily commuter, a climate-conscious traveler, or a policymaker aiming to redesign traffic flows — we provide the data-driven insights and intuitive tools you need to take the smarter road.</p>
            </div>
          </div>
          <div className="col-lg-5 text-center">
            <img src={image} alt="Eco AI" className="img-fluid rounded" />
          </div>
        </div>

        {/* What Drives Us */}
        <div className="mt-5">
          <h4 className="text-green mb-3"><span className="section-icon">💡</span> What Drives Us?</h4>
          <div className="highlight-box">
            <ul className="list-unstyled">
              <li className="icon-text"><span className="section-icon">🌱</span> A passion for environment-first innovation</li>
              <li className="icon-text"><span className="section-icon">🧠</span> Leveraging AI and data to empower conscious choices</li>
              <li className="icon-text"><span className="section-icon">🏙️</span> Building smarter cities for future generations</li>
              <li className="icon-text"><span className="section-icon">🫱‍🫲</span> Bridging the gap between people, policy, and planet</li>
            </ul>
          </div>
        </div>

        {/* Our Vision */}
        <div className="mt-5">
          <h4 className="text-purple"><span className="section-icon">👁️‍🗨️</span> Our Vision</h4>
          <p>To be India’s leading sustainability-focused urban mobility platform, inspiring millions to reduce their carbon footprint — one commute at a time.</p>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
