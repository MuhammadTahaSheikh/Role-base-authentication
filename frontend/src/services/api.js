import axios from "axios";

const API_URL = "http://localhost:5000/api";
export const getToken = () => localStorage.getItem("token");

export const getUserRole = () => {
  const token = getToken();
  if (token) {
    const decodedToken = JSON.parse(atob(token.split(".")[1]));
    return decodedToken.role; 
  }
  return null;
};

// User Authentication
export const registerUser = async (data) => {
  const response = await axios.post(`${API_URL}/auth/register`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};
export const loginUser = async (data) => {
  const response = await axios.post(`${API_URL}/auth/login`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};
// Blog Posts
export const getPosts = async () => {
  const response = await axios.get(`${API_URL}/posts`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};
export const getPostById = async (id) => {
  const response = await axios.get(`${API_URL}/posts/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const createPost = async (postData) => {
  const token = localStorage.getItem('token'); // Assuming you're storing the token in localStorage

  const response = await axios.post(`${API_URL}/posts`, postData, {
    headers: {
      Authorization: `Bearer ${token}`, // Include the token in the headers
    },
  });

  return response.data;
};
// export const createPost = async (data, token) => {
//     const response = await axios.post(`${API_URL}/posts`, data, {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     return response.data;
//   };

// Update an existing post
export const updatePost = async (id, data, token) => {
  const response = await axios.put(`${API_URL}/posts/${id}`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Delete a post
export const deletePost = async (id, token) => {
  const response = await axios.delete(`${API_URL}/posts/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
