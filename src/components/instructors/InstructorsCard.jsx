import React from 'react';
import './../instructors/InstructorsCard.css';

const InstructorsCard = ({ instructor, onClick }) => {
  const { name, position, topic, email } = instructor;

  return (
    <div className="instructor-card" onClick={onClick}>
      <div className="instructor-card-content">
        <h3>{name}</h3>
        <p><strong>Cargo:</strong> {position}</p>
        <p><strong>Tema:</strong> {topic}</p>

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

export default InstructorsCard;