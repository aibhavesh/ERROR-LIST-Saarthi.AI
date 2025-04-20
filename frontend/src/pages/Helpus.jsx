// src/pages/Helpus.jsx
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const HelpUs = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      message: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string().email('Invalid email').required('Email is required'),
      message: Yup.string().required('Message cannot be empty')
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        await axios.post('http://localhost:5000/api/contact', values);
        alert('Thank you for contacting us!');
        resetForm();
      } catch (err) {
        alert('Something went wrong. Try again later.');
      }
    }
  });

  return (
    <div className="container my-5">
      <h2 className="mb-4">Help Us / Contact</h2>
      <form onSubmit={formik.handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          onChange={formik.handleChange}
          className="form-control mb-3"
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          onChange={formik.handleChange}
          className="form-control mb-3"
        />
        <textarea
          name="message"
          rows="4"
          placeholder="Your Message"
          onChange={formik.handleChange}
          className="form-control mb-3"
        ></textarea>
        <button type="submit" className="btn btn-success">Send Message</button>
      </form>
    </div>
  );
};

export default HelpUs;
