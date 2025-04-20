// Output.jsx
import React, { useEffect, useState } from 'react';

const Output = () => {
  const [output, setOutput] = useState('');

  useEffect(() => {
    const result = JSON.parse(localStorage.getItem('tripResult'));
    setOutput(result?.response || 'No result found');
  }, []);

  return (
    <div className="container mt-5">
      <h3>Trip Plan Result</h3>
      <p>{output}</p>
    </div>
  );
};

export default Output;
