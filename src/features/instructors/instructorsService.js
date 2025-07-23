import axios from 'axios';

//const API_BASE = '/api';
const API_BASE = 'https://tripulaciones-730053494094.europe-west1.run.app';

const getAllInstructors = async () => {
  const response = await axios.get(`${API_BASE}/get_all_instructors_all`);
  return response.data;
};


export default {
  getAllInstructors,
};
