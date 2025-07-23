import React from 'react';
import './../instructors/InstructorsCard.css';

const InstructorsCard = ({ instructor, onClick }) => {
  const { name, img_url, position, topic, email } = instructor;

  return (
    <div className="instructor-card" onClick={onClick}>
      {/* <img
        src={img_url || '/placeholder.png'}
        alt={name}
        className="instructor-card-image"
      /> */}
      <div className="instructor-card-content">
        <h3 className="instructor-name">{name}</h3>
        <p className="instructor-role">
          <strong>Cargo:</strong> {position}
        </p>
        <p className="instructor-topic">
          <strong>Tema:</strong> {topic}
        </p>

        {email && (
          <button
            className="contact-button"
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

export default InstructorsCard;
