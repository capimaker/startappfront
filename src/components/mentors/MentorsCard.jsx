import React from 'react';
import './MentorsCard.css';

const MentorsCard = ({ mentor, onClick }) => {
  const { name,img_url, email, mentorship_category } = mentor;

  return (
    <div className="mentor-card" onClick={onClick}>
      <img
        src={img_url || '/placeholder.png'}
        alt={name}
        className="mentors-card-image"
      />
      <div className="mentor-card-content">
        

       {/* <p><strong>Categorías:</strong> {mentorship_category?.join(', ')}</p> */}
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
