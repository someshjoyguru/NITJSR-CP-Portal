import axios from "axios";
import React, { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { Context, server } from "../main";
import "../styles/Header.css";

const Header = () => {
  const { isAuthenticated, setIsAuthenticated} =
    useContext(Context);

  
  
  const logoutHandler = async () => {
    
    try {
      await axios.get(`${server}/users/logout`, {
        withCredentials: true,
      });

      toast.success("Logged Out Successfully");
      setIsAuthenticated(false);
      
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthenticated(true);
      
    }
  };

  

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h2>NITJSR CP Portal <span className="header-mid"> 🔥🔥🔥</span></h2>
        
      </div>
      <div className="navbar-right">
        {isAuthenticated ? (
          <button onClick={logoutHandler} className="btn">
            Logout
          </button>
        ) : (
          <Link to={"/login"} className="btn">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Header;
