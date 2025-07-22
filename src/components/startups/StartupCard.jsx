// src/components/startups/StartupCard.jsx
import React from 'react';
import './StartupCard.css';

const StartupCard = ({ startup, onClick }) => {
  const { name, img_url, stage, email } = startup;

  return (
    <div className="startup-card" onClick={onClick}>
      <div className="startup-card-image-container">
        <img src={img_url || '/placeholder.png'} alt={name} className="startup-card-image" />
      </div>
      <div className="startup-card-content">
        <h3 className="startup-card-title">{name}</h3>
        <p className="startup-card-stage">
          <strong>Stage:</strong> {stage}
        </p>
        {email && (
          <button
            className="startup-card-contact-button"
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
