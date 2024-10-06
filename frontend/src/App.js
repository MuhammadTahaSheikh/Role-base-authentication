import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import PostList from './components/Posts/PostList';
import PostDetail from './components/Posts/PostDetail';
import PostForm from './components/Posts/PostForm';
import EditPost from './components/Posts/EditPost';

const App = () => {
  const token=localStorage.getItem("token")
  
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<PostList />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/posts/:id" element={<PostDetail />} />
        <Route path="/new-post" element={<PostForm />} />
        <Route path="/edit-post/:id" element={<EditPost />} />
      </Routes>
    </Router>
  );
};

export default App;
