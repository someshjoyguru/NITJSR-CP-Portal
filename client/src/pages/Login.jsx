import axios from "axios";
import React, { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { Link, Navigate } from "react-router-dom";
import { Context, server } from "../main";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
// import "../styles/Login.css";

const Login = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        `${server}/users/login`,
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      toast.success(data.message);
      setIsAuthenticated(true);
    } catch (error) {
      toast.error(error.response.data.message);

      setIsAuthenticated(false);
    }
  };

  if (isAuthenticated) return <Navigate to={"/"} />;

  return (
    <div className="login">
      <section>
        <form onSubmit={submitHandler}>
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            required
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="btnHalf">
            <Link to="/register" className="btnHalf-2">
              Sign Up
            </Link>
          </button>
          <button type="submit" className="btnHalf">
            <Link to="/login" className="btnHalf-2">
              Log In
            </Link>
          </button>
        </form>
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '70%' },
          }}
          noValidate
          autoComplete="off"
          onSubmit={submitHandler}
        >
          <TextField id="outlined-basic" label="Email" variant="outlined" />
          <TextField
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
          />
          {/* <TextField id="filled-basic" label="Filled" variant="filled" /> */}
          {/* <TextField id="standard-basic" label="Standard" variant="standard" /> */}
        </Box>
      </section>
    </div>
  );
};

export default Login;
