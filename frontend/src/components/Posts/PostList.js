import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPosts } from '../../services/api';
import axios from 'axios';
import './PostList.css';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const token = localStorage.getItem('token'); 
  const role = localStorage.getItem('role'); 

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getPosts();
        // console.log(response);
        setPosts(response);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/posts/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setPosts(posts.filter(post => post._id !== id));
  };

  return (
    <div className="post-list-container">
      <h2>All Blog Posts</h2>
      {posts && posts.length > 0 ? (
        posts.map((post) => (
          <div key={post._id} className="post-card">
            <h3>{post.title}</h3>
            <p>{post.content.substring(0, 100)}...</p>
            <div className="post-actions">
              {token && role === 'admin'  && (
                <>
                  <Link to={`/edit-post/${post._id}`} className="edit-button">Edit</Link>
                  <button onClick={() => handleDelete(post._id)} className="delete-button">Delete</button>
                </>
              )}
              <Link to={`/posts/${post._id}`} className="read-more-button">Read more</Link>
            </div>
          </div>
        ))
      ) : (
        <p>No posts available.</p>
      )}
    </div>
  );
};

export default PostList;
