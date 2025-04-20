import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Plantrip = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      from: '',
      to: '',
      priority: 'Greenest Route',
    },
    validationSchema: Yup.object({
      from: Yup.string().required('From location is required'),
      to: Yup.string().required('Destination is required'),
    }),
    onSubmit: async (values) => {
      if (!token) {
        alert('Please login first.');
        navigate('/login');
        return;
      }

      try {
        setLoading(true);
        const res = await axios.post('http://localhost:5000/api/trip', values, {
          headers: { Authorization: token },
        });

        localStorage.setItem('tripResult', JSON.stringify(res.data.output));
        setLoading(false);
        navigate('/output');
      } catch (error) {
        console.error('Trip planning error:', error);
        setLoading(false);
        alert('Trip planning failed. Please login again.');
      }
    },
  });

  return (
    <div className="container mt-5">
      <h3>Plan My EcoTrip</h3>
      <form onSubmit={formik.handleSubmit}>
        <input
          name="from"
          placeholder="From"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="form-control mb-2"
        />
        {formik.touched.from && formik.errors.from && (
          <div className="text-danger mb-2">{formik.errors.from}</div>
        )}

        <input
          name="to"
          placeholder="To"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="form-control mb-2"
        />
        {formik.touched.to && formik.errors.to && (
          <div className="text-danger mb-2">{formik.errors.to}</div>
        )}

        <select
          name="priority"
          onChange={formik.handleChange}
          className="form-select mb-3"
          value={formik.values.priority}
        >
          <option>Greenest Route</option>
          <option>Fastest Route</option>
          <option>Cheapest Route</option>
        </select>

        <button type="submit" className="btn btn-success w-100">
          {loading ? 'Planning...' : 'Plan My ECOTrip'}
        </button>
        <button
          type="button"
          className="btn btn-primary w-100 mt-2"
          onClick={() => navigate('/langflow')}> Expectet Output IN LANFlow</button>
      </form>
    </div>
  );
};

export default Plantrip;
