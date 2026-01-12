import "./Signup.css";
import { IoIosLogIn } from "react-icons/io";
import { useState } from "react";
import {useNavigate} from "react-router-dom"

import axios from "axios";
const Signup = () => {
  const [input, setInput] = useState({
    email: "",
    username: "",
    password: "",
  });
  const history = useNavigate();
  const change = (e) => {
      const { name, value } = e.target;
      setInput({
          ...input,[name]: value
      });
  }
  const submit = async(e) => {
      e.preventDefault();
     await axios.post("http://localhost:3000/api/register", input)
      .then((res) => {alert (res.data.message)})
      setInput({
        email: "",
        username: "",
        password: "",
      });
      history("/signin")
  }
   

  return (
    <div className="signup-container">
      <div className="signup-left">
        <input
          type="email"
          name="email"
          placeholder="Enter Your Email"
          className="signup-input"
          onChange={change}
           value={input.email}
         
        />
        <input
          type="text"
          name="username"
          placeholder="Enter Your Username"
          className="signup-input"
           onChange={change}
            value={input.username}
        />

        <input
          type="password" 
          name="password"
          placeholder="Enter Your Password"
          className="signup-input"
           onChange={change}
           value={input.password}
        />

        <button className="signup-btn" onClick={submit}>Sign Up</button>
      </div>

   
      <div className="signup-divider"></div>

      <div className="signup-right">
        <h1><IoIosLogIn /> <br />Sign<br />Up</h1>
      </div>
    </div>
  );
};

export default Signup;
