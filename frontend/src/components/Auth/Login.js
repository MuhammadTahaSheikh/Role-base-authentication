import React, { useState } from "react";
import { loginUser } from "../../services/api";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    const userData = { username, password };

    try {
      const response = await loginUser(userData);
      toast.success("response");
      // console.log('Login Response:', response); // Log the response
      if (response.token) {
        toast.success("response");
        localStorage.setItem("token", response.token);
        localStorage.setItem("role", response.role);
        navigate("/");
       
      } else {
        setError("Login failed. Please try again."); 
      }
    } catch (error) {
      console.error("Login failed:", error);
      setError("Invalid credentials. Please try again."); 
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">
        <h2>Login</h2>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="form-input"
          />
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
        {error && <p className="error-message">{error}</p>}
      </form>
      <ToastContainer position="top-right" />
    </div>
  );
};

export default Login;
