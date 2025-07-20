// src/components/startups/StartupCard.jsx
import React from 'react';
import './StartupCard.css';

const StartupCard = ({ startup, onClick }) => {
  const { name, img_url, description, stage, email } = startup;

  return (
    <div className="startup-card" onClick={onClick}>
      <img
        src={img_url || '/placeholder.png'}
        alt={name}
        className="startup-card-image"
      />
      <div className="startup-card-content">
        <h3>{name}</h3>
        
        <p><strong>Stage:</strong> {stage}</p>
        {email && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              window.location = `mailto:${email}`;
            }}
          >
            Contactar
          </button>
        )}
      </div>
    </div>
  );
};

export default StartupCard;
