// AddMovieForm.js
import React, { useState } from 'react';
import axios from 'axios';
import './styles/AddMovieForm.css';
import config from '../config';

const AddMovieForm = () => {
  const [movie, setMovie] = useState({
    title: '',
    director: '',
    release_date: '',
    genre: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovie({
      ...movie,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(config.BASE_URL_MOVIES_CREATE, movie);
      console.log('Movie added:', response.data);
    } catch (err) {
      console.error('Error adding movie:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input type="text" name="title" value={movie.title} onChange={handleChange} required />
      </label>
      <label>
        Director:
        <input type="text" name="director" value={movie.director} onChange={handleChange} required />
      </label>
      <label>
        Release Date:
        <input type="date" name="release_date" value={movie.release_date} onChange={handleChange} required />
      </label>
      <label>
        Genre:
        <input type="text" name="genre" value={movie.genre} onChange={handleChange} required />
      </label>
      <button type="submit">Add Movie</button>
    </form>
  );
};

export default AddMovieForm;
