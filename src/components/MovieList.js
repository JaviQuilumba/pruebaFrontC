import React, { useState, useEffect } from 'react';
import { ApolloClient, InMemoryCache, gql, useMutation } from '@apollo/client';
import axios from 'axios';
import Modal from 'react-modal';
import './styles/MovieList.css';
import config from '../config';

const client = new ApolloClient({
  uri: 'http://localhost:3005/graphql',
  cache: new InMemoryCache()
});

const DELETE_MOVIE = gql`
  mutation DeleteMovie($id: ID!) {
    deleteMovie(id: $id)
  }
`;

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    director: '',
    release_date: '',
    genre: ''
  });

  const role = localStorage.getItem('role');

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(config.BASE_URL_MOVIES);
        setMovies(response.data);
      } catch (err) {
        console.error('Error fetching movies:', err);
      }
    };

    fetchMovies();
  }, []);

  const [deleteMovie] = useMutation(DELETE_MOVIE, {
    client,
    onCompleted: (data) => {
      if (data.deleteMovie) {
        setMovies(movies.filter(movie => movie.id !== selectedMovie.id));
        handleCloseDeleteModal();
      }
    },
    onError: (err) => {
      console.error('Error deleting movie:', err);
    }
  });

  const handleEditClick = (movie) => {
    setSelectedMovie(movie);
    setFormData({
      title: movie.title,
      director: movie.director,
      release_date: movie.release_date,
      genre: movie.genre
    });
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (movie) => {
    setSelectedMovie(movie);
    setIsDeleteModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedMovie(null);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedMovie(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleEditFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${config.BASE_URL_MOVIES_UPDATE}/${selectedMovie.id}`, formData);
      const updatedMovie = response.data;
      setMovies(movies.map(movie => movie.id === updatedMovie.id ? updatedMovie : movie));
      handleCloseEditModal();
    } catch (err) {
      console.error('Error updating movie:', err);
    }
  };

  const handleDeleteConfirm = async () => {
    deleteMovie({ variables: { id: selectedMovie.id } });
  };

  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <div key={movie.id} className="movie-card">
          <h3>{movie.title}</h3>
          <p><strong>Director:</strong> {movie.director}</p>
          <p><strong>Release Date:</strong> {new Date(movie.release_date).toLocaleDateString()}</p>
          <p><strong>Genre:</strong> {movie.genre}</p>
          {role === 'admin' && (
            <>
              <button className="edit" onClick={() => handleEditClick(movie)}>Edit</button>
              <button className="delete" onClick={() => handleDeleteClick(movie)}>Delete</button>
            </>
          )}
        </div>
      ))}
      {isEditModalOpen && (
        <Modal
          isOpen={isEditModalOpen}
          onRequestClose={handleCloseEditModal}
          contentLabel="Edit Movie"
        >
          <h2>Edit Movie</h2>
          <form onSubmit={handleEditFormSubmit}>
            <label>
              Title:
              <input type="text" name="title" value={formData.title} onChange={handleInputChange} />
            </label>
            <label>
              Director:
              <input type="text" name="director" value={formData.director} onChange={handleInputChange} />
            </label>
            <label>
              Release Date:
              <input type="date" name="release_date" value={formData.release_date} onChange={handleInputChange} />
            </label>
            <label>
              Genre:
              <input type="text" name="genre" value={formData.genre} onChange={handleInputChange} />
            </label>
            <button type="submit">Save</button>
            <button type="button" onClick={handleCloseEditModal}>Cancel</button>
          </form>
        </Modal>
      )}
      {isDeleteModalOpen && (
        <Modal
          isOpen={isDeleteModalOpen}
          onRequestClose={handleCloseDeleteModal}
          contentLabel="Delete Movie"
        >
          <h2>Confirm Delete</h2>
          <p>Are you sure you want to delete {selectedMovie?.title}?</p>
          <button onClick={handleDeleteConfirm}>Yes, Delete</button>
          <button onClick={handleCloseDeleteModal}>Cancel</button>
        </Modal>
      )}
    </div>
  );
};

export default MovieList;
