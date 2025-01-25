import React, { useState } from 'react';
import './Register.scss'
import { register } from '../api/index.ts';
import logo from "../assets/logo-3.png";
import { Link, useNavigate } from 'react-router';
import logo1 from "../assets/logo-biale.png";

const Register = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      username: e.target["username"].value,
      password: e.target["password"].value,
      email: e.target["email"].value
    }

    try{
      await register(data)
      navigate("/login")
    } catch(error){
      console.log(error)
    }
  };

  return (
    <div className="register-page">
      <h1><img className="logo-biale" src={logo1} alt="Logo-biale" /><img className="logo-3" src={logo} alt="Logo-3" /></h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <button type="submit">Register</button>
      </form>
      <div className="login-link">
          <Link to="/login">Back to login</Link>
        </div>
    </div>
  );
};

export default Register;
