import axios from 'axios';

const BASE_URL = 'https://tripulaciones-730053494094.europe-west1.run.app';

const getAllStartups = async () => {
  const response = await axios.get('/api/get_all_startups_no_hours');
  return response.data;
};

export default { getAllStartups };
