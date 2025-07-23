import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllInstructors } from '../../features/instructors/instructorsSlice';
import { Typography, Modal, Spin, Select, Input } from 'antd';
import InstructorsCard from './InstructorsCard'; 
import './InstructorsGallery.css';

const { Title } = Typography;
const { Option } = Select;

const InstructorsGallery = () => {
  const dispatch = useDispatch();
  const { instructors, isLoading, isError, message } = useSelector((state) => state.instructors);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('Todos');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [selectedInstructor, setSelectedInstructor] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    dispatch(getAllInstructors());
  }, [dispatch]);

  const topicOptions = ['Todos', ...new Set(instructors.map(i => i.topic).filter(Boolean))];
  const categoryOptions = [
    'Todas',
    ...new Set(instructors.flatMap(i => i.topic_category || []).filter(Boolean))
  ];

  const filteredInstructors = instructors.filter(i => {
    const matchName = i.name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchTopic = selectedTopic === 'Todos' || i.topic === selectedTopic;
    const matchCategory = selectedCategory === 'Todas' || (i.topic_category || []).includes(selectedCategory);
    return matchName && matchTopic && matchCategory;
  });

  const openModal = (instructor) => {
    setSelectedInstructor(instructor);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setSelectedInstructor(null);
    setIsModalVisible(false);
  };

  return (
    <div className="instructors-gallery-container">
      <Title level={2}>Formadores Participantes</Title>

      <div className="filter-container">
        <Input
          placeholder="Buscar por nombre"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: 200, marginRight: 10 }}
        />

        <Select
          value={selectedTopic}
          onChange={setSelectedTopic}
          style={{ width: 200, marginRight: 10 }}
        >
          {topicOptions.map((topic, idx) => (
            <Option key={idx} value={topic}>
              {topic}
            </Option>
          ))}
        </Select>

        <Select
          value={selectedCategory}
          onChange={setSelectedCategory}
          style={{ width: 200 }}
        >
          {categoryOptions.map((cat, idx) => (
            <Option key={idx} value={cat}>
              {cat}
            </Option>
          ))}
        </Select>
      </div>

      {isLoading ? (
        <Spin size="large" />
      ) : isError ? (
        <p>Error: {message}</p>
      ) : (
        <div className="instructor-list">
          {filteredInstructors.map((instructor) => (
            <InstructorsCard
              key={instructor.id || instructor.email}
              instructor={instructor}
              onClick={() => openModal(instructor)}
            />
          ))}
        </div>
      )}

      <Modal
        open={isModalVisible}
        onCancel={closeModal}
        footer={null}
        title={selectedInstructor?.name}
      >
        {selectedInstructor && (
          <>
            {selectedInstructor.img_url && (
              <img
                src={selectedInstructor.img_url}
                alt={selectedInstructor.name}
                className="modal-img"
              />
            )}
            <p><strong>Categoría:</strong> {selectedInstructor.topic_category || 'No definido'}</p>
            {selectedInstructor.linkedin && (
              <p>
                <strong>LinkedIn:</strong>{' '}
                <a href={selectedInstructor.linkedin} target="_blank" rel="noopener noreferrer">
                  {selectedInstructor.linkedin}
                </a>
              </p>
            )}
            <p><strong>Email:</strong> {selectedInstructor.email || 'No disponible'}</p>
          </>
        )}
      </Modal>
    </div>
  );
};

export default InstructorsGallery;