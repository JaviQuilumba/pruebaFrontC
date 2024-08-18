import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import './styles/RegisterUser.css'; // Asegúrate de usar la ruta correcta
import axios from 'axios';
import config from '../config';


const RegisterUser = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const role = 'client'; // Rol fijo como "cliente"
  const navigate = useNavigate(); // Inicializa el hook useNavigate
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = { username, email, password, first_name, last_name, role };

    try {
      // Realiza la solicitud POST al backend para registrar el usuario
      await axios.post(config.BASE_URL_REGISTER, newUser);
      console.log('User registered:', newUser);
      alert('User registered successfully!');
      
      // Limpiar el formulario después de enviar
      setUsername('');
      setEmail('');
      setPassword('');
      setFirstName('');
      setLastName('');

      // Redirige al home
      navigate('/');
    } catch (error) {
      console.error('Error registering user:', error);
      alert('Error registering user. Please try again.');
    }
  };

  return (
    <div className="register-container">
      <h2>Register User</h2>
      <form onSubmit={handleSubmit}>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label>First Name:</label>
        <input
          type="text"
          value={first_name}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <label>Last Name:</label>
        <input
          type="text"
          value={last_name}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <label>Role:</label>
        <input
          type="text"
          value={role}
          readOnly
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterUser;
