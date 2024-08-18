import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/offers-list.css';
import config from '../config';

const OffersList = () => {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await axios.get(config.BASE_URL_OFFERS);
        setOffers(response.data);
      } catch (err) {
        console.error('Error fetching offers:', err);
      }
    };

    fetchOffers();
  }, []);

  return (
    <div className="container">
      <h1>Offers List</h1>
      <div className="offers-list">
        {offers.map((offer) => (
          <div key={offer.id} className="offer-card">
            <h3>{offer.offer_name}</h3>
            <p><strong>Description:</strong> {offer.offer_description}</p>
            <p><strong>Day of week:</strong> {offer.day_of_week}</p>
            <p><strong>Discount:</strong> {offer.discount_percentage}%</p>
            <p><strong>Start Time:</strong> {offer.start_time}</p>
            <p><strong>End Time:</strong> {offer.end_time}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OffersList;