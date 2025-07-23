import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectTotals, selectTasks, setTotals } from '../../features/hours/hoursSlice';
import { Row, Col, Card, InputNumber, Typography, Divider } from 'antd';
import GaugeChart from '../dashboard/GaugeChart';
import PieChart from '../dashboard/PieChart';
import CalendarStartup from '../calendar/MentorshipBigCalendar'; // Tu componente de calendario

import './DashboardPage.css'; // Estilos específicos de tu dashboard

const { Title } = Typography;

const DashboardPage = () => {
  const dispatch = useDispatch();
  const totals = useSelector(selectTotals);
  const tasks = useSelector(selectTasks);

  // --- MOCK DATA PARA MENTORS Y STARTUPS ---
  const mockMentors = [
    { id_mentor: 'mentor1', name: 'Dr. Innovador' },
    { id_mentor: 'mentor2', name: 'Ing. Emprendedor' },
    { id_mentor: 'mentor3', name: 'Lic. Estratega' },
  ];

  const mockStartups = [
    { id_startup: 'startupA', name: 'Tech Solutions' },
    { id_startup: 'startupB', name: 'Green Ventures' },
    { id_startup: 'startupC', name: 'Creative Hub' },
  ];
  // --- FIN MOCK DATA ---

  const onChangeTotals = (field) => (value) => {
    dispatch(setTotals({ ...totals, [field]: value }));
  };

  return (
    <div className="dashboard-page-container">
      <Title level={2} className="dashboard-page-title">
        Seguimiento de Horas de Formación
      </Title>

      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={8}>
          <Card className="dashboard-card-summary">
            Realizadas: <b>{totals.worked.toFixed(0)} h</b>
          </Card>
        </Col>
        <Col span={8}>
          <Card className="dashboard-card-summary">
            Restantes: <b>{totals.remaining.toFixed(0)} h</b>
          </Card>
        </Col>
        <Col span={8}>
          <Card className="dashboard-card-summary">
            Progreso: <b>{totals.progress.toFixed(1)} %</b>
          </Card>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={24} md={12} lg={12} className="dashboard-chart-col">
          <Card
            className="dashboard-gauge-chart-card"
            style={{
              height: '300px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <GaugeChart value={totals.worked} max={totals.total} />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} className="dashboard-chart-col">
          <Card
            className="dashboard-pie-chart-card"
            style={{
              height: '300px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <PieChart worked={totals.worked} remaining={totals.remaining} />
          </Card>
        </Col>
      </Row>

      {/* MODIFICACIÓN AQUÍ: Añadimos justify="center" al Row para centrar su contenido */}
      <Row gutter={16} style={{ marginTop: '24px', marginBottom: '24px' }} justify="center">
        <Col span={24}>
          <Card
            className="dashboard-calendar-card"
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              borderRadius: '10px',
              padding: '0',
              border: 'none',
              boxShadow: '-1px -1px 35px 8px rgba(0, 0, 0, 0.5) !important',
              overflow: 'hidden',
            }}
          >
            <CalendarStartup mentors={mockMentors} startups={mockStartups} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardPage;
