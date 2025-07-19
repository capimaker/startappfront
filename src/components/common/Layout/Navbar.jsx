
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.scss';

function Navbar() {
 
  const [isFormacionOpen, setIsFormacionOpen] = useState(false);
  const [isCalendarioOpen, setIsCalendarioOpen] = useState(false);
  const [isMentoriasOpen, setIsMentoriasOpen] = useState(false);

 
  const toggleFormacionSubmenu = () => {
    setIsFormacionOpen(!isFormacionOpen);
   
    if (isCalendarioOpen) setIsCalendarioOpen(false);
    if (isMentoriasOpen) setIsMentoriasOpen(false); 
  };

 
  const toggleCalendarioSubmenu = () => {
    setIsCalendarioOpen(!isCalendarioOpen);
   
    if (isFormacionOpen) setIsFormacionOpen(false);
    if (isMentoriasOpen) setIsMentoriasOpen(false); 
  };

 
  const toggleMentoriasSubmenu = () => {
    setIsMentoriasOpen(!isMentoriasOpen);
 
    if (isFormacionOpen) setIsFormacionOpen(false);
    if (isCalendarioOpen) setIsCalendarioOpen(false);
  };

  return (
    <nav className="navbar">
      <ul className="navbar-menu">
        <li className="navbar-item">
          <Link to="/" className="navbar-link">HOME</Link>
        </li>

        <li className="navbar-item has-submenu">
          <div className="navbar-link" onClick={toggleFormacionSubmenu}>
            FORMACION
        
          </div>
          
          <ul className={`submenu ${isFormacionOpen ? 'open' : ''}`}>
            <li className="submenu-item">
              <Link to="/formacion/contenido" className="submenu-link">Contenido</Link>
            </li>
            <li className="submenu-item">
              <Link to="/formacion/formadores" className="submenu-link">Formadores</Link>
            </li>
            <li className="submenu-item">
              <Link to="/formacion/participantes" className="submenu-link">Participantes</Link>
            </li>
            <li className="submenu-item">
              <Link to="/formacion/formulario-participantes" className="submenu-link">Formulario participantes</Link>
            </li>
          </ul>
        </li>

   
        <li className="navbar-item has-submenu">
          <div className="navbar-link" onClick={toggleCalendarioSubmenu}>
            CALENDARIO
          
          </div>
          
          <ul className={`submenu ${isCalendarioOpen ? 'open' : ''}`}>
            <li className="submenu-item">
              <Link to="/calendario/programa-curso" className="submenu-link">Programa curso</Link>
            </li>
            <li className="submenu-item">
              <Link to="/calendario/cita-mentor" className="submenu-link">Cita con mentor</Link>
            </li>
            <li className="submenu-item">
              <Link to="/calendario/actividades-networking" className="submenu-link">Actividades networking</Link>
            </li>
            <li className="submenu-item">
              <Link to="/calendario/eventos-internacionales" className="submenu-link">Eventos internacionales</Link>
            </li>
          </ul>
        </li>

    
        <li className="navbar-item has-submenu">
          <div className="navbar-link" onClick={toggleMentoriasSubmenu}>
            MENTORIAS
           
          </div>
          
          <ul className={`submenu ${isMentoriasOpen ? 'open' : ''}`}>
            <li className="submenu-item">
              <Link to="/mentorias/agenda" className="submenu-link">Agenda tu mentoria</Link>
            </li>
            <li className="submenu-item">
              <Link to="/mentorias/mentores" className="submenu-link">Mentores</Link>
            </li>
          </ul>
        </li>

        <li className="navbar-item">
          <Link to="/info" className="navbar-link">INFO</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;