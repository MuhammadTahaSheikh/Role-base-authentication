import React, { useState } from 'react';
import { registerUser } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import './Register.css'; 
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '', role: 'user' });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(formData);
      navigate("/login");
      toast.success("User registered successfully");
      // alert('User registered successfully');
    } catch (error) {
      // console.log("check error", error.message);
      toast.error("User Exist already");
      // alert('Registration failed try different name/');
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="register-form">
        <h2>Register</h2>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            name="username"
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label>Role:</label>
          <select name="role" onChange={handleChange} className="form-select">
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button type="submit" className="register-button">Register</button>
      </form>
      <ToastContainer position="top-right" />
    </div>
  
  );
};

export default Register;
