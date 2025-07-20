import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from './components/common/Layout/AppLayout';
import Login from "./components/Login/Login.jsx";
import { useState } from 'react';
import MentorshipSessionForm from './components/mentorship/MentorshipSessionForm';
import './App.css';

function App() {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')));

  const handleLogin = (loggedUser) => {
    localStorage.setItem('user', JSON.stringify(loggedUser));
    setUser(loggedUser);
  };

  return (
  
    <>
      <BrowserRouter>
       {user ? <AppLayout /> : <Login onLogin={handleLogin} />}
        <Routes>
          <Route
            path="/addmentorship"
            element={
              <AppLayout>
                <MentorshipSessionForm />
              </AppLayout>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
