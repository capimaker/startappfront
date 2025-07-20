import axios from "axios";

const API_URL = "http://localhost:8080/user" 

const login = async (userData) => {
  const res = await axios.post(`${API_URL}/login`, userData);
  if (res.data) {
    console.log(res.data.user);
    localStorage.setItem("user", JSON.stringify(res.data.user));
    localStorage.setItem("token", JSON.stringify(res.data.token));
  }
  return res.data;
};
const authService = {
    login,
};

export default authService;