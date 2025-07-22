import React from 'react';
import './MentorsCard.css';

const MentorsCard = ({ mentor, onClick }) => {
  const { name, email, mentorship_category } = mentor;

  return (
    <div className="mentor-card" onClick={onClick}>
      <div className="mentor-card-content">
        <h3>{name}</h3>
        <p><strong>Categorías:</strong> {mentorship_category?.join(', ')}</p>
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

export default MentorsCard;
