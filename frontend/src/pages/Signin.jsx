import React, { useState, useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, NavLink } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import '../App.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const togglePassword = () => setShowPassword((prev) => !prev);

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email').required('Required'),
      password: Yup.string().required('Required'),
    }),
    onSubmit: async (values) => {
      try {
        const res = await axios.post('http://localhost:5000/api/signin', values);
        const { token, user } = res.data;

        localStorage.setItem('token', token);        // Save token
        setUser(user);                                // Set user globally
        navigate('/');                                // Redirect to home page
      } catch (err) {
        alert(err.response?.data?.message || 'Login failed');
      }
    }
  });

  return (
    <div className="form-container shadow">
      <h4 className="mb-4 fw-bold">Sign in</h4>

      <form onSubmit={formik.handleSubmit}>
        <div className="mb-3">
          <label className="form-label fw-semibold">Email</label>
          <div className="input-group">
            <span className="input-group-text"><i className="bi bi-envelope"></i></span>
            <input
              type="email"
              name="email"
              className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
              placeholder="Enter your email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="invalid-feedback d-block">{formik.errors.email}</div>
            )}
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold d-flex justify-content-between">
            <span>Password</span>
            <NavLink to="/forgot" className="text-decoration-none text-success" style={{ fontSize: '0.8rem' }}>
              Forgot password?
            </NavLink>
          </label>
          <div className="input-group">
            <span className="input-group-text"><i className="bi bi-lock"></i></span>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              className={`form-control ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
              placeholder="Enter your password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            <span className="input-group-text" onClick={togglePassword} style={{ cursor: 'pointer' }}>
              <i className={`bi ${showPassword ? 'bi-eye' : 'bi-eye-slash'}`}></i>
            </span>
            {formik.touched.password && formik.errors.password && (
              <div className="invalid-feedback d-block">{formik.errors.password}</div>
            )}
          </div>
        </div>

        <div className="form-check mb-3">
          <input className="form-check-input" type="checkbox" defaultChecked />
          <label className="form-check-label">Remember me</label>
        </div>

        <button type="submit" className="btn btn-green w-100">Sign in</button>

        <p className="mt-3 text-center">
          Don't have an account? <NavLink to="/signup">Sign up</NavLink>
        </p>

        <div className="text-center my-2 text-muted">OR</div>

        <div className="d-flex justify-content-center">
          <button type="button" className="social-icon-btn google-btn"><i className="bi bi-google"></i></button>
          <button type="button" className="social-icon-btn facebook-btn"><i className="bi bi-facebook"></i></button>
          <button type="button" className="social-icon-btn apple-btn"><i className="bi bi-apple"></i></button>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
