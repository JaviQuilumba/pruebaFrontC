import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styles/releases-create.css';

const AddMovie1 = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [genre, setGenre] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [duration, setDuration] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const role = localStorage.getItem('role');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newMovie = { title, description, genre, releaseDate, duration };

    try {
      await axios.post('http://localhost:3050/movies', newMovie);
      setMessage('Movie added successfully!');
      clearForm();
      setTimeout(() => navigate('/'), 500);
    } catch (error) {
      console.error('Error adding movie:', error);
      setMessage('Error adding movie. Please try again.');
    }
  };

  const clearForm = () => {
    setTitle('');
    setDescription('');
    setGenre('');
    setReleaseDate('');
    setDuration('');
  };

  const handleCancel = () => {
    navigate('/');
  };

  if (role !== 'admin') {
    return <p>Only admins can add movies.</p>;
  }

  return (
    <div className="release-container1">
      <h2>Add a New Movie</h2>
      {message && <div className="message1">{message}</div>}
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <label>Description:</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        <label>Genre:</label>
        <input type="text" value={genre} onChange={(e) => setGenre(e.target.value)} required />
        <label>Release Date:</label>
        <input type="date" value={releaseDate} onChange={(e) => setReleaseDate(e.target.value)} required />
        <label>Duration (minutes):</label>
        <input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} required />
        <button type="submit">Add Movie</button>
        <button type="button" onClick={handleCancel} className="cancel-button">Cancel</button>
      </form>
    </div>
  );
};

export default AddMovie1;
