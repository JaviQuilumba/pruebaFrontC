import React, { useState } from 'react';
import axios from 'axios';
import './styles/salas-add.css';
import config from '../config';


const AddSala = () => {
  const [name, setName] = useState('');
  const [capacity, setCapacity] = useState('');
  const [location, setLocation] = useState('');
  const role = localStorage.getItem('role'); // Recuperar el rol del usuario
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newSala = {
      name,
      capacity,
      location,
    };

    try {
      await axios.post(config.BASE_URL_TEATHER_CREATE, newSala);
      alert('Cinema added successfully!');
      setName('');
      setCapacity('');
      setLocation('');
    } catch (err) {
      console.error('Error adding cinema:', err);
    }
  };

  if (role !== 'admin') {
    return <div>You do not have permission to add cinemas.</div>;
  }

  return (
    <div className="add-sala">
      <h2>Add a New Cinema</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <label>
          Capacity:
          <input type="text" value={capacity} onChange={(e) => setCapacity(e.target.value)} required />
        </label>
        <label>
          Location:
          <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required />
        </label>
        <button type="submit">Add Cinema</button>
      </form>
    </div>
  );
};

export default AddSala;
