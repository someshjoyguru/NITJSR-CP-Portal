import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Box } from '@mui/material';
import SvgIcon from '@mui/material/SvgIcon';
import { useEffect, useState } from 'react';
import useUserProfile from '../utils/useUserProfile';
import {
  Typography,
  IconButton,
  Chip,
  Avatar,
  Grid,
  Paper,
  Divider,
  Stack,
  Button
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import CommentIcon from '@mui/icons-material/Comment';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ScheduleIcon from '@mui/icons-material/Schedule';
import TagIcon from '@mui/icons-material/Tag';
import processText from '../utils/processText';


export function Postcard({ _id, heading, description, user, handleViewPost }) {

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        src='https://media.geeksforgeeks.org/wp-content/cdn-uploads/20211116182112/How-To-Make-Competitive-Programming-Interesting.png'
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {heading}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description.slice(0, 15)}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => handleViewPost(_id)}>Learn More</Button>
      </CardActions>
    </Card>
  );
}

export function OneCard({resetViewPost, ...posts}) {
  const { user, heading, description, views, createdAt, comments, likes, status, tags, updatedAt  } = posts;
  const avatarUrl = 'https://www.pngall.com/wp-content/uploads/5/Profile-PNG-File.png';
  const userProfile = useUserProfile(user);

  if (!userProfile) {
    return <div>Loading...</div>;
  }

  console.log(userProfile);
  const { name, email } = userProfile.user;

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', my: 2 }}>
        <IconButton onClick={resetViewPost}>
          <HomeIcon fontSize="large" color="secondary" />
        </IconButton>
        <Typography variant="h6" sx={{ ml: 1}}>
          Back to Home
        </Typography>
      </Box>

      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          {heading}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar src={avatarUrl} alt={name} sx={{ mr: 2 }} />
          <Typography variant="subtitle1" color="textSecondary">
            {name} | {email} | {views} Views
          </Typography>
        </Box>

        <Typography variant="body1" gutterBottom>
          {processText(description)}
        </Typography>

        <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 2 }}>
          <ScheduleIcon color="action" />
          <Typography variant="body2" color="textSecondary">
            Created at: {new Date(createdAt).toLocaleString()}
          </Typography>
          {updatedAt && (
            <>
              <Typography variant="body2" color="textSecondary" sx={{ ml: 1 }}>
                | Updated at: {new Date(updatedAt).toLocaleString()}
              </Typography>
            </>
          )}
        </Stack>

        <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
          <Button variant="outlined" startIcon={<CommentIcon />}>
            {comments.length} Comments
          </Button>
          <Button variant="outlined" startIcon={<ThumbUpIcon />}>
            {likes} Likes
          </Button>
        </Stack>

        <Divider sx={{ my: 2 }} />

        <Typography variant="h6" gutterBottom>
          Status: {status}
        </Typography>

        <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
          <TagIcon color="action" />
          {tags.map((tag, index) => (
            <Chip key={index} label={tag} variant="outlined" />
          ))}
        </Stack>
      </Paper>
    </Box>
  );
}