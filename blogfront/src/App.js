import React from 'react';
import './App.css';
import AllPosts from './pages/AllPosts';
import SinglePost from './pages/SinglePost';
import Form from './pages/Form';
import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

const apiURL = 'https://blog-backend-alex-f47abe65e953.herokuapp.com/';

function App() {
  const [posts, setPosts] = useState([]);

  // Fetch all posts
  const getBlog = async () => {
    const response = await fetch(`${apiURL}/blog/`);
    const data = await response.json();
    setPosts(data);
  };

  // Handle form submission for adding/editing posts
  const handleFormSubmission = async (postData, type, postId) => {
    const method = type === 'new' ? 'POST' : 'PUT';
    const url = type === 'new' ? `${apiURL}/blog/` : `${apiURL}/blog/${postId}/`;

    await fetch(url, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(postData)
    });
    getBlog(); // Refresh posts
  };

  // Delete a post
  const deletePost = async (id) => {
    await fetch(`${apiURL}/blog/${id}`, { method: 'DELETE' });
    getBlog(); // Refresh posts
  };

  // useEffect to load posts initially
  useEffect(() => {
    getBlog();
  }, []);

  return (
    <div className="App">
      <h1>My Blog</h1>
      <Routes>
        <Route 
          exact 
          path="/" 
          element={<AllPosts posts={posts} deletePost={deletePost} />}
        />
        <Route 
          exact 
          path="/posts/:id" 
          element={<SinglePost posts={posts} />}
        />
        <Route 
          exact 
          path="/new" 
          element={<Form handleSubmit={handleFormSubmission} buttonLabel="Add Post" formType="new" />}
        />
        <Route 
          exact 
          path="/edit/:id" 
          element={<Form posts={posts} handleSubmit={handleFormSubmission} buttonLabel="Edit Post" formType="edit" />}
        />
      </Routes>
    </div>
  );
}

export default App;
