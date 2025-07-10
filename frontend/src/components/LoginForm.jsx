import { useState } from "react";
import React from "react";
import axios from "../api/axiosInstance";
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleIdentifierChange = (e) => {
    setIdentifier(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Identifier:", identifier);
    console.log("Password:", password);

    try {
      console.log('inside');
      const res = await axios.post('/auth/login', { identifier, password });
      const { token, user } = res.data;

      localStorage.setItem('token', token);
      localStorage.setItem('role', user.role);

      if (user.role === 'stockist') navigate('/stockist/dashboard');
      else if (user.role === 'franchise') navigate('/franchise');
      else if (user.role === 'customer') navigate('/customer');
    } catch (err) {
      console.error(err);
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Franchise ID, Email, or Phone</label><br />
          <input type="text" value={identifier} onChange={handleIdentifierChange} required />
        </div>
        <div>
          <label>Password</label><br />
          <input type="password" value={password} onChange={handlePasswordChange} required />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;