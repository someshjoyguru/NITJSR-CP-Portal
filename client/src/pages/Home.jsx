import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { server } from "../main";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { Box, Button, TextField, Typography, useMediaQuery, useTheme, Grid, Avatar} from "@mui/material";
import { styled } from "@mui/system";
import {quotes} from "../assets/quotes.jsx";
import Quote from "../components/Quote.jsx";
import ProtectedRoute from "../utils/ProtectedRoute";

const Home = () => {
  const [refresh, setRefresh] = useState(false);
  const [quote, setQuote] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [editedEmail, setEditedEmail] = useState("");
  const [editedPhone, setEditedPhone] = useState("");
  const [editedRegistrationNo, setEditedRegistrationNo] = useState("");
  const [editedShirtSize, setEditedShirtSize] = useState("");
  const [editedCodeforces, setEditedCodeforces] = useState("");
  const [editedRating, setEditedRating] = useState("0");

  const [imageUri, setImageUri] = useState("");

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
        if (res.data.user.image) setImageUri(res.data.user.image.url);
      })
      .catch((e) => {
        console.error(e);
        toast.error(e.response.data.message);
      });

      const index = Math.floor(Math.random() * quotes.length);
      let author = quotes[index].author;
      author = author ? author.split(", ")[0] : "Unknown";
      setQuote([quotes[index].text, author]);
  }, [refresh]);



  const [image, setImage] = useState(null);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file.size > 100000) {
      setError('File size should be less than 100kB');
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
    }
  }


  const handleDone = useCallback(async () => {
    let config=null;
    let rating = 0;
    if (editedCodeforces){
      config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `https://codeforces.com/api/user.rating?handle=${editedCodeforces}`,
        headers: {}
      };

      await axios.request(config)
        .then((response) => {
          rating = response.data.result[response.data.result.length - 1].newRating.toString();
          setEditedRating(rating);
        })
        .catch((error) => {
          console.log(error);
          toast.error(error.response.data.comment);
        });
    }

    const data = {
      phone: editedPhone,
      registrationNo: editedRegistrationNo,
      shirtSize: editedShirtSize,
      codeforces: editedCodeforces,
      codeforcesRating: rating,
      image: image
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
        setIsEditing(false);
        toast.success("Profile updated successfully");
        setRefresh(!refresh);
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.response.data.message);
      });
  },[editedPhone, editedRegistrationNo, editedShirtSize, editedCodeforces, editedRating, image, setRefresh]);

  const StyledBox = styled(Box)(({ theme }) => ({
    marginX: isMobile ? '20px' : '50px',
    marginY: '10px',
  }));

  const ProfileBox = styled(Box)(({ theme }) => ({
    gap: '8px',
    flexGrow: 1,
    padding: '30px',
    ...(isMobile ? {} : { width: '50%' }),
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: '0px 0px 8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  }));

  return (
    <ProtectedRoute>
      <StyledBox>
        <Box sx={{
          backgroundColor: '#3f51b5',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          borderRadius: '0px 0px 8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          color: '#fff',
        }}>
          <Typography variant="h6">Hello, {editedName}</Typography>
          <Quote text={quote[0]} author={quote[1]} />
        </Box>
        <div className="profile">
          {isEditing ? (
            <ProfileBox>

                  <TextField name="name" label="Name" value={editedName} onChange={(e) => setEditedName(e.target.value)} disabled fullWidth />
                  <TextField name="email" label="Email" value={editedEmail} onChange={(e) => setEditedEmail(e.target.value)} disabled fullWidth />
                  <TextField name="phone" label="Phone No." value={editedPhone} onChange={(e) => setEditedPhone(e.target.value)} fullWidth />
                  <TextField name="regno" label="Registration No." value={editedRegistrationNo} onChange={(e) => setEditedRegistrationNo(e.target.value)} fullWidth />
                  <TextField name="size" label="Shirt Size" value={editedShirtSize} onChange={(e) => setEditedShirtSize(e.target.value)} fullWidth />
                  <TextField name="codeforces" label="Codeforces Id" value={editedCodeforces} onChange={(e) => setEditedCodeforces(e.target.value)} fullWidth />

                  {image?<img width={"200px"} alt="Profile Picture" src={image} />:null}
                  <input type="file" onChange={handleImage} />

              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '10px' }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={6}>
                    <Button variant="contained" fullWidth onClick={() => setIsEditing(false)}>CANCEL</Button>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <Button variant="contained" fullWidth onClick={handleDone}>Done</Button>
                  </Grid>
                </Grid>
              </Box>
            </ProfileBox>
          ) : (
            <ProfileBox>
              <Typography variant="h5" sx={{ alignSelf: 'center', color: '#3f51b5', fontWeight: '600' }}>DASHBOARD</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={6}>
                  <Typography variant="h6">Name: {editedName}</Typography>
                  <Typography variant="h6">Email: {editedEmail}</Typography>
                  <Typography variant="h6">Phone: {editedPhone}</Typography>
                  <Typography variant="h6">Registration No.: {editedRegistrationNo}</Typography>
                  <Typography variant="h6">Shirt Size: {editedShirtSize}</Typography>
                  <Typography variant="h6">Codeforces Id: {editedCodeforces}</Typography>
                  <Typography variant="h6">Codeforces Rating: {editedRating}</Typography>
                </Grid>
                <Grid item alignItems={"center"} xs={12} sm={6} md={6}>
                  {imageUri?<img width={"200px"} alt="Profile Picture" src={imageUri} />:null}
                </Grid>
              </Grid>
                  
              <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '20px',
              }}>
                <Button variant="contained" onClick={() => setIsEditing(true)}>Edit</Button>
              </Box>
            </ProfileBox>
          )}
        </div>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginTop: '30px' }}>
          <Grid container spacing={2} sx={{ width: isMobile ? '90%' : '50%' }}>
            <Grid item xs={12} sm={6} md={3}>
              <Link to="/leaderboard" style={{ textDecoration: 'none' }}>
                <Button variant="contained" fullWidth>LeaderBoard</Button>
              </Link>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Link to="/upcomingcontests" style={{ textDecoration: 'none' }}>
                <Button variant="contained" fullWidth>Contests</Button>
              </Link>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Link to="/community" style={{ textDecoration: 'none' }}>
                <Button variant="contained" fullWidth>Community</Button>
              </Link>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Link to="/codingstats" style={{ textDecoration: 'none' }}>
                <Button variant="contained" fullWidth>Coding Stats</Button>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </StyledBox>
    </ProtectedRoute>
  );
};

export default Home;
