import React, { useState } from 'react';
import { createPost } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import './PostForm.css';

const PostForm = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const postData = {
      title,
      content,
      author,
    };

    try {
      await createPost(postData);
      setSuccess('Post created successfully!');
      setTitle('');
      setContent('');
      setAuthor('');
      navigate('/');
    } catch (error) {
      console.error('Error creating post:', error);
      setError('Failed to create post. Please try again.');
    }
  };

  return (
    <div className="post-form-container">
      <h2>Create a New Post</h2>
      <form onSubmit={handleSubmit} className="post-form">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
          className="input-field"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          required
          className="textarea-field"
        />
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Author"
          required
          className="input-field"
        />
        <button type="submit" className="submit-button">Create Post</button>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
      </form>
    </div>
  );
};

export default PostForm;
