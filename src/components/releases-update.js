import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './styles/releases-edit.css';

const EditMovie = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [genre, setGenre] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [duration, setDuration] = useState('');
  const role = localStorage.getItem('role');

  const fetchMovie = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:3050/movies/${id}`);
      const movie = response.data;
      setTitle(movie.title);
      setDescription(movie.description);
      setGenre(movie.genre);
      setReleaseDate(movie.releaseDate); 
      setDuration(movie.duration);
    } catch (error) {
      console.error('Error fetching movie:', error);
    }
  }, [id]);

  useEffect(() => {
    fetchMovie();
  }, [fetchMovie]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedMovie = { title, description, genre, releaseDate, duration };

    try {
      await axios.put(`http://localhost:3050/movies/${id}`, updatedMovie);
      alert('Movie updated successfully!');
      navigate('/');
    } catch (error) {
      console.error('Error updating movie:', error);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  if (role !== 'admin') {
    return <p>Only admins can edit movies.</p>;
  }

  return (
    <div className="release-container2">
      <h2>Edit Movie</h2>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <label>Description:</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        <label>Genre:</label>
        <input type="text" value={genre} onChange={(e) => setGenre(e.target.value)} required />
        <label>Release Date:</label>
        <input
          type="date"
          value={releaseDate}
          onChange={(e) => setReleaseDate(e.target.value)}
          required
        />
        <label>Duration (minutes):</label>
        <input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} required />
        <button type="submit">Update Movie</button>
      </form>
      <div className="home-button">
        <button onClick={handleCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default EditMovie;
