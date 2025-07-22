import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllMentors } from '../../features/mentors/mentorsSlice';
import { Typography, Modal, Spin } from 'antd';
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

  return (
    <div className="mentor-gallery-container">
      <Title level={2}>Mentores</Title>

      {isLoading ? (
        <Spin size="large" />
      ) : isError ? (
        <p>Error: {message}</p>
      ) : (
        <div className="mentor-list">
          {mentors.map((mentor) => (
            <MentorsCard
              key={mentor.id_mentor}
              mentor={mentor}
              onClick={() => openModal(mentor)}
            />
          ))}
        </div>
      )}

      {/* MODAL */}
      <Modal
        open={isModalVisible}
        onCancel={closeModal}
        footer={null}
        title={selectedMentor?.name}
      >
        {selectedMentor && (
          <>
            <p><strong>Disponibilidad:</strong> {selectedMentor.aviability}</p>
            <p><strong>Email:</strong> <a href={`mailto:${selectedMentor.email}`}>{selectedMentor.email}</a></p>
            <p><strong>LinkedIn:</strong>{' '}
              <a href={selectedMentor.linkedin} target="_blank" rel="noopener noreferrer">
                {selectedMentor.linkedin}
              </a>
            </p>
            <p><strong>Categorías:</strong> {selectedMentor.mentorship_category?.join(', ')}</p>

            {/* Extra estructurado */}
            {selectedMentor.extra && (() => {
              const { name, email, phone, linkedin, areas } = parseExtraField(selectedMentor.extra);

              return (
                <>
                  {name && <p><strong>Nombre completo:</strong> {name}</p>}
                  {phone && <p><strong>Teléfono:</strong> {phone}</p>}
                  {linkedin && <p><strong>LinkedIn adicional:</strong> <a href={linkedin} target="_blank" rel="noreferrer">{linkedin}</a></p>}
                  {areas.length > 0 && (
                    <>
                      <p><strong>Áreas de mentoring:</strong></p>
                      <ul style={{ textAlign: 'left', paddingLeft: '1rem' }}>
                        {areas.map((area, i) => (
                          <li key={i}>{area}</li>
                        ))}
                      </ul>
                    </>
                  )}
                </>
              );
            })()}
          </>
        )}
      </Modal>
    </div>
  );
};

export default MentorsGallery;
