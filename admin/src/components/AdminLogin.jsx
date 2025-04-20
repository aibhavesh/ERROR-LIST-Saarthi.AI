import { useState } from 'react';

const AdminLogin = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (res.ok) {
      localStorage.setItem('adminToken', data.token);
      onLogin();
    } else {
      alert(data.message || "Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-5" style={{ maxWidth: "400px" }}>
      <h2>Admin Login</h2>
      <input type="email" className="form-control my-2" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" className="form-control my-2" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit" className="btn btn-primary w-100">Login</button>
    </form>
  );
};

export default AdminLogin;
