// src/features/mentors/mentorsService.js
import axios from 'axios';

const API_BASE = 'https://tripulaciones-730053494094.europe-west1.run.app';

const getAllMentors = async () => {
  const response = await axios.get(`${API_BASE}/get_all_mentors_all`);
  return response.data;
};

const mentorsService = {
  getAllMentors,
};

export default mentorsService;
