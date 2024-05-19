import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { Box } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Stack,
  styled,
  TextField,
  Tooltip,
  tooltipClasses,
  Typography,
} from "@mui/material";
import ScheduleIcon from "@mui/icons-material/Schedule";
import { Postcard, OneCard } from "../components/CommunityCards";
import { Navigate } from "react-router-dom";
import { Context, server } from "../main";
import { rulesText } from "../utils/processText";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useContext(Context);
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return children;
};

const Community = () => {
  const [open, setOpen] = useState(false);
  const { user, isAuthenticated } = useContext(Context);
  const [posts, setPosts] = useState([]);
  const [heading, setHeading] = useState("");
  const [description, setDescription] = useState("");
  const [viewPost, setViewPost] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${server}/posts`, {
          withCredentials: true,
        });
        setPosts(res.data.posts);
        toast.success("Posts fetched successfully!");
      } catch (error) {
        console.error(error);
        toast.error(error.response?.data?.message || "Error fetching posts");
      }
    };

    fetchData();
  }, []);

  const handleCreatePost = async () => {
    if (!user) {
      toast.error("User information is missing.");
      return;
    }

    try {
      const resai = await axios.post(
        `https://ai-summarizer-qpq0.onrender.com/evaluate`,
        {
          text: description,
        },
        {
          withCredentials: true,
        }
      );
      console.log(resai.data);
      toast.success("Summary generated using AI successfully!");
      const res = await axios.post(
        `${server}/posts`,
        {
          heading,
          description,
          user: user?._id,
          summary: resai.data.summary,
        },
        {
          withCredentials: true,
        }
      );
      toast.success("Post created successfully!");
      
      setOpen(false);
      setPosts
      setPosts([...posts, res.data.post]);
      
    } catch (e) {
      console.error(e);
      toast.error(e.response?.data?.message || "Error creating post");
    }
  };

  const handleViewPost = (id) => {
    setViewPost(id);
  };

  const resetViewPost = () => {
    setViewPost(null);
  };

  const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: '#f5f5f9',
      color: 'rgba(0, 0, 0, 0.87)',
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
      border: '1px solid #dadde9',
    },
  }));

  return (
    <ProtectedRoute>
      <Box>
        <Box>
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
            <Button variant="contained" sx={{marginBottom:"20px"}} onClick={() => setOpen(true)}>
              Create NEW Post
            </Button>
            {open && (
              <Dialog open={open} sx={{justifyContent:"space-between"}} onClose={() => setOpen(false)}>
                <DialogTitle>Create New Post
                <Typography variant="caption"><HtmlTooltip
        title={
          <>
            <Typography color="inherit">While writing your blog post:</Typography>
            {<>
            <li><em>{"Heading 2:"}</em> <code>{" ## This is a Heading 2"}</code></li>
            <li><em>{"Heading 3:"}</em><code>{" ### This is a Heading 3"}</code>.{'\n'}</li>
            <li><em>{"Bold Text:"}</em> <code>{" **This is bold text**"}</code>.{'\n'}</li>
            <li><em>{"Underline Text:"}</em> <code>{" __This is underlined text__"}</code>.{'\n'}</li>
            <li><em>{"List Items:"}</em> <code>{" * This is a list item"}</code>.{'\n'}</li>
            <li><em>{"Blockquotes:"}</em> <code>{" > This is a blockquote"}</code>.{'\n'}</li>
            <li><em>{"Paragraphs:"}</em> <code>{" This is a regular paragraph."}</code>{'\n'}</li>
            <li><em>{"Newlines:"}</em> <code>{" Use '\\n' for newlines."}</code>.{'\n'}</li>
            <li><em>{"Spaces and Tabs:"}</em> <code>{" Spaces and tabs within a line will be preserved."}</code>.</li>
        </>}
          </>
        }
      >
        <Button>RULES</Button>
      </HtmlTooltip>
      </Typography>
                </DialogTitle>
                <DialogContent>
                  <TextField
                    margin="dense"
                    label="Heading"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={heading}
                    onChange={(e) => setHeading(e.target.value)}
                  />
                  <TextField
                    margin="dense"
                    label="Description"
                    type="text"
                    fullWidth
                    variant="outlined"
                    multiline
                    rows={15}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => setOpen(false)}>Cancel</Button>
                  <Button onClick={handleCreatePost} variant="contained">
                    Post
                  </Button>
                </DialogActions>
              </Dialog>
            )}

            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Grid container spacing={4}>
                {!viewPost &&
                  posts.map((post) => (
                    <Grid item xs={12} sm={12} md={12} key={post._id}>
                      <Card>
                        <CardContent>
                          <Typography variant="h5" gutterBottom>
                            {post.heading}
                          </Typography>
                          <Typography variant="body2" color="textSecondary" paragraph>
                            {post.summary}
                          </Typography>
                          <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 2 }}>
                            <ScheduleIcon color="action" />
                            <Typography variant="body2" color="textSecondary">
                              {new Date(post.createdAt).toLocaleString().split(",")[0]}
                            </Typography>
                          </Stack>
                          <CardActions>
                            <Button size="small" onClick={() => handleViewPost(post._id)}>
                              Learn More
                            </Button>
                          </CardActions>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
              </Grid>
              {!open &&
                viewPost &&
                posts.map((post) =>
                  post._id === viewPost ? <OneCard key={post._id} {...post} resetViewPost={resetViewPost} /> : null
                )}
            </Box>
          </Box>
        </Box>
      </Box>
    </ProtectedRoute>
  );
};

export default Community;
