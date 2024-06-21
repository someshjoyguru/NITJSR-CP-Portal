import axios from "axios";
import React, { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { Navigate, useNavigate } from "react-router-dom";
import { Context, server } from "../main";

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";

const Header = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const logoutHandler = async () => {
    try {
      await axios.get(`${server}/users/logout`, {
        withCredentials: true,
      });

      toast.success("Logged Out Successfully");
      setIsAuthenticated(false);
      navigate('/login');
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthenticated(true);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{backgroundColor: "darkblue"}}>
        <Toolbar>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 900 }}>
            NITJSR CP {isMobile ? '' : "Portal"}
          </Typography>
          <Button color="inherit" onClick={() => navigate('/')}>
            Dashboard
          </Button>
          {isAuthenticated ? (
            <Button color="inherit" onClick={logoutHandler}>Logout</Button>
          ) : (
            <Button color="inherit" onClick={() => {
              navigate('/login');
            }}>Login</Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
