import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllStartups } from '../../features/startups/startupSlice';
import { Row, Col, Card, Spin, Typography, Modal } from 'antd';
import './StartupGallery.css'; // asegúrate de tener este CSS

const { Title } = Typography;

const StartupGallery = () => {
  const dispatch = useDispatch();
  const { startups, isLoading } = useSelector((state) => state.startups);

  const [selectedStartup, setSelectedStartup] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    dispatch(getAllStartups());
  }, [dispatch]);

  const handleCardClick = (startup) => {
    setSelectedStartup(startup);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedStartup(null);
  };

  return (
    <div className="startup-gallery-container">
      <Title level={2}>Participantes</Title>

      {isLoading ? (
        <Spin size="large" />
      ) : (
        <Row gutter={[16, 16]}>
          {startups.map((startup) => (
            <Col xs={24} sm={12} md={8} lg={6} key={startup.id_startup}>
              <Card
                hoverable
                className="startup-card"
                onClick={() => handleCardClick(startup)}
                cover={
                  <img
                    alt={startup.name}
                    src={startup?.img_url?.trim() || '/placeholder.png'}
                    className="startup-logo"
                  />
                }
              >
                <Card.Meta title={startup.name} />
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {/* MODAL con detalles de la startup */}
      <Modal
        open={isModalVisible}
        onCancel={handleModalClose}
        footer={null}
        title={selectedStartup?.name}
      >
        {selectedStartup && (
          <>
            {selectedStartup.img_url && (
              <img
                src={selectedStartup.img_url}
                alt={selectedStartup.name}
                style={{ width: '100%', marginBottom: '1rem', borderRadius: '8px' }}
              />
            )}
            <p><strong>Descripción:</strong> {selectedStartup.description || 'Sin descripción'}</p>
            <p><strong>Sector:</strong> {selectedStartup.sector || 'Sin sector'}</p>
            <p><strong>Email:</strong> {selectedStartup.email || 'Sin email'}</p>
            <p><strong>Mentor:</strong> {selectedStartup.mentor || 'No asignado'}</p>
          </>
        )}
      </Modal>
    </div>
  );
};

export default StartupGallery;
