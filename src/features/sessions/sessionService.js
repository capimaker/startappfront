
import axios from 'axios';

//const API_URL = 'http://localhost:8080/api/sessions'; 

const createSession = async (sessionData) => {
  const token = JSON.parse(localStorage.getItem('token'));

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.post(API_URL, sessionData, config);
  return res.data;
};

const sessionService = {
  createSession,
};

export default sessionService;
