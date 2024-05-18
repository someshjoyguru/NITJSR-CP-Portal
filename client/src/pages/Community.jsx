import React, { useContext } from "react";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { Context, server } from "../main";
import axios from "axios";
import { Box } from "@mui/system";

import { DataGrid } from "@mui/x-data-grid";
import { Button, Typography } from "@mui/material";

const Community = () => {
  const [open, setOpen] = useState(false);
  const { user } = useContext(Context);
  console.log(`user ${user}`);
  console.log(user);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${server}/posts`, {
          withCredentials: true,
        });
        console.log(res);
        setPosts(res.data.posts);
        toast.success("Posts fetched successfully!");
      } catch (error) {
        console.error(error);
        toast.error(error.response.data.message);
      }
    };
  
    fetchData();
  }, []);

  const [heading, setHeading] = useState("");
  const [description, setDescription] = useState("");

  const handleCreatePost = () => {
    axios
      .post(
        `${server}/posts`,
        {
          heading,
          description,
          user: user._id,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        toast.success("Post created successfully!");
        setOpen(false);
      })
      .catch((e) => {
        console.error(e);
        toast.error(e.response.data.message);
      });
    setOpen(false);
  };

  return (
    <>
      <Box>
        <Box
          sx={{
            marginX: "50px",
            marginY: "10px",
          }}
        >
          <Box
            sx={{
              gap: "8px",
              flexGrow: 1,
              padding: "30px",
              width: "70%",
              margin: "auto",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Button variant="contained" onClick={() => setOpen(true)}>
              Create Post
            </Button>
            {open && (
              <Box
                sx={{
                  position: "fixed",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  backgroundColor: "white",
                  padding: "20px",
                  borderRadius: "8px",
                  boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
                }}
              >
                <input
                  type="text"
                  placeholder="Heading"
                  value={heading}
                  onChange={(e) => setHeading(e.target.value)}
                />
                <textarea
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <Button variant="contained" onClick={handleCreatePost}>
                  Post
                </Button>
              </Box>
            )}

            <Box
              sx={{
                flexGrow: 1,
                marginX: "100px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* <Typography variant="h4" sx={{ textAlign: 'center', margin: '20px' }}>Upcoming Contests</Typography> */}
              {console.log(posts)}
              {posts.map((post) => (
                <Box
                  key={post.id}
                  sx={{
                    margin: "10px",
                    padding: "10px",
                    border: "1px solid black",
                    borderRadius: "10px",
                    width: {
                      xs: "90%",
                      sm: "70%",
                      md: "50%",
                      lg: "50%",
                      xl: "50%",
                    },
                  }}
                >
                  <Typography variant="h6">{post.heading}</Typography>
                  <Typography variant="body1">
                    {post.description.slice(0, 15)}
                  </Typography>
                  <Button
                    variant="contained"
                    onClick={() => handleViewPost(post.id)}
                  >
                    View More
                  </Button>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Community;
