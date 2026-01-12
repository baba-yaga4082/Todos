import React from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";       
import { useSelector} from "react-redux";
import { FaRegBookmark } from "react-icons/fa";
import { useDispatch } from "react-redux";  
import { login, logout } from "./Store/counterSlice"; 



const Navbar = () => {
   const dispatch = useDispatch();
  const islogged = useSelector((state)=> state.isloggedin)
  const history = useNavigate();
  console.log(islogged)
  const out =()=>{
      dispatch(logout());
      sessionStorage.clear();
      history('/');
      
  }
  return (
    <nav className="navbar">
     
      <div className="nav-left">
        <span className="logo"> <FaRegBookmark /> todo</span>
      </div>

      
      <div className="nav-center">
        <Link to="/">Home</Link>
        <Link to="/todo">Todo</Link>
        
      </div>

      {!islogged &&  <div className="nav-right">
       <Link to="/signup">
  <button className="btn outline">SignUp</button>
</Link>
      <Link to="/signin">
  <button className="btn outline">SignIn</button>
</Link>
       
      </div>}
      {islogged &&  <div className="nav-right">
     
    
        <button className="btn solid" onClick={out}>Log Out</button>
      </div>}
    </nav>
  );
};

export default Navbar;











// import React from 'react'

// const Navbar = () => {
//   return (
//     <div>
//       <nav classname="navbar navbar-expand-lg  flex flex-col bg-body-tertiary">
//   <div classname="container-fluid">
//     <a classname="navbar-brand" href="#">Navbar</a>
    
//     <div classname="collapse navbar-collapse" id="navbarSupportedContent">
//       <ul classname="navbar-nav me-auto mb-2 mb-lg-0">
//         <li classname="nav-item">
//           <a classname="nav-link active" aria-current="page" href="#">Home</a>
//         </li>
//         <li classname="nav-item">
//           <button>SignIn</button>
//         </li>
//         <li classname="nav-item dropdown">
//             <button>SignUp</button>
          
//         </li>
//        <li classname="nav-item dropdown">
//             <button>logOut</button>
          
//         </li>
//       </ul>
      
//     </div>
//   </div>
// </nav>  
      
//     </div>

//     )
// }

// export default Navbar
