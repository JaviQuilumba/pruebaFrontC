import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  const role = localStorage.getItem('role'); // Recuperar el rol del usuario

  return (
    <div>
      <Link to="/movies">
        <button>View Movies</button>
      </Link>
      <Link to="/offers">
        <button>Offers</button>
      </Link>
      <Link to="/rooms">
        <button>Rooms Types</button>
      </Link>
      <Link to="/snacks">
            <button>View Snacks</button>
      </Link>
      <Link to="/salas">
            <button>View Rooms</button>
      </Link>
      <Link to="/releases">
            <button>View Releases</button>
      </Link>
      <Link to="/comments">
            <button>View Comments</button>
      </Link>
      <Link to="/commentssend">
            <button>Send Comments</button>
      </Link>
      <Link to="/payments">
            <button>View Payments</button>
      </Link>

      {role === 'admin' && (
        <>
          <Link to="/add-movie">
            <button>Add Movie</button>
          </Link>
          <Link to="/add-snack">
            <button>Add Snack</button>
          </Link>
          <Link to="/add-sala">
            <button>Add Room</button>
          </Link>
          <Link to="/releases-history">
            <button>History Movie</button>
          </Link>
          <Link to="/add-releases">
            <button>Add Release</button>
          </Link>
          

        </>
      )}
    </div>
  );
};

export default Navigation;
