
import axios from 'axios';

const API_BASE = '/api';

const getAllStartups = async () => {
  const response = await axios.get(`${API_BASE}/get_all_startups_no_hours`);
  return response.data.startups;
};


export default {
  getAllStartups,
};
