import React, { useState } from 'react';
import './Login.scss'
import { Link, useNavigate } from 'react-router';
import { login } from '../api/index.ts';
const Login = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const navigate = useNavigate()
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      try{
        const data = {
          password: e.target["password"].value,
          username: e.target["username"].value
        }
        const resp = await login(data)
        localStorage.setItem("authToken", resp.access);
        navigate("/")
      } catch(error){
        console.log(error)
      }
    };
  
    return (
      <div className="login-page">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="username"
            name="username"
            placeholder="username"
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
          <button type="submit">Login</button>
        </form>
        <div className="register-link">
          <p>Don't have an account?</p>
          <Link to="/register">Register here</Link>
        </div>
      </div>
    );
  };
  
  export default Login;