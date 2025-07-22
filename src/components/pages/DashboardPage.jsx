import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectTotals, selectTasks, setTotals } from '../../features/hours/hoursSlice';
import { Row, Col, Card, InputNumber, Typography, Divider } from 'antd';
import GaugeChart from '../dashboard/GaugeChart'
import PieChart from '../dashboard/PieChart';
import BarChart from '../dashboard/BarChart';
import TaskTable from '../dashboard/TaskTable';

const { Title } = Typography;

const DashboardPage = () => {
  const dispatch = useDispatch();
  const totals = useSelector(selectTotals);
  const tasks = useSelector(selectTasks);

  const onChangeTotals = (field) => (value) => {
    dispatch(setTotals({ ...totals, [field]: value }));
  };

  return (
    <div style={{ padding: 24 }}>
      <Title level={2}>⏱️ Seguimiento de Horas del Proyecto</Title>

      <Card style={{ marginBottom: 24 }}>
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
      </Card>

      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={8}><Card>Realizadas: <b>{totals.worked.toFixed(0)} h</b></Card></Col>
        <Col span={8}><Card>Restantes: <b>{totals.remaining.toFixed(0)} h</b></Card></Col>
        <Col span={8}><Card>Progreso: <b>{totals.progress.toFixed(1)} %</b></Card></Col>
      </Row>

      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={12}><Card><GaugeChart value={totals.worked} max={totals.total} /></Card></Col>
        <Col span={12}><Card><PieChart worked={totals.worked} remaining={totals.remaining} /></Card></Col>
      </Row>

      <Card>
        <Title level={4}>📋 Desglose de tareas</Title>
        <TaskTable tasks={tasks} />
        <Divider />
        <BarChart data={tasks} />
      </Card>
    </div>
  );
};

export default DashboardPage;
