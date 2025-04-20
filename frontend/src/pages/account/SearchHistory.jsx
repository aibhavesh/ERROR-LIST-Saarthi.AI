// src/pages/account/SearchHistory.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SearchHistory = () => {
  const [history, setHistory] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/trip/history', {
          headers: { Authorization: token }
        });
        setHistory(res.data.history);
      } catch (err) {
        console.error(err);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="card p-4 shadow-sm">
      <h5 className="mb-3">Recent EcoTrips</h5>
      {history.length === 0 ? (
        <p className="text-muted">No history found.</p>
      ) : (
        <ul className="list-group">
          {history.map((item, idx) => (
            <li key={idx} className="list-group-item d-flex justify-content-between">
              <span>{item.from} → {item.to}</span>
              <small className="text-muted">{new Date(item.createdAt).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchHistory;
