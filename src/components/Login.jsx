import { Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const Login = () => {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [error, seterror] = useState("");
const navigate =useNavigate();
  const handleSubmit = async(e) => {
    try {
      e.preventDefault();
      const res = await axios.post("http://localhost:5000/0auth/login",{email,password});
      console.log(res?.data);
      if(res?.data?.isAuthenticated)
      {
        sessionStorage.setItem("auth",email);
          navigate('/postnews');
      }
      else{
          seterror(res?.data?.message)
      }
      
    } catch (error) {
      seterror(error.message);
    }
 
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div className="card p-4 shadow-sm" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="card-title text-center mb-4">Welcome Back!</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              className="form-control"
              placeholder="Enter your email..."
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              placeholder="Enter your password"
              required
            />
          </div>
<p>{error}</p>
          <button
            type="submit"
            className="btn btn-primary w-100"
          >
            Login
          </button>
          <Text mt={4}>Don't have an account? <Link style={{color:'blue',textDecoration:'underline'}} to={'/register'}>Register</Link> here...</Text>
        </form>
      </div>
    </div>
  );
};

export default Login;
