// src/App.jsx

import React from 'react';
import AllRoutes from './routes/AllRoutes';
import '../public/assets/bootstrap/css/bootstrap.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import DialogflowWidget from './components/DialogflowWidget';

const App = () => {
  return (
    <>
      <Navbar />
      <AllRoutes />
      <Footer />
      <DialogflowWidget />
    </>
  );
};

export default App;
