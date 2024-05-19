import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Context, server } from "../main";
import { toast } from "react-hot-toast";
import { Link, Navigate } from "react-router-dom";
import { Box, Button, TextField, Typography, useMediaQuery, useTheme, Grid } from "@mui/material";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useContext(Context);
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return children;
};

const Home = () => {
  const [refresh, setRefresh] = useState(false);
  const [quotes, setQuotes] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [editedEmail, setEditedEmail] = useState("");
  const [editedPhone, setEditedPhone] = useState("");
  const [editedRegistrationNo, setEditedRegistrationNo] = useState("");
  const [editedShirtSize, setEditedShirtSize] = useState("");
  const [editedCodeforces, setEditedCodeforces] = useState("");
  const [editedRating, setEditedRating] = useState("0");

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    axios.get(`${server}/users/me`, {
      withCredentials: true,
    })
      .then((res) => {
        setEditedName(res.data.user.name);
        setEditedEmail(res.data.user.email);
        setEditedPhone(res.data.user.phone);
        setEditedRegistrationNo(res.data.user.registrationNo);
        setEditedShirtSize(res.data.user.shirtSize);
        setEditedCodeforces(res.data.user.codeforces);
        setEditedRating(res.data.user.codeforcesRating);
      })
      .catch((e) => {
        console.error(e);
        toast.error(e.response.data.message);
      });

    axios.get("https://type.fit/api/quotes")
      .then(function (response) {
        const data = response.data;
        const index = Math.floor(Math.random() * data.length);
        let author = data[index].author;
        author = author.includes(', ') ? author.split(', ')[0] : author;
        setQuotes([data[index].text, author]);
      })
      .catch(error => console.error("Error fetching quotes:", error));
  }, [refresh]);

  const Quote = ({ text, author }) => {
    return (
      <div className="quote">
        <blockquote>
          <p>{text} - {author}</p>
        </blockquote>
      </div>
    );
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleRating = (editedRating) => {
    setEditedRating(editedRating);
  };

  const handleDone = async () => {
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `https://codeforces.com/api/user.rating?handle=${editedCodeforces}`,
      headers: {}
    };

    let rating = 0;
    await axios.request(config)
      .then((response) => {
        console.log(response.data.result);
        rating = response.data.result[response.data.result.length - 1].newRating.toString();
        console.log(rating);

        handleRating(rating);
        console.log(rating);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.comment);
      });

    const data = {
      phone: editedPhone,
      registrationNo: editedRegistrationNo,
      shirtSize: editedShirtSize,
      codeforces: editedCodeforces,
      codeforcesRating: rating,
    };

    config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${server}/users/editme`,
      headers: {
        contentType: 'application/json',
      },
      data: data,
      withCredentials: true,
    };

    await axios.request(config)
      .then((response) => {
        console.log(response.data);
        setIsEditing(false);
        toast.success("Profile updated successfully");
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.response.data.message);
      });
  };

  return (
    <ProtectedRoute>
      <Box sx={{ marginX: isMobile ? '20px' : '50px', marginY: '10px' }}>
        <Box sx={{
          backgroundColor: '#f5f5f5',
          padding: '10px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          <Typography variant="h5">Hello, {editedName}</Typography>
          {/* <Typography variant="h3">Let's Crack It</Typography> */}
          <Quote text={quotes[0]} author={quotes[1]} />
        </Box>
        <div className="profile">
          {isEditing ? (
            <Box sx={{
              gap: '8px',
              flexGrow: 1,
              padding: '30px',
              width: isMobile ? '90%' : '70%',
              margin: 'auto',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}>
              <TextField name="name" label="Name" value={editedName} onChange={(e) => setEditedName(e.target.value)} disabled sx={{
                color: '#73808c',
                borderRadius: '10px',
                fontWeight: '500',
                fontSize: '15px',
                padding: '10px',
                width: '100%',
                outline: 'none',
              }} />
              <TextField name="email" label="Email" value={editedEmail} onChange={(e) => setEditedEmail(e.target.value)} disabled sx={{
                color: '#73808c',
                borderRadius: '10px',
                fontWeight: '500',
                fontSize: '15px',
                padding: '10px',
                width: '100%',
                outline: 'none',
              }} />
              <TextField name="phone" label="Phone No." value={editedPhone} onChange={(e) => setEditedPhone(e.target.value)} sx={{
                color: '#73808c',
                borderRadius: '10px',
                fontWeight: '500',
                fontSize: '15px',
                padding: '10px',
                width: '100%',
                outline: 'none',
              }} />
              <TextField name="regno" label="Registration No." value={editedRegistrationNo} onChange={(e) => setEditedRegistrationNo(e.target.value)} sx={{
                color: '#73808c',
                borderRadius: '10px',
                fontWeight: '500',
                fontSize: '15px',
                padding: '10px',
                width: '100%',
                outline: 'none',
              }} />
              <TextField name="size" label="Shirt Size:" value={editedShirtSize} onChange={(e) => setEditedShirtSize(e.target.value)} sx={{
                color: '#73808c',
                borderRadius: '10px',
                fontWeight: '500',
                fontSize: '15px',
                padding: '10px',
                width: '100%',
                outline: 'none',
              }} />
              <TextField name="codeforces" label="Codeforces Id:" value={editedCodeforces} onChange={(e) => setEditedCodeforces(e.target.value)} sx={{
                color: '#73808c',
                borderRadius: '10px',
                fontWeight: '500',
                fontSize: '15px',
                padding: '10px',
                width: '100%',
                outline: 'none',
              }} />
              <Button variant="contained" onClick={handleDone}>Done</Button>
            </Box>
          ) : (
            <Box sx={{
              gap: '8px',
              flexGrow: 1,
              padding: '30px',
              width: isMobile ? '90%' : '50%',
              margin: 'auto',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}>
              <Typography variant="h5" sx={{
                alignSelf: 'center',
                color: '#73808c',
                fontWeight: '600',
              }}>DASHBOARD</Typography>
              <Typography variant="h6">Name: {editedName}</Typography>
              <Typography variant="h6">Email: {editedEmail}</Typography>
              <Typography variant="h6">Phone: {editedPhone}</Typography>
              <Typography variant="h6">Registration No.: {editedRegistrationNo}</Typography>
              <Typography variant="h6">Shirt Size: {editedShirtSize}</Typography>
              <Typography variant="h6">Codeforces Id: {editedCodeforces}</Typography>
              <Typography variant="h6">Codeforces Rating: {editedRating}</Typography>
              <Box sx={{
                gap: '8px',
                flexGrow: 1,
                padding: '10px',
                width: '70%',
                margin: 'auto',
                display: 'flex',
                justifyContent: 'center',
              }}>
                <Button variant="contained" onClick={handleEdit}>Edit</Button>
              </Box>
            </Box>
          )}
        </div>
        <Box sx={{ display: 'flex', marginX:"10px", justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
        <Grid container spacing={2} sx={{ marginTop: '20px' }}>
          <Grid item xs={12} sm={6} md={3}>
            <Link to="/leaderboard">
              <Button variant="contained" fullWidth>LeaderBoard</Button>
            </Link>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Link to="/upcomingcontests">
              <Button variant="contained" fullWidth>Upcoming Contests</Button>
            </Link>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Link to="/community">
              <Button variant="contained" fullWidth>Community</Button>
            </Link>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Link to="/codingstats">
              <Button variant="contained" fullWidth>Coding Stats</Button>
            </Link>
          </Grid>
        </Grid>
        </Box>
      </Box>
    </ProtectedRoute>
  );
};

export default Home;
