import React, { useState } from 'react';
import { Table, Input, InputNumber, Button, Popconfirm } from 'antd';
import { useDispatch } from 'react-redux';
import { addTask, updateTask, removeTask } from '../../features/hours/hoursSlice';

const TaskTable = ({ tasks }) => {
  const dispatch = useDispatch();
  const [newTask, setNewTask] = useState({ task: '', hours: 0 });

  const columns = [
    {
      title: 'Tarea',
      dataIndex: 'task',
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) => dispatch(updateTask({ id: record.id, task: e.target.value }))}
        />
      ),
    },
    {
      title: 'Horas',
      dataIndex: 'hours',
      width: 120,
      render: (value, record) => (
        <InputNumber
          min={0}
          value={value}
          onChange={(v) => dispatch(updateTask({ id: record.id, hours: v }))}
        />
      ),
    },
    {
      title: 'Acciones',
      dataIndex: 'actions',
      width: 100,
      render: (_, record) => (
        <Popconfirm
          title="¿Eliminar tarea?"
          onConfirm={() => dispatch(removeTask(record.id))}
        >
          <Button danger size="small">Eliminar</Button>
        </Popconfirm>
      ),
    },
  ];

  const onAdd = () => {
    if (!newTask.task) return;
    dispatch(addTask(newTask.task, newTask.hours));
    setNewTask({ task: '', hours: 0 });
  };

  return (
    <>
      <Table
        rowKey="id"
        dataSource={tasks}
        columns={columns}
        pagination={false}
        style={{ marginBottom: 16 }}
      />

      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <Input
          placeholder="Nueva tarea"
          value={newTask.task}
          onChange={(e) => setNewTask({ ...newTask, task: e.target.value })}
          style={{ width: 200 }}
        />
        <InputNumber
          min={0}
          value={newTask.hours}
          onChange={(v) => setNewTask({ ...newTask, hours: v })}
          style={{ width: 120 }}
        />
        <Button type="primary" onClick={onAdd}>Añadir</Button>
      </div>
    </>
  );
};

export default TaskTable;
