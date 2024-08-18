import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles/releasesH.css';

const ReleasesList = () => {
  const [releases, setReleases] = useState([]);
  const navigate = useNavigate(); // Hook para la navegación
  const role = localStorage.getItem('role'); // Recuperar el rol del usuario

  useEffect(() => {
    if (role === 'admin') {
      fetchReleases();
    }
  }, [role]);

  const fetchReleases = async () => {
    try {
      const response = await axios.get('http://localhost:3040/api/movies');
      setReleases(response.data);
    } catch (err) {
      console.error('Error fetching releases:', err);
    }
  };

  const handleHomeClick = () => {
    navigate('/'); // Redirigir al inicio
  };

  if (role !== 'admin') {
    return <div>No tienes permiso para ver esta página.</div>;
  }

  return (
    <div className="releases-container">
      <div className="releases-list">
        {releases.map((release) => (
          <div key={release.id} className="release-card">
            <h3>{release.title}</h3>
            <p><strong>Descripción:</strong> {release.description}</p>
            <p><strong>Género:</strong> {release.genre}</p>
            <p><strong>Fecha de estreno:</strong> {release.release_date}</p>
            <p><strong>Duración:</strong> {release.duration}</p>
          </div>
        ))}
      </div>
      <div className="home-button">
        <button onClick={handleHomeClick}>Regresar al Home</button>
      </div>
    </div>
  );
};

export default ReleasesList;
