import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from './features/service/authSlice.js'; // Asegúrate de que la ruta sea correcta

// Importa tus componentes
import AppLayout from './components/common/Layout/AppLayout';
import Login from './components/Login/Login.jsx';
import MentorshipSessionForm from './components/mentorship/MentorshipSessionForm';
import Details from './components/pages/Details.jsx';
import StartupGallery from './components/startups/StartupGallery';
//import { Header } from './components/common/Header/Header';
//import { Footer } from './components/common/Footer/Footer';
import InstructorsGallery from './components/instructors/InstructorsGallery';
import MentorsGallery from './components/mentors/MentorsGallery';

import './App.css'; // Tu archivo CSS global

/**
 * Componente que contiene toda la lógica de enrutamiento y acceso a hooks.
 * Debe ser un descendiente de BrowserRouter.
 */
function MainRouterContent() {
  // Obtiene el estado del usuario desde Redux
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // useNavigate debe usarse dentro del contexto de BrowserRouter

  /**
   * Maneja el cierre de sesión del usuario.
   * Dispara la acción de logout y navega a la página de inicio.
   */
  const handleLogout = async () => {
    await dispatch(logout());
    navigate('/');
  };

  /**
   * Función auxiliar para renderizar una ruta que requiere autenticación
   * y el componente AppLayout.
   * Si el usuario está autenticado, muestra el componente dentro de AppLayout.
   * Si no, redirige al componente de Login.
   * @param {React.ReactNode} Component - El componente a renderizar si el usuario está autenticado.
   * @returns {React.ReactNode} El componente envuelto en AppLayout o el componente Login.
   */
  const renderAuthenticatedRoute = (Component) => {
    return user ? <AppLayout onLogout={handleLogout}>{Component}</AppLayout> : <Login />;
  };

  return (

    <Routes>
      {/* Ruta de inicio: Si el usuario está autenticado, muestra un mensaje de bienvenida
          dentro de AppLayout, de lo contrario, muestra Login.
          Puedes reemplazar <div>Bienvenido</div> con tu componente de Dashboard o Home. */}
      <Route path="/" element={renderAuthenticatedRoute(<div>Bienvenido a la plataforma</div>)} />

      {/* Rutas que requieren autenticación y el AppLayout */}
      <Route path="/addmentorship" element={renderAuthenticatedRoute(<MentorshipSessionForm />)} />
      <Route path="/details" element={renderAuthenticatedRoute(<Details />)} />
      <Route path="/agendarmentoria" element={renderAuthenticatedRoute(<MentorshipSessionForm />)} />
      <Route path="/startups" element={renderAuthenticatedRoute(<StartupGallery />)} />
      <Route path="/mentors" element={renderAuthenticatedRoute(<MentorsGallery />)} />
          <Route path="/instructors" element={<InstructorsGallery />} />

      {/* Puedes añadir una ruta para manejar páginas no encontradas (404) si lo deseas */}
      {/* <Route path="*" element={<NotFoundPage />} /> */}
    </Routes>
  );
}

/**
 * Componente principal de la aplicación.
 * Envuelve toda la lógica de enrutamiento con BrowserRouter.
 */
function App() {
  return (
    <BrowserRouter>
      <MainRouterContent />
    </BrowserRouter>
  );
}

export default App;
