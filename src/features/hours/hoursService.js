
import axios from 'axios';
//const API = '';

export const fetchHours = () => axios.get(`${API}/hours`).then(r => r.data);
export const saveHours  = (payload) => axios.post(`${API}/hours`, payload).then(r => r.data);
