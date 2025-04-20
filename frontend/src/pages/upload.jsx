// src/pages/Upload.jsx
import React, { useState } from 'react';
import axios from 'axios';

const Upload = () => {
  const [file, setFile] = useState(null);
  const token = localStorage.getItem('token');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert('Please select a file');

    const formData = new FormData();
    formData.append('file', file);

    try {
      await axios.post('http://localhost:5000/api/upload', formData, {
        headers: {
          Authorization: token,
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('File uploaded successfully!');
      setFile(null);
    } catch (err) {
      alert('Upload failed. Please try again.');
    }
  };

  return (
    <div className="container my-5">
      <h3 className="mb-3">Upload a File</h3>
      <form onSubmit={handleUpload}>
        <input type="file" className="form-control mb-3" onChange={handleFileChange} />
        <button type="submit" className="btn btn-success">Upload</button>
      </form>
    </div>
  );
};

export default Upload;
