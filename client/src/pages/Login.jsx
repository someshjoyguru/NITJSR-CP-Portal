import axios from "axios";
import React, { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { Link, Navigate } from "react-router-dom";
import { Context, server } from "../main";
import Box from '@mui/material/Box';
// import "../styles/Login.css";
import { Button, Stack, Typography, Input, TextField, FormGroup } from '@mui/material';


const Login = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const { email, password } = formData;
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
        <Box
          sx={{
            borderRadius: '0.25rem',
            backgroundColor: 'rgba(119,97,223,255)',
            width: '70%',
            margin: 'auto',
            padding: '50px',
            ' @media(maxWidth:479px)': { padding: '10px' },
          }}>
          <Box
            sx={{
              backgroundColor: 'rgb(255,255,255)',
              boxShadow:
                'rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px',
              borderRadius: '10px',
              display: 'flex',
              width: '100%',
              maxWidth: '1200px',
              margin: 'auto',
              overflow: 'hidden',
            }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '20px',
                gap: '40px',
                width: '60%',
                ' @media(max-width:991px)': { width: '100%' },
                ' @media(maxWidth:479px)': { width: '100%' },
              }}>
              <Stack
                sx={{
                  width: '100%',
                  justifyContent: 'space-between',
                  gap: '10px',
                  alignItems: 'center',
                }}
                spacing="0px"
                direction="row">
                <img
                  src="https://upload.wikimedia.org/wikipedia/en/7/7d/National_Institute_of_Technology%2C_Jamshedpur_Logo.png"
                  style={{ objectFit: 'contain' }}
                  height="50px"
                  width="100px"
                />
                <Link to="/register">
                  <Button
                    disableElevation
                    variant="contained"
                    sx={{
                      '&:hover': { backgroundColor: 'transparent' },
                      gap: '5px',
                      color: '#73808c',
                      textTransform: 'none',
                      alignItems: 'center',
                      whiteSpace: 'nowrap',
                      backgroundColor: 'transparent',
                      border: 'none',
                      fontWeight: '600',

                    }}>
                    Not registered yet? Register Now!!
                    <img
                      src="https://purecodestorageprod.blob.core.windows.net/images-svg/Signup2_4c117eca-61bc-4f52-98c1-01d917350561.svg"
                      width="15px"
                      height="15px"
                    />
                  </Button>
                </Link>
              </Stack>
              <Stack
                sx={{
                  alignItems: 'center',
                  width: '100%',
                  ' @media(maxWidth:479px)': { marginTop: '10px' },
                }}
                spacing="10px">
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                  }}>
                  <Typography
                    variant="h4"
                    sx={{
                      fontFamily: 'system-ui',
                      fontWeight: '500',
                      ' @media(maxWidth:479px)': { fontSize: '20px' },
                    }}>
                    NIT Jamshedpur CP Portal
                  </Typography>
                  <Typography
                    variant="p"
                    sx={{
                      fontFamily: 'system-ui, sans-serif,  Segoe UI',
                      width: '70%',
                      color: '#73808c',
                      fontWeight: '600',
                      fontSize: '14px',
                    }}>
                    Welcome back! Please login to your account.
                  </Typography>
                </Box>
                <Stack
                  sx={{
                    alignItems: 'center',
                    paddingY: '30px',
                    width: '50%',
                    ' @media(max-width:991px)': { width: '80%' },
                    ' @media(maxWidth:479px)': { width: '100%' },
                  }}
                  spacing="15px">
                  <form onSubmit={submitHandler}>
                    <FormGroup>
                      <TextField name="email" label="Email" value={formData.email} onChange={handleChange} required sx={{
                        color: '#73808c',
                        borderRadius: '10px',
                        fontWeight: '500',
                        fontSize: '15px',
                        padding: '10px',
                        width: '100%',
                        outline: 'none',
                      }} />
                      <TextField name="password" label="Password" type="password" value={formData.password} onChange={handleChange} required sx={{
                        color: '#73808c',
                        borderRadius: '10px',
                        fontWeight: '500',
                        fontSize: '15px',
                        padding: '10px',
                        width: '100%',
                        outline: 'none',
                      }} />

                      <Button
                        type="submit"
                        sx={{
                          '&:hover': { backgroundColor: 'rgb(1,185,219)' },
                          gap: '8px',
                          color: 'white',
                          textTransform: 'none',
                          boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
                          backgroundColor: 'rgb(1,185,219)',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: '10px',
                          width: '100%',
                          fontWeight: '500',
                          padding: '10px',
                        }}
                      >
                        Log In
                      </Button>
                    </FormGroup>
                  </form>
                </Stack>
              </Stack>

              <Stack sx={{ alignItems: 'center', width: '100%' }} spacing="10px">
                <Stack
                  sx={{
                    alignItems: 'center',
                    width: '50%',
                    ' @media(maxWidth:479px)': { width: '100%' },
                  }}
                  spacing="5px"
                  direction="row">
                  
                  
                </Stack>
                
              </Stack>
              
            </Box>
            <Box
              sx={{
                backgroundImage:
                  'url(https://www.collegebatch.com/static/clg-gallery/national-institute-of-technology-jamshedpur-242023.jpg)',
                width: '40%',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                display: 'flex',
                alignItems: 'flex-end',
                ' @media(max-width:991px)': { display: 'none' },
                ' @media(maxWidth:479px)': { display: 'none' },
              }}>
              
            </Box>
          </Box>
        </Box>
    </section>
  </div>
  );
}

export default Login;
