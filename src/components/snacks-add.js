import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles/snack-add.css';
import config from '../config';

const AddSnack = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [mark, setMark] = useState('');
  const [advert, setAdvert] = useState('');
  const [advert2, setAdvert2] = useState('');
  const role = localStorage.getItem('role'); // Recuperar el rol del usuario
  const navigate = useNavigate();

  useEffect(() => {
    if (role !== 'admin') {
      alert('You do not have permission to add snacks.');
      navigate('/snacks');
    }
  }, [role, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newSnack = {
      name,
      description,
      price,
      mark,
      advert,
      advert2,
    };

    try {
      await axios.post(config.BASE_URL_SNACK_CREATE, newSnack);
      alert('Snack added successfully!');
      navigate('/'); // Redirigir al home después de agregar el snack
    } catch (err) {
      console.error('Error adding snack:', err);
    }
  };

  const handleCancel = () => {
    navigate('/'); // Redirigir al home cuando se presiona el botón de cancelar
  };

  return (
    <div className="add-snack">
      <h2>Add a New Snack</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <label>
          Description:
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
        </label>
        <label>
          Price:
          <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} required />
        </label>
        <label>
          Mark:
          <input type="text" value={mark} onChange={(e) => setMark(e.target.value)} required />
        </label>
        <label>
          Advert:
          <input type="text" value={advert} onChange={(e) => setAdvert(e.target.value)} required />
        </label>
        <label>
          Advert2:
          <input type="text" value={advert2} onChange={(e) => setAdvert2(e.target.value)} required />
        </label>
        <div className="button-group">
          <button type="submit">Add Snack</button>
          <button type="button" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default AddSnack;
