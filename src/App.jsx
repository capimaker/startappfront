import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import AppLayout from './components/common/Layout/AppLayout';
import Login from './components/Login/Login.jsx';
import MentorshipSessionForm from './components/mentorship/MentorshipSessionForm';
import StartupGallery from './components/startups/StartupGallery';
import MentorsGallery from './components/mentors/MentorsGallery'
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../src/features/service/authSlice.js';
import Details from './components/pages/Details.jsx';
import DashboardPage from './components/pages/DashboardPage.jsx';
import './App.css';

function AppRoutes() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logout());
    navigate('/');
  };

  return (
    <Routes>
      <Route path="/" element={user ? <AppLayout onLogout={handleLogout} /> : <Login />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route
        path="/addmentorship"
        element={
          user ? (
            <AppLayout onLogout={handleLogout}>
              <MentorshipSessionForm />
            </AppLayout>
          ) : (
            <Login />
          )
        }
      />
      <Route
        path="/details"
        element={
          user ? (
            <AppLayout onLogout={handleLogout}>
              <Details />
            </AppLayout>
          ) : (
            <Login />
          )
        }
      />
      <Route path="/startups" element={<StartupGallery />} />
        <Route path="/mentors" element={<MentorsGallery />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
