import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getPostById, deletePost } from '../../services/api';
import './PostDetail.css'; 
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token'); 
  const role = localStorage.getItem('role'); 

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await getPostById(id);
        console.log("Full Response:", response); 
        setPost(response); 
      } catch (error) {
        setError('Error fetching post.');
      }
    };

    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    try {
      await deletePost(id, token);
      navigate("/");
      toast.info('Post deleted successfully');

      // alert();
    } catch (error) {
      toast.error("Something went wrong")
    }
  };

  if (error) return <p>{error}</p>;

  return (
    <div className="post-detail-container">
      {post && post.title ? (
        <>
          <h2 className="post-title">{post.title}</h2>
          <p className="post-content">{post.content}</p>
          <p className="post-author">Author: {post.author}</p>
          <div className="button-container">
            {token && role === 'admin' && (
              <>
                <Link to={`/edit-post/${post._id}`} className="edit-button">Edit</Link>
                <button onClick={handleDelete} className="delete-button">Delete</button>
              </>
            )}
          </div>
        </>
      ) : (
        <p>Loading post...</p>
      )}
         <ToastContainer position="top-right" />
    </div>
  );
};

export default PostDetail;
