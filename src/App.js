import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/LoginForm';
import MovieList from './components/MovieList';
import AddMovieForm from './components/AddMovieForm';
import Home from './components/Home';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import OffersList from './components/offer-list';
import RoomsList from './components/rooms-list';
import SnacksList from './components/snacks-list';
import AddSnack from './components/snacks-add';
import SalasList from './components/salas-list';
import AddSala from './components/salas-add';
import ReleasesList from './components/releasesH-list';
import MovieList1 from './components/releases-list';
import AddMovie1 from './components/releases-create';
import EditMovie from './components/releases-update';
import RegisterUser from './components/registerUser';
import CommentList from './components/comment-List'; 
import CommentForm from './components/comment-Form'; 
import PaymentsList from './components/payment'; 

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div>
        {isLoggedIn && <Navbar onLogout={handleLogout} />}
        <Routes>
          <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
          <Route path="/" element={<Navigate to={isLoggedIn ? "/home" : "/login"} />} />
          <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/movies" element={<PrivateRoute><MovieList /></PrivateRoute>} />
          <Route path="/offers" element={<PrivateRoute><OffersList /></PrivateRoute>} />
          <Route path="/rooms" element={<PrivateRoute><RoomsList /></PrivateRoute>} />
          <Route path="/snacks" element={<PrivateRoute><SnacksList /></PrivateRoute>} />
          <Route path="/add-snack" element={<PrivateRoute><AddSnack /></PrivateRoute>} />
          <Route path="/salas" element={<PrivateRoute><SalasList /></PrivateRoute>} />
          <Route path="/releases-history" element={<PrivateRoute><ReleasesList /></PrivateRoute>} />
          <Route path="/releases" element={<PrivateRoute><MovieList1 /></PrivateRoute>} />
          <Route path="/add-releases" element={<PrivateRoute><AddMovie1 /></PrivateRoute>} />
          <Route path="/edit/:id" element={<PrivateRoute><EditMovie /></PrivateRoute>} />
          <Route path="/add-sala" element={<PrivateRoute><AddSala /></PrivateRoute>} />
          <Route path="/comments" element={<PrivateRoute><CommentList /></PrivateRoute>} />
          <Route path="/commentssend" element={<PrivateRoute><CommentForm /></PrivateRoute>} />
          <Route path="/payments" element={<PrivateRoute><PaymentsList /></PrivateRoute>} />
          <Route path="/register" element={< RegisterUser ></RegisterUser> } />
          <Route path="/add-movie" element={<PrivateRoute requiredRole="admin"><AddMovieForm /></PrivateRoute>} />

        </Routes>
      </div>
    </Router>
  );
};

export default App;
