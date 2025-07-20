// src/components/startups/StartupGallery.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllStartups } from '../../features/startups/startupSlice';
import { Typography, Modal, Spin } from 'antd';
import StartupCard from './StartupCard';
import './StartupGallery.css';

const { Title } = Typography;

const StartupGallery = () => {
  const dispatch = useDispatch();
  const { startups, isLoading, isError, message } = useSelector((state) => state.startups);

  const [selectedStartup, setSelectedStartup] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    dispatch(getAllStartups());
  }, [dispatch]);

  const openModal = (startup) => {
    setSelectedStartup(startup);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setSelectedStartup(null);
    setIsModalVisible(false);
  };

  return (
    <div className="startup-gallery-container">
      <Title level={2}>Startups Participantes</Title>

      {isLoading ? (
        <Spin size="large" />
      ) : isError ? (
        <p>Error: {message}</p>
      ) : (
        <div className="startup-grid">
          {startups.map((startup) => (
            <StartupCard
              key={startup.id_startup}
              startup={startup}
              onClick={() => openModal(startup)}
            />
          ))}
        </div>
      )}

      {/* Modal */}
      <Modal open={isModalVisible} onCancel={closeModal} footer={null} title={selectedStartup?.name}>
        {selectedStartup && (
          <>
            {selectedStartup.img_url && (
              <img
                src={selectedStartup.img_url}
                alt={selectedStartup.name}
                style={{ width: '100%', borderRadius: '8px', marginBottom: '1rem' }}
              />
            )}
            <p><strong>Descripción:</strong> {selectedStartup.description || 'Sin descripción'}</p>
            <p><strong>Sector:</strong> {selectedStartup.sector || 'No definido'}</p>
            <p><strong>Email:</strong> {selectedStartup.email || 'Sin email'}</p>
            <p><strong>Mentor:</strong> {selectedStartup.mentor || 'No asignado'}</p>
          </>
        )}
      </Modal>
    </div>
  );
};

export default StartupGallery;
