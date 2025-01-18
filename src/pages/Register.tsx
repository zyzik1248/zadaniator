import React, { useState } from 'react';
import './Register.scss'
import { register } from '../api/index.ts';
import { useNavigate } from "react-router";

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
      <h1>Register</h1>
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
    </div>
  );
};

export default Register;
