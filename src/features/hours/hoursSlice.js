import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  totalHours: 60,
  workedHours: 40,
  tasks: [
    { id: nanoid(), task: 'Planificación', hours: 10 },
    { id: nanoid(), task: 'Diseño',       hours: 15 },
    { id: nanoid(), task: 'Desarrollo',   hours: 12 },
    { id: nanoid(), task: 'Pruebas',      hours: 3  },
  ],
};

const hoursSlice = createSlice({
  name: 'hours',
  initialState,
  reducers: {
    setTotals(state, action) {
      const { total, worked } = action.payload;
      state.totalHours = total;
      state.workedHours = worked;
    },
    addTask: {
      reducer(state, action) {
        state.tasks.push(action.payload);
      },
      prepare(task, hours) {
        return { payload: { id: nanoid(), task, hours: Number(hours) || 0 } };
      },
    },
    updateTask(state, action) {
      const { id, task, hours } = action.payload;
      const t = state.tasks.find(t => t.id === id);
      if (t) {
        if (task !== undefined) t.task = task;
        if (hours !== undefined) t.hours = Number(hours) || 0;
      }
    },
    removeTask(state, action) {
      state.tasks = state.tasks.filter(t => t.id !== action.payload);
    },
  },
});

export const { setTotals, addTask, updateTask, removeTask } = hoursSlice.actions;


export const selectTotals = (s) => {
  const total = s.hours.totalHours;
  const worked = s.hours.workedHours;
  const remaining = total - worked;
  const progress = total ? (worked / total) * 100 : 0;
  return { total, worked, remaining, progress };
};
export const selectTasks = (s) => s.hours.tasks;

export default hoursSlice.reducer;
