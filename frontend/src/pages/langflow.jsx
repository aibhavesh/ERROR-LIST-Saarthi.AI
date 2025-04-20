import React from 'react';

const LangflowOutput = () => {
  return (
    <div className="container mt-5 text-center">
      <h2 className="mb-4">Your Eco Trip Summary</h2>
      <div className="row justify-content-center">
        <div className="col-md-4 col-sm-12 mb-3">
          <img src="/assets/images/Cheapest.png" className="img-fluid rounded shadow" alt="Cheapest Option" />
          <p className="mt-2 fw-semibold">Cheapest Route</p>
        </div>
        <div className="col-md-4 col-sm-12 mb-3">
          <img src="/assets/images/Fastest.png" className="img-fluid rounded shadow" alt="Fastest Option" />
          <p className="mt-2 fw-semibold">Fastest Route</p>
        </div>
        <div className="col-md-4 col-sm-12 mb-3">
          <img src="/assets/images/Greenest.png" className="img-fluid rounded shadow" alt="Greenest Option" />
          <p className="mt-2 fw-semibold">Greenest Route</p>
        </div>
      </div>
    </div>
  );
};

export default LangflowOutput;
