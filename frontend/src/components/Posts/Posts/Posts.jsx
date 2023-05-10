import React, { useState, useEffect } from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { fetchPosts } from '../../../services/posts.js';

import Post from './Post/Post.jsx';
import useStyles from './styles';

const Posts = ({ setCurrentId }) => {
  const posts = useSelector((state) => state.posts);
  const classes = useStyles();

  const [postss, setPosts] = useState([]);
  useEffect(() => {
    fetchPosts(1)
      .then(response => { setPosts(response.data); console.log(response.data); })
      .catch(error => { console.log(error); });
  }, []);



  return (
    <Grid className={classes.container} container alignItems='stretch' spacing={3}>
      {postss.map((post) => (
        <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
          <Post post={post} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
