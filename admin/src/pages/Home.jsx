import React from 'react';
import projectImage from '../assets/WhatsApp Image 2025-04-18 at 22.34.44_1fca03f5.jpg'; // make sure to add your image in assets folder

const Home = () => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center text-center vh-100 bg-light">
      <img src={projectImage} alt="Project" style={{ maxWidth: '300px', borderRadius: '10px' }} />
      <h1 className="mt-4 text-success">Welcome the Owner</h1>
      <p className="text-muted">Your personalized admin control panel for Saarthi</p>
    </div>
  );
};

export default Home;
