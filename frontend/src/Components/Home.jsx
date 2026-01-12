import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";  

const Home = () => {
  return (
    <div className="home-container">
      <section className="hero">
        <h1>
          Organize your <br /> Work and Life, Finally.
        </h1>

        <p>
          Become focused, organized, and calm with <br />
          todo app. The World's #1 task manager app.
        </p>
       <Link   to="/todo"> 
        <button className="btn solid big">Make Todo List</button></Link>
      </section>
    </div>
  );
};

export default Home;
