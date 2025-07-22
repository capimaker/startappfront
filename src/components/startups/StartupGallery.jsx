// src/components/startups/StartupGallery.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllStartups } from '../../features/startups/startupSlice';
import { Typography, Modal, Spin, Select } from 'antd';
import StartupCard from './StartupCard';
import './StartupGallery.css';
import { Link } from 'react-router-dom';

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

  // Asegurarse de que las categorías sean únicas y no incluyan valores nulos/undefined
  const categories = ['Todas', ...new Set(startups.map((s) => s.sector).filter(Boolean))].sort();

  const filteredStartups =
    selectedCategory === 'Todas' ? startups : startups.filter((s) => s.sector === selectedCategory);

  const openModal = (startup) => {
    setSelectedStartup(startup);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setSelectedStartup(null);
    setIsModalVisible(false);
  };

  // Determinar la clase para la lista de startups basada en el número de elementos
  const startupListClasses = `startup-list ${filteredStartups.length === 1 ? 'single-card-layout' : ''}`;

  return (
    <div className="startup-gallery-container">
      <Title level={2} className="gallery-main-title">
        Startups Participantes
      </Title>

      {/* Filtro de Categoría */}
      <div className="filter-container">
        <Select
          className="category-filter-select" // Nueva clase para estilizar el Select de Ant Design
          value={selectedCategory}
          onChange={setSelectedCategory}
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
        <div className="loading-spinner-container">
          <Spin size="large" />
        </div>
      ) : isError ? (
        <p className="error-message">Error: {message}</p>
      ) : (
        <div className={startupListClasses}>
          {' '}
          {/* Usamos la clase condicional aquí */}
          {filteredStartups.map((startup) => (
            <StartupCard key={startup.id_startup} startup={startup} onClick={() => openModal(startup)} />
          ))}
        </div>
      )}

      {/* Modal de Detalle */}
      <Modal
        open={isModalVisible}
        onCancel={closeModal}
        footer={null}
        title={selectedStartup?.name}
        className="startup-detail-modal"
        // CAMBIO CLAVE: Eliminar 'centered' y añadir 'style' con 'top'
        // centered // Eliminar esta prop
        style={{ top: 80 }} // Esto establecerá un margen superior fijo de 80px
        // Opcional: Para controlar el scroll interno del cuerpo del modal
        // bodyStyle={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}
      >
        {selectedStartup && (
          <div className="modal-content-wrapper">
            <img src={selectedStartup.img_url || '/placeholder.png'} alt={selectedStartup.name} className="modal-img" />
            <p className="modal-detail-item">
              <strong>Sector:</strong> {selectedStartup.sector || 'No definido'}
            </p>
            <p className="modal-detail-item">
              <strong>Contacto:</strong> {selectedStartup.contact || 'Sin descripción'}
            </p>

            <p className="modal-detail-item">
              <strong>Web:</strong>{' '}
              {selectedStartup.business_url ? (
                <a
                  href={
                    selectedStartup.business_url.startsWith('http')
                      ? selectedCategory.business_url
                      : `https://${selectedStartup.business_url}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="modal-web-link"
                >
                  {selectedStartup.business_url}
                </a>
              ) : (
                'Sin web'
              )}
            </p>

            <p className="modal-detail-item">
              <strong>Rondas Levantadas:</strong> {selectedStartup.raised_rounds || 'No asignado'}
            </p>
            <p className="modal-detail-item">
              <strong>Reconocimientos:</strong> {selectedStartup.awards || 'No asignado'}
            </p>
            <p className="modal-detail-item modal-description">
              <strong>Descripción:</strong> {selectedStartup.description || 'Sin descripción'}
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default StartupGallery;
