import React from 'react';

const StartupCard = ({ name, img_url, description, stage, contact }) => {
  return (
    <div className="startup-card">
      <img src={img_url} alt={name} style={{ width: '100%', height: 'auto' }} />
      <h3>{name}</h3>
      <p>{description}</p>
      <p>
        <strong>Stage:</strong> {stage}
      </p>
      {contact && <button onClick={() => (window.location = `mailto:${contact}`)}>Contactar</button>}
    </div>
  );
};

export default StartupCard;
