import React from 'react';
import './MentorsCard.css';

const MentorsCard = ({ mentor, onClick }) => {
  const { name, img_url, email, mentorship_category } = mentor;

  return (
    <div className="mentor-card" onClick={onClick}>
      <div className="mentor-card-image-container">
        {' '}
        {/* Nuevo contenedor para la imagen */}
        <img
          src={img_url || '/placeholder.png'}
          alt={name}
          className="mentor-card-image" // Mantenemos el nombre de clase, pero ahora con el contenedor
        />
      </div>
      <div className="mentor-card-content">
        <h3 className="mentor-card-title">{name}</h3> {/* Agregamos la clase para el título */}
        {/* Usamos 'mentor-card-category' para el párrafo de categorías, si lo descomentas */}
        {mentorship_category && mentorship_category.length > 0 && (
          <p className="mentor-card-category">
            <strong>Categorías:</strong> {mentorship_category.join(', ')}
          </p>
        )}
        {email && (
          <button
            className="mentor-card-contact-button" // Agregamos la clase para el botón
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
