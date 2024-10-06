import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getPostById, updatePost } from '../../services/api';
import './EditPost.css'; 
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const EditPost = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({ title: '', content: '' });

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await getPostById(id);
        setFormData({ title: response.data.title, content: response.data.content });
      } catch (error) {
        // alert('Error fetching post data.');
      }
    };

    fetchPost();
  }, [id]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await updatePost(id, formData, token);
      navigate("/");
      toast.success('Post updated successfully!');
      // alert('Post updated successfully!');
    } catch (error) {
      toast.error('Error updating post.');
      // alert('Error updating post.');
    }
  };

  return (
    <div className="edit-post-container">
      <form onSubmit={handleSubmit} className="edit-post-form">
        <h2>Edit Post</h2>
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label>Content:</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            className="form-textarea"
            required
          ></textarea>
        </div>
        <button type="submit" className="submit-button">Update Post</button>
      </form>
      <ToastContainer position="top-right" />
    </div>
  );
};

export default EditPost;
