import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-modal'; // Asegúrate de tener instalado 'react-modal'
import './styles/snack-list.css';
import config from '../config';

const SnacksList = () => {
  const [snacks, setSnacks] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedSnack, setSelectedSnack] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    mark: '',
    advert: '',
    advert2: ''
  });
  const role = localStorage.getItem('role');
  const navigate = useNavigate();

  useEffect(() => {
    fetchSnacks();
  }, []);

  const fetchSnacks = async () => {
    try {
      const response = await axios.get(config.BASE_URL_SNACK);
      setSnacks(response.data);
    } catch (err) {
      console.error('Error fetching snacks:', err);
    }
  };

  const handleEditClick = (snack) => {
    setSelectedSnack(snack);
    setFormData({
      name: snack.name,
      description: snack.description,
      price: snack.price,
      mark: snack.mark,
      advert: snack.advert,
      advert2: snack.advert2
    });
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (snack) => {
    setSelectedSnack(snack);
    setIsDeleteModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedSnack(null);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedSnack(null);
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
      await axios.put(`${config.BASE_URL_SNACK_UPDATE}/${selectedSnack.id}`, formData);
      handleCloseEditModal();
      fetchSnacks();  // Refrescar la lista de snacks
    } catch (err) {
      console.error('Error updating snack:', err);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`${config.BASE_URL_SNACK_DELETE}/${selectedSnack.id}`);
      handleCloseDeleteModal();
      fetchSnacks();  // Refrescar la lista de snacks
    } catch (err) {
      console.error('Error deleting snack:', err);
    }
  };

  const handleHomeClick = () => {
    navigate('/');
  };

  return (
    <div className="container">
      <h1>Snacks List</h1>
      <div className="snacks-list-container">
        <div className="snacks-list">
          {snacks.map((snack) => (
            <div key={snack.id} className="snack-card">
              <h3>{snack.name}</h3>
              <p><strong>Descripción:</strong> {snack.description}</p>
              <p><strong>Precio:</strong> {snack.price}</p>
              <p><strong>Marca:</strong> {snack.mark}</p>
              <p><strong>Aviso:</strong> {snack.advert}</p>
              <p><strong>Importante:</strong> {snack.advert2}</p>
              {role === 'admin' ? (
                <>
                  <button className="edit" onClick={() => handleEditClick(snack)}>Edit</button>
                  <button className="delete" onClick={() => handleDeleteClick(snack)}>Delete</button>
                </>
              ) : (
                <p>Only admins can edit or delete snacks.</p>
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
          contentLabel="Edit Snack"
        >
          <h2>Edit Snack</h2>
          <form onSubmit={handleEditFormSubmit}>
            <label>
              Name:
              <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
            </label>
            <label>
              Descripción:
              <input type="text" name="description" value={formData.description} onChange={handleInputChange} />
            </label>
            <label>
              Precio:
              <input type="text" name="price" value={formData.price} onChange={handleInputChange} />
            </label>
            <label>
              Marca:
              <input type="text" name="mark" value={formData.mark} onChange={handleInputChange} />
            </label>
            <label>
              Aviso:
              <input type="text" name="advert" value={formData.advert} onChange={handleInputChange} />
            </label>
            <label>
              Importante:
              <input type="text" name="advert2" value={formData.advert2} onChange={handleInputChange} />
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
          contentLabel="Delete Snack"
        >
          <h2>Confirm Delete</h2>
          <p>Are you sure you want to delete {selectedSnack?.name}?</p>
          <button onClick={handleDeleteConfirm}>Yes, Delete</button>
          <button onClick={handleCloseDeleteModal}>Cancel</button>
        </Modal>
      )}
    </div>
  );
};

export default SnacksList;
