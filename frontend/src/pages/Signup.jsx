import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { name: '', email: '', password: '' },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string().email('Invalid email').required('Email is required'),
      password: Yup.string().min(6, 'Minimum 6 characters').required('Password is required')
    }),
    onSubmit: async (values) => {
      try {
        await axios.post('http://localhost:5000/api/signup', values);
        alert('Signup successful! Please login now.');
        navigate('/login');
      } catch (err) {
        alert(err.response?.data?.message || 'Signup failed');
      }
    }
  });

  return (
    <div className="container mt-5" style={{ maxWidth: '500px' }}>
      <h2 className="text-center mb-4">Create Your Account</h2>
      
      {/* 👇👇 Add this login redirect text */}
      <p className="text-center mb-3">
        <small>
          Already have an account? <Link to="/signin">Login</Link>
        </small>
      </p>

      <form onSubmit={formik.handleSubmit} className="shadow p-4 rounded bg-light">
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            name="name"
            className={`form-control ${formik.touched.name && formik.errors.name ? 'is-invalid' : ''}`}
            placeholder="Your full name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name && (
            <div className="invalid-feedback">{formik.errors.name}</div>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            name="email"
            className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
            placeholder="Enter your email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email && (
            <div className="invalid-feedback">{formik.errors.email}</div>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            name="password"
            className={`form-control ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
            placeholder="Choose a strong password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password && (
            <div className="invalid-feedback">{formik.errors.password}</div>
          )}
        </div>

        <button type="submit" className="btn btn-success w-100 mt-3">Register</button>
      </form>
    </div>
  );
};

export default Signup;
