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
  // IMPORTANTE: DEBES REEMPLAZAR ESTO CON TUS DATOS REALES DE REDUX O DE DONDE LOS OBTENGAS.
  // Esto es solo para que el calendario no de error si no tienes los selectores de mentores/startups aún.
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
    // Añadimos una clase específica al contenedor principal
    <div className="dashboard-page-container">
      <Title level={2} className="dashboard-page-title">
        Seguimiento de Horas de Formación
      </Title>

      {/* <Card className="dashboard-card-inputs">
        <Row gutter={24}>
          <Col>
            <span>Horas totales: </span>
            <InputNumber min={1} value={totals.total} onChange={onChangeTotals('total')} />
          </Col>
          <Col>
            <span>Horas realizadas: </span>
            <InputNumber min={0} value={totals.worked} onChange={onChangeTotals('worked')} />
          </Col>
        </Row>
      </Card> */}

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
        {/* Usamos props de Ant Design para responsividad de Col */}
        <Col xs={24} sm={24} md={12} lg={12} className="dashboard-chart-col">
          <Card
            className="dashboard-gauge-chart-card"
            style={{
              height: '300px', // Altura ajustada para el GaugeChart
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
              height: '300px', // ¡Ajustada a la misma altura que el GaugeChart!
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

      {/* Aquí se añade el componente de calendario */}
      <Row gutter={16} style={{ marginTop: '24px', marginBottom: '24px' }}>
        <Col span={24}>
          {' '}
          {/* El calendario ocupa todo el ancho de la fila */}
          <Card
            className="dashboard-calendar-card"
            style={{
              // Estos estilos replican el look de las "tarjetas" del diseño
              background:
                'linear-gradient(135deg, #2b1c68, #0c0a20)' /* Degradado de tus variables violetaDark a dark */,
              borderRadius: '10px',
              padding: '0' /* El padding lo gestiona el propio calendario con MentorshipBigCalendar.css */,
              border: 'none',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
              overflow: 'hidden' /* Asegura que los bordes redondeados se vean bien */,
            }}
          >
            <CalendarStartup mentors={mockMentors} startups={mockStartups} />
            {/* Recuerda reemplazar mockMentors y mockStartups con tus datos reales */}
          </Card>
        </Col>
      </Row>

      {/* <Card className="dashboard-task-card">
        <Title level={4} className="dashboard-task-title">
          📋 Desglose de tareas
        </Title>
        <TaskTable tasks={tasks} />
        <Divider />
        <BarChart data={tasks} />
      </Card> */}

      {/* <Card className="dashboard-task-card" style={{ marginTop: '24px' }}>
        <LessonTable />
      </Card> */}
    </div>
  );
};

export default DashboardPage;
