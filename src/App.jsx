import { BrowserRouter } from 'react-router-dom';
import './App.css';
import AppLayout from './components/common/Layout/AppLayout';
import Login from "./components/Login/Login.jsx";
import { useState } from 'react';

function App() {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')));

  const handleLogin = (loggedUser) => {
    localStorage.setItem('user', JSON.stringify(loggedUser));
    setUser(loggedUser);
  };

  return (
    <BrowserRouter>
      {user ? <AppLayout /> : <Login onLogin={handleLogin} />}
    </BrowserRouter>
  );
}

export default App;
