
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllStartups } from '../../features/startups/startupSlice';
import { Typography, Modal, Spin, Select } from 'antd';
import StartupCard from './StartupCard';
import './StartupGallery.css';
import { Link } from 'react-router';

const { Title } = Typography;
const { Option } = Select;

const StartupGallery = () => {
  const dispatch = useDispatch();
  const { startups, isLoading, isError, message } = useSelector((state) => state.startups);

  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [selectedStartup, setSelectedStartup] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    dispatch(getAllStartups());
  }, [dispatch]);

  const categories = ['Todas', ...new Set(startups.map(s => s.sector).filter(Boolean))];

  const filteredStartups =
    selectedCategory === 'Todas'
      ? startups
      : startups.filter(s => s.sector === selectedCategory);

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

      {/* Filtro de Categoría */}
      <div className="filter-container">
        <Select
          value={selectedCategory}
          onChange={setSelectedCategory}
          style={{ width: 250, marginBottom: 20 }}
        >
          {categories.map((cat, idx) => (
            <Option key={idx} value={cat}>
              {cat}
            </Option>
          ))}
        </Select>
      </div>

      {/* Lista de startups */}
      {isLoading ? (
        <Spin size="large" />
      ) : isError ? (
        <p>Error: {message}</p>
      ) : (
        <div className="startup-list">
          {filteredStartups.map((startup) => (
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
            <img
              src={selectedStartup.img_url || '/placeholder.png'}
              alt={selectedStartup.name}
              className="modal-img"
            />
            <p><strong>Sector:</strong> {selectedStartup.sector || 'No definido'}</p>
            <p><strong>Contacto:</strong> {selectedStartup.contact || 'Sin descripción'}</p>
            
            <p>
  <strong>Web:</strong>{' '}
  {selectedStartup.business_url ? (
    <a
      href={
        selectedStartup.business_url.startsWith('http')
          ? selectedStartup.business_url
          : `https://${selectedStartup.business_url}`
      }
      target="_blank"
      rel="noopener noreferrer"
    >
      {selectedStartup.business_url}
    </a>
  ) : (
    'Sin web'
  )}
</p>

            <p><strong>Rondas:</strong> {selectedStartup.raised_rounds || 'No asignado'}</p>
            <p><strong>Descripción:</strong> {selectedStartup.description || 'Sin descripción'}</p>
          </>
        )}
      </Modal>
    </div>
  );
};

export default StartupGallery;
