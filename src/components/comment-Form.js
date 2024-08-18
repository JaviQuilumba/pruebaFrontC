import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import './styles/commentForm.css';

const CommentForm = () => {
  const [comment, setComment] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Inicializa el hook useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3003/api/comments', { comment });
      setMessage(`Comment added: ${response.data.comment}`);
      setComment('');
    } catch (error) {
      setMessage('Error adding comment');
    }
  };

  const handleBackToHome = () => {
    navigate('/'); // Redirige al home
  };

  return (
    <div className="comment-form">
      <h2>Leave a Comment</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows="4"
          cols="50"
          placeholder="Enter your comment"
          required
        />
        <br />
        <button type="submit">Submit Comment</button>
      </form>
      {message && <p>{message}</p>}
      <button onClick={handleBackToHome}>Back to Home</button> {/* Botón para redirigir al home */}
    </div>
  );
};

export default CommentForm;
