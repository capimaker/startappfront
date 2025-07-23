// src/components/calendar/MentorshipBigCalendar.jsx
import React, { useState } from 'react';
import { Calendar as RBCalendar, Views } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';

import { Modal, Form, DatePicker, TimePicker, Select, Input, Button, Space } from 'antd';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';

import { localizer } from '../../utils/calendarLocalizer';
import { stringToColor, getContrastColor } from '../../utils/colors';
import {
  addLocalEvent,
  updateLocalEvent,
  deleteLocalEvent,
  selectEvents,
} from '../../features/sessions/sessionSlice';

import './MentorshipBigCalendar.css';

const { Option } = Select;
const { TextArea } = Input;
const DnDCalendar = withDragAndDrop(RBCalendar);

const MentorshipBigCalendar = ({ mentors = [], startups = [] }) => {
  const dispatch = useDispatch();
  const events = useSelector(selectEvents);

  // ---- CONTROLAMOS vista y fecha para que la toolbar funcione tras refrescos ----
  const [view, setView] = useState(Views.WEEK);
  const [date, setDate] = useState(new Date());

  // Adaptamos eventos al formato RBC
  const rbcEvents = events.map((e) => ({
    id: e.id,
    title: e.title,
    start: new Date(e.start),
    end: new Date(e.end),
    resource: e,
  }));

  // ---- State modales ----
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);

  const [form] = Form.useForm();
  const [editForm] = Form.useForm();

  /* ===================== CREAR ===================== */
  const onSelectSlot = ({ start, end }) => {
    setModalOpen(true);
    form.setFieldsValue({
      date: dayjs(start),
      start: dayjs(start),
      duration: Math.max(dayjs(end).diff(dayjs(start), 'minute'), 60),
    });
  };

  const onCreate = async () => {
    try {
      const values = await form.validateFields();
      const { date, start, duration, mentorId, startupId, notes } = values;

      const startDateTime = dayjs(date)
        .hour(start.hour())
        .minute(start.minute())
        .second(0);
      const endDateTime = startDateTime.add(duration, 'minute');

      const payload = {
        title: `${mentors.find((m) => m.id_mentor === mentorId)?.name || 'Mentoría'} - ${start.format('HH:mm')}`,
        mentor: mentorId,
        mentee: startupId,
        date: startDateTime.toISOString(),
        start: startDateTime.toISOString(),
        end: endDateTime.toISOString(),
        duration,
        notes,
      };

      dispatch(addLocalEvent(payload));
      setModalOpen(false);
      form.resetFields();
    } catch {
      /* validation error ignored */
    }
  };

  /* ===================== EDITAR ===================== */
  const onSelectEvent = (event) => {
    const res = event.resource;
    setCurrentEvent(res);
    setEditModalOpen(true);

    editForm.setFieldsValue({
      date: dayjs(res.start),
      start: dayjs(res.start),
      duration: res.duration || dayjs(res.end).diff(dayjs(res.start), 'minute'),
      mentorId: res.mentor,
      startupId: res.mentee,
      notes: res.notes,
    });
  };

  const onUpdate = async () => {
    if (!currentEvent) return;
    try {
      const values = await editForm.validateFields();
      const { date, start, duration, mentorId, startupId, notes } = values;

      const startDateTime = dayjs(date)
        .hour(start.hour())
        .minute(start.minute())
        .second(0);
      const endDateTime = startDateTime.add(duration, 'minute');

      const updated = {
        id: currentEvent.id,
        title: `${mentors.find((m) => m.id_mentor === mentorId)?.name || 'Mentoría'} - ${start.format('HH:mm')}`,
        mentor: mentorId,
        mentee: startupId,
        date: startDateTime.toISOString(),
        start: startDateTime.toISOString(),
        end: endDateTime.toISOString(),
        duration,
        notes,
      };

      dispatch(updateLocalEvent(updated));
      setEditModalOpen(false);
      setCurrentEvent(null);
    } catch {
      /* validation error ignored */
    }
  };

  const onDelete = () => {
    if (!currentEvent) return;
    dispatch(deleteLocalEvent(currentEvent.id));
    setEditModalOpen(false);
    setCurrentEvent(null);
  };

  /* ===================== DnD HANDLERS ===================== */
  const handleEventDrop = ({ event, start, end }) => {
    const original = event.resource;
    const duration = dayjs(end).diff(dayjs(start), 'minute');

    dispatch(
      updateLocalEvent({
        id: original.id,
        start: start.toISOString(),
        end: end.toISOString(),
        duration,
        date: start.toISOString(),
        title: original.title,
        mentor: original.mentor,
        mentee: original.mentee,
        notes: original.notes,
      })
    );
  };

  const handleEventResize = ({ event, start, end }) => {
    const original = event.resource;
    const duration = dayjs(end).diff(dayjs(start), 'minute');

    dispatch(
      updateLocalEvent({
        id: original.id,
        start: start.toISOString(),
        end: end.toISOString(),
        duration,
        date: start.toISOString(),
        title: original.title,
        mentor: original.mentor,
        mentee: original.mentee,
        notes: original.notes,
      })
    );
  };

  return (
    <div className="mentorship-calendar-container">
      <DnDCalendar
        selectable
        resizable
        localizer={localizer}
        events={rbcEvents}
        views={[Views.MONTH, Views.WEEK, Views.DAY, Views.AGENDA]}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}

        /* Controlados para que los botones de la toolbar funcionen siempre */
        view={view}
        date={date}
        onView={setView}
        onNavigate={setDate}

        onSelectSlot={onSelectSlot}
        onSelectEvent={onSelectEvent}
        onEventDrop={handleEventDrop}
        onEventResize={handleEventResize}
        draggableAccessor={() => true}
        resizableAccessor={() => true}
        eventPropGetter={(event) => {
          const id = event.resource?.mentor || 'default';
          const bg = stringToColor(id);
          const color = getContrastColor(bg);
          return {
            style: {
              backgroundColor: bg,
              color,
              border: 'none',
            },
          };
        }}
        messages={{
          today: 'Hoy',
          previous: 'Anterior',
          next: 'Siguiente',
          month: 'Mes',
          week: 'Semana',
          day: 'Día',
          agenda: 'Agenda',
          date: 'Fecha',
          time: 'Hora',
          event: 'Evento',
          noEventsInRange: 'No hay eventos en este rango.',
        }}
      />

      {/* MODAL CREAR */}
      <Modal
        open={modalOpen}
        onCancel={() => {
          setModalOpen(false);
          form.resetFields();
        }} // Reiniciar formulario al cancelar
        onOk={onCreate}
        okText="Guardar mentoría"
        title="Nueva mentoría"
        // Añade una clase personalizada al Modal para estilizarlo
        className="mentorship-modal"
      >
        <Form layout="vertical" form={form} className="mentorship-form-wrapper">
          <Form.Item name="date" label="Fecha" rules={[{ required: true, message: 'Por favor, selecciona la fecha!' }]}>
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="start"
            label="Hora inicio"
            rules={[{ required: true, message: 'Por favor, selecciona la hora de inicio!' }]}
          >
            <TimePicker format="HH:mm" style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="duration"
            label="Duración (min)"
            rules={[{ required: true, message: 'Por favor, selecciona la duración!' }]}
          >
            <Select className="select-horas">
              {[30, 45, 60, 90, 120].map((min) => (
                <Option key={min} value={min}>
                  {min} min
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="mentorId"
            label="Mentor"
            rules={[{ required: true, message: 'Por favor, selecciona un mentor!' }]}
          >
            <Select showSearch optionFilterProp="children" placeholder="Selecciona mentor" className="select-horas">
              {mentors.map((m) => (
                <Option key={m.id_mentor} value={m.id_mentor}>
                  {m.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="startupId"
            label="Startup"
            rules={[{ required: true, message: 'Por favor, selecciona una startup!' }]}
          >
            <Select showSearch optionFilterProp="children" placeholder="Selecciona startup" className="select-horas">
              {startups.map((s) => (
                <Option key={s.id_startup} value={s.id_startup}>
                  {s.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="notes" label="Notas">
            <TextArea rows={3} />
          </Form.Item>
        </Form>
      </Modal>

      {/* MODAL EDITAR */}
      <Modal
        open={editModalOpen}
        onCancel={() => {
          setEditModalOpen(false);
          setCurrentEvent(null);
          editForm.resetFields(); // Reiniciar formulario de edición al cancelar
        }}
        footer={null} // El footer será gestionado por los botones dentro del formulario
        title="Editar mentoría"
        // Añade una clase personalizada al Modal para estilizarlo
        className="mentorship-modal"
      >
        <Form layout="vertical" form={editForm} className="mentorship-form-wrapper">
          <Form.Item name="date" label="Fecha" rules={[{ required: true, message: 'Por favor, selecciona la fecha!' }]}>
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="start"
            label="Hora inicio"
            rules={[{ required: true, message: 'Por favor, selecciona la hora de inicio!' }]}
          >
            <TimePicker format="HH:mm" style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="duration"
            label="Duración (min)"
            rules={[{ required: true, message: 'Por favor, selecciona la duración!' }]}
          >
            <Select className="select-horas">
              {[30, 45, 60, 90, 120].map((min) => (
                <Option key={min} value={min}>
                  {min} min
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="mentorId"
            label="Mentor"
            rules={[{ required: true, message: 'Por favor, selecciona un mentor!' }]}
          >
            <Select showSearch optionFilterProp="children" placeholder="Selecciona mentor" className="select-horas">
              {mentors.map((m) => (
                <Option key={m.id_mentor} value={m.id_mentor}>
                  {m.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="startupId"
            label="Startup"
            rules={[{ required: true, message: 'Por favor, selecciona una startup!' }]}
          >
            <Select showSearch optionFilterProp="children" placeholder="Selecciona startup" className="select-horas">
              {startups.map((s) => (
                <Option key={s.id_startup} value={s.id_startup}>
                  {s.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="notes" label="Notas">
            <TextArea rows={3} />
          </Form.Item>

          <Space style={{ width: '100%', justifyContent: 'space-between', marginTop: '20px' }}>
            {' '}
            {/* Añadido margen superior */}
            <Button danger onClick={onDelete}>
              Eliminar
            </Button>
            <Button type="primary" onClick={onUpdate}>
              Guardar cambios
            </Button>
          </Space>
        </Form>
      </Modal>
    </div>
  );
};

export default MentorshipBigCalendar;
