import React, { useState } from 'react';
import { Calendar as RBCalendar, Views } from 'react-big-calendar';
import { localizer } from '../../utils/calendarLocalizer';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Modal, Form, DatePicker, TimePicker, Select, Input, Button, Space } from 'antd';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import {
  addLocalEvent,
  updateLocalEvent,
  deleteLocalEvent,
  selectEvents,
} from '../../features/sessions/sessionSlice';

const { Option } = Select;
const { TextArea } = Input;

const MentorshipBigCalendar = ({ mentors = [], startups = [] }) => {
  const dispatch = useDispatch();
  const events = useSelector(selectEvents);

  const rbcEvents = events.map(e => ({
    id: e.id,
    title: e.title,
    start: new Date(e.start),
    end: new Date(e.end),
    resource: e,
  }));

  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [editForm] = Form.useForm();
  const [currentEvent, setCurrentEvent] = useState(null);

  // Crear nuevo
  const onSelectSlot = ({ start, end }) => {
    setModalOpen(true);
    form.setFieldsValue({
      date: dayjs(start),
      start: dayjs(start),
      duration: dayjs(end).diff(dayjs(start), 'minute') || 60,
    });
  };

  const onCreate = async () => {
    try {
      const values = await form.validateFields();
      const { date, start, duration, mentorId, startupId, notes } = values;

      const startDateTime = dayjs(date).hour(start.hour()).minute(start.minute()).second(0);
      const endDateTime = startDateTime.add(duration, 'minute');

      const payload = {
        title: `${mentors.find(m => m.id_mentor === mentorId)?.name || 'Mentoría'} - ${start.format('HH:mm')}`,
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
    } catch {}
  };

  // Editar existente
  const onSelectEvent = (event) => {
    const res = event.resource;
    setCurrentEvent(res);
    setEditModalOpen(true);

    editForm.setFieldsValue({
      date: dayjs(res.start),
      start: dayjs(res.start),
      duration: dayjs(res.duration || dayjs(res.end).diff(dayjs(res.start), 'minute')),
      mentorId: res.mentor,
      startupId: res.mentee,
      notes: res.notes,
    });
  };

  const onUpdate = async () => {
    try {
      const values = await editForm.validateFields();
      const { date, start, duration, mentorId, startupId, notes } = values;

      const startDateTime = dayjs(date).hour(start.hour()).minute(start.minute()).second(0);
      const endDateTime = startDateTime.add(duration, 'minute');

      const updated = {
        id: currentEvent.id,
        title: `${mentors.find(m => m.id_mentor === mentorId)?.name || 'Mentoría'} - ${start.format('HH:mm')}`,
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
    } catch {}
  };

  const onDelete = () => {
    dispatch(deleteLocalEvent(currentEvent.id));
    setEditModalOpen(false);
    setCurrentEvent(null);
  };

  return (
    <>
      <RBCalendar
        selectable
        localizer={localizer}
        events={rbcEvents}
        defaultView={Views.WEEK}
        views={[Views.MONTH, Views.WEEK, Views.DAY, Views.AGENDA]}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
        onSelectSlot={onSelectSlot}
        onSelectEvent={onSelectEvent}
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

      {/* Modal Crear */}
      <Modal
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        onOk={onCreate}
        okText="Guardar mentoría"
        title="Nueva mentoría"
      >
        <Form layout="vertical" form={form}>
          <Form.Item name="date" label="Fecha" rules={[{ required: true }]}>
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="start" label="Hora inicio" rules={[{ required: true }]}>
            <TimePicker format="HH:mm" style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="duration" label="Duración (min)" rules={[{ required: true }]}>
            <Select>
              {[30,45,60,90,120].map(min=>(
                <Option key={min} value={min}>{min} min</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="mentorId" label="Mentor" rules={[{ required: true }]}>
            <Select showSearch optionFilterProp="children" placeholder="Selecciona mentor">
              {mentors.map(m => <Option key={m.id_mentor} value={m.id_mentor}>{m.name}</Option>)}
            </Select>
          </Form.Item>
          <Form.Item name="startupId" label="Startup" rules={[{ required: true }]}>
            <Select showSearch optionFilterProp="children" placeholder="Selecciona startup">
              {startups.map(s => <Option key={s.id_startup} value={s.id_startup}>{s.name}</Option>)}
            </Select>
          </Form.Item>
          <Form.Item name="notes" label="Notas">
            <TextArea rows={3} />
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal Editar */}
      <Modal
        open={editModalOpen}
        onCancel={() => { setEditModalOpen(false); setCurrentEvent(null); }}
        footer={null}
        title="Editar mentoría"
      >
        <Form layout="vertical" form={editForm}>
          <Form.Item name="date" label="Fecha" rules={[{ required: true }]}>
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="start" label="Hora inicio" rules={[{ required: true }]}>
            <TimePicker format="HH:mm" style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="duration" label="Duración (min)" rules={[{ required: true }]}>
            <Select>
              {[30,45,60,90,120].map(min=>(
                <Option key={min} value={min}>{min} min</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="mentorId" label="Mentor" rules={[{ required: true }]}>
            <Select showSearch optionFilterProp="children" placeholder="Selecciona mentor">
              {mentors.map(m => <Option key={m.id_mentor} value={m.id_mentor}>{m.name}</Option>)}
            </Select>
          </Form.Item>
          <Form.Item name="startupId" label="Startup" rules={[{ required: true }]}>
            <Select showSearch optionFilterProp="children" placeholder="Selecciona startup">
              {startups.map(s => <Option key={s.id_startup} value={s.id_startup}>{s.name}</Option>)}
            </Select>
          </Form.Item>
          <Form.Item name="notes" label="Notas">
            <TextArea rows={3} />
          </Form.Item>

          <Space style={{ width: '100%', justifyContent: 'space-between' }}>
            <Button danger onClick={onDelete}>Eliminar</Button>
            <Button type="primary" onClick={onUpdate}>Guardar cambios</Button>
          </Space>
        </Form>
      </Modal>
    </>
  );
};

export default MentorshipBigCalendar;
