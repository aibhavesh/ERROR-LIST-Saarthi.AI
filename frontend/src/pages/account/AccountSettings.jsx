import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AccountSettings = () => {
  const [profile, setProfile] = useState({});
  const token = localStorage.getItem('token'); // stored after signin

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/user/me', {
          headers: {
            Authorization: token
          }
        });
        setProfile(res.data.user);
      } catch (err) {
        console.error('Error fetching profile', err);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="card p-4 shadow-sm">
      <h5 className="mb-3">User Info</h5>
      <p><strong>Name:</strong> {profile.name}</p>
      <p><strong>Email:</strong> {profile.email}</p>
    </div>
  );
};

export default AccountSettings;
