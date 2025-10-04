// App.jsx
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from './features/service/authSlice.js';

import AppLayout from './components/common/Layout/AppLayout';
import Login from './components/Login/Login.jsx';
import MentorshipSessionForm from './components/mentorship/MentorshipSessionForm';
import Details from './components/pages/Details.jsx';
import DashboardPage from './components/pages/DashboardPage.jsx';
import StartupGallery from './components/startups/StartupGallery';
import InstructorsGallery from './components/instructors/InstructorsGallery';
import MentorsGallery from './components/mentors/MentorsGallery';

import './App.css';

function MainRouterContent() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await dispatch(logout());
    } finally {
      navigate('/', { replace: true });
    }
  };

  const withLayout = (node) => (
    <AppLayout onLogout={handleLogout}>{node}</AppLayout>
  );

  // Si no hay user, redirige a "/"; si hay user, envuelve con AppLayout
  const requireAuth = (node) => (user ? withLayout(node) : <Navigate to="/" replace />);

  return (
    <Routes>
      {/* Ruta pública: login. Si ya hay sesión, envía al dashboard */}
      <Route
        path="/"
        element={user ? <Navigate to="/dashboard" replace /> : <Login />}
      />

      {/* Privadas (cada una se define una sola vez) */}
      <Route path="/dashboard"        element={requireAuth(<DashboardPage />)} />
      <Route path="/addmentorship"    element={requireAuth(<MentorshipSessionForm />)} />
      <Route path="/agendarmentoria"  element={requireAuth(<MentorshipSessionForm />)} />
      <Route path="/details"          element={requireAuth(<Details />)} />
      <Route path="/startups"         element={requireAuth(<StartupGallery />)} />
      <Route path="/mentors"          element={requireAuth(<MentorsGallery />)} />
      <Route path="/instructors"      element={requireAuth(<InstructorsGallery />)} />

      {/* 404 opcional */}
      {/* <Route path="*" element={<NotFoundPage />} /> */}
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <MainRouterContent />
    </BrowserRouter>
  );
}
