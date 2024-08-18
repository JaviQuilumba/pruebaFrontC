import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './styles/releases-list.css';

const MovieList1 = () => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();
  const role = localStorage.getItem('role');

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await axios.get('http://localhost:3050/movies');
      setMovies(response.data);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this movie?')) {
      try {
        await axios.delete(`http://localhost:3050/movies/${id}`);
        setMovies(movies.filter((movie) => movie.id !== id));
      } catch (error) {
        console.error('Error deleting movie:', error);
      }
    }
  };

  const handleCancel = () => {
    navigate('/'); 
  };

  return (
    <div className="releases-list-container">
      <div className="releases-list">
        {movies.map((movie) => (
          <div key={movie.id} className="release-card">
            <h3>{movie.title}</h3>
            <p><strong>Description:</strong> {movie.description}</p>
            <p><strong>Genre:</strong> {movie.genre}</p>
            <p><strong>Release Date:</strong> {movie.release_date}</p>
            <p><strong>Duration:</strong> {movie.duration} minutes</p>
            {role === 'admin' && (
              <>
                <Link to={`/edit/${movie.id}`}>
                  <button className="edit">Edit</button>
                </Link>
                <button className="delete" onClick={() => handleDelete(movie.id)}>Delete</button>
              </>
            )}
          </div>
        ))}
      </div>
      <div className="cancel-button-container">
        <button className="cancel" onClick={handleCancel}>Ir al Home</button>
      </div>
    </div>
  );
};

export default MovieList1;
