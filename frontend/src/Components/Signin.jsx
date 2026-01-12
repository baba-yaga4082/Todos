import React from 'react'
import "./Signin.css";
import { IoIosLogIn } from "react-icons/io";
import { useState } from 'react';
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux";
import { login } from './Store/counterSlice';
import axios from "axios";
import toast from 'react-hot-toast';
const Signin = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const change = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input, [name]: value
    });
  }
  const clicked = (e) => {
    e.preventDefault();

    axios.post("http://localhost:3000/api/login", input)
      .then((res) => {

      const { user, token } = res.data;

      toast(`Welcome back, ${user.username}!`);
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("userId", user._id);

     dispatch(login());
      setInput({
        email: "",
        password: "",
      });
      history("/todo");
  })
      .catch ((error) => {
  console.error("Login error:", error);
  alert(error.response?.data?.message || "Login failed");
});
  }


return (

  <div className="signup-container">

    <div className="signup-right">
      <h1><IoIosLogIn /> <br />Sign<br />In</h1>
    </div>

   
    <div className="signup-left">
      <input
        type="email"
        placeholder="Enter Your Email"
        className="signup-input"
        name='email'
        onChange={change}
        value={input.email}
      />

      <input
        type="password"
        placeholder="Enter Your Password"
        className="signup-input"
        name='password'
        onChange={change}
        value={input.password}
      />

      <button className="signup-btn" onClick={clicked}>Sign In </button>
    </div>

    {/* Divider */}
    {/* <div className="signup-divider"></div> */}


    {/* <div className="signup-right">
              <h1><IoIosLogIn /> <br />Sign<br />In</h1>
            </div> */}
  </div>

)
}

export default Signin
