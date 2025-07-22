import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllMentors } from '../../features/mentors/mentorsSlice';
import { Typography, Modal, Spin } from 'antd'; // No necesitas Select si no hay filtro de categoría
import MentorsCard from './MentorsCard';
import { parseExtraField } from '../../utils/parseExtra';
import './MentorsGallery.css';

const { Title } = Typography;

const MentorsGallery = () => {
  const dispatch = useDispatch();
  const { mentors, isLoading, isError, message } = useSelector((state) => state.mentors);

  const [selectedMentor, setSelectedMentor] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    dispatch(getAllMentors());
  }, [dispatch]);

  const openModal = (mentor) => {
    setSelectedMentor(mentor);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setSelectedMentor(null);
    setIsModalVisible(false);
  };

  // Determinar la clase para la lista de mentores basada en el número de elementos
  // Esto es opcional, solo si quieres el mismo comportamiento de "single-card-layout"
  const mentorListClasses = `mentor-list ${mentors.length === 1 ? 'single-card-layout' : ''}`;

  return (
    <div className="mentor-gallery-container">
      <Title level={2} className="gallery-main-title">
        {' '}
        {/* Agregamos la clase para el título */}
        Mentores
      </Title>

      {/* No hay filtro de categoría aquí, así que omitimos el div .filter-container y el Select */}

      {isLoading ? (
        <div className="loading-spinner-container">
          {' '}
          {/* Agregamos el contenedor del spinner */}
          <Spin size="large" />
        </div>
      ) : isError ? (
        <p className="error-message">Error: {message}</p>
      ) : (
        <div className={mentorListClasses}>
          {' '}
          {/* Usamos la clase condicional aquí */}
          {mentors.map((mentor) => (
            <MentorsCard key={mentor.id_mentor} mentor={mentor} onClick={() => openModal(mentor)} />
          ))}
        </div>
      )}

      {/* MODAL */}
      <Modal
        open={isModalVisible}
        onCancel={closeModal}
        footer={null}
        title={selectedMentor?.name}
        className="mentor-detail-modal" // Agregamos la clase para el modal
        style={{ top: 80 }} // Esto establecerá un margen superior fijo de 80px
      >
        {selectedMentor && (
          <div className="modal-content-wrapper">
            {' '}
            {/* Agregamos el contenedor de contenido del modal */}
            {/* Si el mentor tiene una imagen para el modal, aquí iría el contenedor y la imagen */}
            {/*
            <div className="modal-img-container">
              <img
                src={selectedMentor.img_url || '/placeholder.png'}
                alt={selectedMentor.name}
                className="modal-img"
              />
            </div>
            */}
            <p className="modal-detail-item">
              <strong>Disponibilidad:</strong> {selectedMentor.aviability}
            </p>
            <p className="modal-detail-item">
              <strong>Email:</strong>{' '}
              <a href={`mailto:${selectedMentor.email}`} className="modal-web-link">
                {selectedMentor.email}
              </a>{' '}
              {/* Agregamos clase al enlace */}
            </p>
            <p className="modal-detail-item">
              <strong>LinkedIn:</strong>{' '}
              <a href={selectedMentor.linkedin} target="_blank" rel="noopener noreferrer" className="modal-web-link">
                {' '}
                {/* Agregamos clase al enlace */}
                {selectedMentor.linkedin}
              </a>
            </p>
            <p className="modal-detail-item">
              <strong>Categorías:</strong> {selectedMentor.mentorship_category?.join(', ')}
            </p>
            {/* Extra estructurado */}
            {selectedMentor.extra &&
              (() => {
                const { name, email, phone, linkedin, areas } = parseExtraField(selectedMentor.extra);

                return (
                  <>
                    {name && (
                      <p className="modal-detail-item">
                        <strong>Nombre completo:</strong> {name}
                      </p>
                    )}
                    {phone && (
                      <p className="modal-detail-item">
                        <strong>Teléfono:</strong> {phone}
                      </p>
                    )}
                    {linkedin && (
                      <p className="modal-detail-item">
                        <strong>LinkedIn adicional:</strong>{' '}
                        <a href={linkedin} target="_blank" rel="noreferrer" className="modal-web-link">
                          {linkedin}
                        </a>
                      </p>
                    )}
                    {areas.length > 0 && (
                      <>
                        <p className="modal-detail-item">
                          <strong>Áreas de mentoring:</strong>
                        </p>
                        <ul className="modal-awards-list">
                          {' '}
                          {/* Usamos esta clase para la lista */}
                          {areas.map((area, i) => (
                            <li key={i}>{area}</li>
                          ))}
                        </ul>
                      </>
                    )}
                  </>
                );
              })()}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default MentorsGallery;
