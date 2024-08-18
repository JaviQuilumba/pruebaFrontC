import React, { useState, useEffect } from 'react';
import {useNavigate } from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-modal'; // Asegúrate de tener instalado 'react-modal'
import './styles/salas-list.css';
import config from '../config';

const SalasList = () => {
  const [salas, setSalas] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedSala, setSelectedSala] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    capacity: '',
    location: ''
  });
  const role = localStorage.getItem('role');
  const navigate = useNavigate();

  useEffect(() => {
    fetchSalas();
  }, []);

  const fetchSalas = async () => {
    try {
      const response = await axios.get(config.BASE_URL_TEATHER);
      setSalas(response.data);
    } catch (err) {
      console.error('Error fetching cinemas:', err);
    }
  };

  const handleEditClick = (sala) => {
    setSelectedSala(sala);
    setFormData({
      name: sala.name,
      capacity: sala.capacity,
      location: sala.location
    });
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (sala) => {
    setSelectedSala(sala);
    setIsDeleteModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedSala(null);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedSala(null);
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
      const response = await axios.put(`${config.BASE_URL_TEATHER_UPDATE}/${selectedSala.id}`, formData);
      const updatedSala = response.data;
      setSalas(salas.map(sala => sala.id === updatedSala.id ? updatedSala : sala));
      handleCloseEditModal();
    } catch (err) {
      console.error('Error updating cinema:', err);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`${config.BASE_URL_TEATHER_DELETE}/${selectedSala.id}`);
      setSalas(salas.filter(sala => sala.id !== selectedSala.id));
      setIsDeleteModalOpen(false);
    } catch (err) {
      console.error('Error deleting cinema:', err);
    }
  };

  const handleHomeClick = () => {
    navigate('/');
  };

  return (
    <div className="container">
      <h1>Rooms List</h1>
      <div className="salas-list-container">
        <div className="salas-list">
          {salas.map((sala) => (
            <div key={sala.id} className="sala-card">
              <h3>{sala.name}</h3>
              <p><strong>Capacidad:</strong> {sala.capacity}</p>
              <p><strong>Ubicación:</strong> {sala.location}</p>
              {role === 'admin' ? (
                <>
                  <button className="edit" onClick={() => handleEditClick(sala)}>Edit</button>
                  <button className="delete" onClick={() => handleDeleteClick(sala)}>Delete</button>
                </>
              ) : (
                <p>Only admins can edit or delete cinemas.</p>
              )}
            </div>
          ))}
        </div>
        <div className="home-button-container">
          <button className="home-button" onClick={handleHomeClick}>Regresar al Home</button>
        </div>
      </div>

      {isEditModalOpen && (
        <Modal
          isOpen={isEditModalOpen}
          onRequestClose={handleCloseEditModal}
          contentLabel="Edit Cinema"
        >
          <h2>Edit Cinema</h2>
          <form onSubmit={handleEditFormSubmit}>
            <label>
              Name:
              <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
            </label>
            <label>
              Capacity:
              <input type="text" name="capacity" value={formData.capacity} onChange={handleInputChange} />
            </label>
            <label>
              Location:
              <input type="text" name="location" value={formData.location} onChange={handleInputChange} />
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
          contentLabel="Delete Cinema"
        >
          <h2>Confirm Delete</h2>
          <p>Are you sure you want to delete {selectedSala?.name}?</p>
          <button onClick={handleDeleteConfirm}>Yes, Delete</button>
          <button onClick={handleCloseDeleteModal}>Cancel</button>
        </Modal>
      )}
    </div>
  );
};

export default SalasList;
