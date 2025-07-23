// src/components/pages/DashboardPage.jsx
import React, { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Typography,  Divider } from 'antd';
import { Responsive, WidthProvider } from 'react-grid-layout';

import { selectTotals, setTotals } from '../../features/hours/hoursSlice';
import { getAllMentors } from '../../features/mentors/mentorsSlice';
import { getAllStartups } from '../../features/startups/startupSlice';

import GaugeChart from '../dashboard/GaugeChart';
import PieChart from '../dashboard/PieChart';
//import BarChart from '../dashboard/BarChart';
//import TaskTable from '../dashboard/TaskTable';
import MentorshipBigCalendar from '../calendar/MentorshipBigCalendar';
import './DashboardPage.css';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import './dashboard.css';

const { Title } = Typography;
const ResponsiveGridLayout = WidthProvider(Responsive);
const LS_KEY = 'dashboard_layout_v1';

// Layout inicial (12 columnas en lg)
const defaultLayout = [
 // { i: 'totalsInputs',  x: 0,  y: 0,  w: 4,  h: 5,  minW: 3, minH: 4 },
  { i: 'totalsNumbers', x: 4,  y: 0,  w: 8,  h: 5,  minW: 3, minH: 4 },
  { i: 'chartsRow',     x: 0,  y: 5,  w: 12, h: 16, minW: 6, minH: 12 },
 // { i: 'tasks',         x: 0,  y: 21, w: 6,  h: 20, minW: 4, minH: 14 },
  { i: 'calendar',      x: 6,  y: 21, w: 6,  h: 24, minW: 4, minH: 16 },
];

const DashboardPage = () => {
  const dispatch = useDispatch();

  const totals   = useSelector(selectTotals);
  //const tasks    = useSelector(selectTasks);
  const mentors  = useSelector(s => s.mentors?.mentors || []);
  const startups = useSelector(s => s.startups?.startups || []);

  useEffect(() => {
    if (!mentors.length)  dispatch(getAllMentors());
    if (!startups.length) dispatch(getAllStartups());
  }, [dispatch, mentors.length, startups.length]);

  const worked    = totals?.worked ?? 0;
  const remaining = totals?.remaining ?? 0;
  const progress  = totals?.progress ?? 0;
  const total     = totals?.total ?? 1;

  const onChangeTotals = (field) => (value) => {
    dispatch(setTotals({ ...totals, [field]: value }));
  };

  // Layout persistido en localStorage
  const [layouts, setLayouts] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(LS_KEY)) || { lg: defaultLayout };
    } catch {
      return { lg: defaultLayout };
    }
  });

  const onLayoutChange = (_curr, allLayouts) => {
    setLayouts(allLayouts);
    localStorage.setItem(LS_KEY, JSON.stringify(allLayouts));
  };

  /* ---------- Cards ---------- */
 {/*} const TotalsInputs = useMemo(() => (
    <Card size="small" title={<div className="drag-handle">Configurar horas</div>}>
      <div className="flex-row">
        <div>
          <span>Horas totales: </span>
          <InputNumber className="no-drag" min={1} value={total} onChange={onChangeTotals('total')} />
        </div>
        <div>
          <span>Horas realizadas: </span>
          <InputNumber className="no-drag" min={0} value={worked} onChange={onChangeTotals('worked')} />
        </div>
      </div>
    </Card>
  ), [total, worked]); */}

  const TotalsNumbers = useMemo(() => (
    <Card size="small" title={<div className="drag-handle">Resumen</div>}>
      <div className="flex-row">
        <Card className="mini-card">Realizadas: <b>{worked.toFixed(0)} h</b></Card>
        <Card className="mini-card">Restantes: <b>{remaining.toFixed(0)} h</b></Card>
        <Card className="mini-card">Progreso: <b>{progress.toFixed(1)} %</b></Card>
      </div>
    </Card>
  ), [worked, remaining, progress]);

  const ChartsRow = useMemo(() => (
    <Card size="small" className="scroll-card" title={<div className="drag-handle">Gráficas</div>}>
      <div className="flex-row wrap">
        <div className="chart-wrapper">
          <GaugeChart value={worked} max={total} />
        </div>
        <div className="chart-wrapper">
          <PieChart worked={worked} remaining={remaining} />
        </div>
      </div>
    </Card>
  ), [worked, total, remaining]);

  {/*const TasksCard = useMemo(() => (
    <Card size="small" className="scroll-card" title={<div className="drag-handle">📋 Desglose de tareas</div>}>
      
      <Divider />
      <BarChart data={tasks} />
    </Card>
  ), [tasks]); */}

  const CalendarCard = useMemo(() => (
    <Card size="small" className="scroll-card" title={<div className="drag-handle">📅 Calendario de mentorías</div>}>
      {/* Evita que el grid capture el drag dentro del calendario */}
      <div className="calendar-box no-drag">
        <MentorshipBigCalendar mentors={mentors} startups={startups} />
      </div>
    </Card>
  ), [mentors, startups]);

  return (
    <div style={{ padding: 24,}}>
      <Title level={2} style={{ color: '#fff' }}>⏱️ Seguimiento de Horas del Proyecto</Title>

      <ResponsiveGridLayout
        className="layout"
        layouts={layouts}
        rowHeight={30}
        margin={[16, 16]}
        compactType={null}
        preventCollision={true}
        isBounded={false}
        breakpoints={{ lg:1200, md:996, sm:768, xs:480, xxs:0 }}
        cols={{        lg:12,  md:10, sm:8,  xs:4,   xxs:2 }}
        onLayoutChange={onLayoutChange}
        draggableHandle=".drag-handle"
        draggableCancel=".no-drag, .calendar-box, .calendar-box *, button, .rbc-toolbar, .rbc-button-link, .rbc-btn-group, input, textarea, select, .ant-select-selector, .ant-picker, .ant-btn"
        resizeHandles={['se', 'e', 's']}
      >
       {/*} <div key="totalsInputs">{TotalsInputs}</div>*/}
        <div key="totalsNumbers">{TotalsNumbers}</div>
        <div key="chartsRow">{ChartsRow}</div>
       {/*} <div key="tasks">{TasksCard}</div> */}
        <div key="calendar">{CalendarCard}</div>
      </ResponsiveGridLayout>
    </div>
  );
};

export default DashboardPage;
