import React from 'react';
import '../App.css';

const ShareFeedback = () => {
  return (
    <div className="container my-5">
      <div className="card shadow p-4">
        <h2 className="fw-bold mb-4 text-center text-success">Share Your Feedback</h2>
        <p className="text-muted text-center mb-4">Help us improve our services by sharing your experience</p>
        
        <form>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">Name</label>
              <input type="text" className="form-control" placeholder="Enter your name" />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">Email</label>
              <input type="email" className="form-control" placeholder="Enter your email" />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Type of Feedback</label>
            <select className="form-select">
              <option>Route Suggestion</option>
              <option>App Experience</option>
              <option>Transport Service</option>
              <option>Environmental Concern</option>
              <option>Other</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Your Feedback</label>
            <textarea className="form-control" rows="4" placeholder="Please share your detailed feedback here..."></textarea>
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Rate Your Experience</label>
            <div className="d-flex gap-2">
              {[1, 2, 3, 4, 5].map((num) => (
                <button key={num} type="button" className="btn btn-outline-success px-3">{num}</button>
              ))}
            </div>
          </div>

          <div className="text-center mt-4">
            <button type="submit" className="btn btn-success px-4 py-2">Submit Feedback</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShareFeedback;
