// src/components/PostList.js
import React, { useEffect, useState } from 'react';
import { fetchPosts } from '../src/api';
import {
  Container,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  TextField,
} from '@mui/material';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const getPosts = async () => {
      const data = await fetchPosts();
      setPosts(data);
      setLoading(false);
    };

    getPosts();
  }, []);

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <TextField
        label="Search Posts"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {loading ? (
        <CircularProgress />
      ) : (
        <List>
          {filteredPosts.map((post) => (
            <ListItem key={post.id}>
              <ListItemText primary={post.title} secondary={post.body} />
            </ListItem>
          ))}
        </List>
      )}
    </Container>
  );
};

export default PostList;
