import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/rooms-list.css';
import config from '../config';

const RoomsList = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get(config.BASE_URL_ROOMS);
        setRooms(response.data);
      } catch (err) {
        console.error('Error fetching rooms:', err);
      }
    };

    fetchRooms();
  }, []);

  return (
    <div className="container">
      <h1>Rooms List</h1>

    <div className="rooms-list">
      {rooms.map((room) => (
        <div key={room.id} className="room-card">
          <h3>{room.name}</h3>
          <p><strong>Description:</strong> {room.description}</p>
        </div>
      ))}
    </div>
    </div>
  );
};

export default RoomsList;