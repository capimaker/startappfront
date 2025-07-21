import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './NavbarDesktop.css';
import { RocketFilled, DatabaseFilled, BulbFilled, EditFilled, HomeFilled, InfoCircleFilled } from '@ant-design/icons';
import logoPrueba from '../../../../assets/logoPrueba.webp';



const NavbarDesktop = () => {
  /* const { user } = useSelector((state) => state.auth); */

  return (
    <nav className="navbar__desktop">
      <ul className="navbar__list">
        <li className="navbar__userItem">
          <img className="navbar__user-img" src={logoPrueba} /* src={user.image} */ />
          <span className="navbar__text">Colibí{/* {user.username} */}</span>
        </li>

        <li className="navbar__item">
          <NavLink to="/dashboard" className={({ isActive }) => `navbar__link ${isActive ? 'active' : ''}`}>
            <span className="navbar__icon">
              <HomeFilled style={{ fontSize: '32px', color: '#ffffff' }} />
            </span>
            <span className="navbar__text">Inicio</span>
          </NavLink>
        </li>

        <li className="navbar__item">
          <NavLink to="/startups" className={({ isActive }) => `navbar__link ${isActive ? 'active' : ''}`}>
            <span className="navbar__icon">
              <RocketFilled style={{ fontSize: '32px', color: '#ffffff' }} />
            </span>
            <span className="navbar__text">Startups</span>
          </NavLink>
        </li>

        <li className="navbar__item">
          <NavLink to="/mentors" className={({ isActive }) => `navbar__link ${isActive ? 'active' : ''}`}>
            <span className="navbar__icon">
              <BulbFilled style={{ fontSize: '32px', color: '#ffffff' }} />
            </span>
            <span className="navbar__text">Mentores</span>
          </NavLink>
        </li>

        <li className="navbar__item">
          <NavLink to="/instructors" className={({ isActive }) => `navbar__link ${isActive ? 'active' : ''}`}>
            <span className="navbar__icon">
              <DatabaseFilled style={{ fontSize: '30px', color: '#ffffff' }} />
            </span>
            <span className="navbar__text">Formadores</span>
          </NavLink>
        </li>
        <li className="navbar__item">
            <NavLink to="/info" className={({ isActive }) => `navbar__link ${isActive ? 'active' : ''}`}>
            <span className="navbar__icon">
              <InfoCircleFilled style={{ fontSize: '30px', color: '#ffffff' }} />
            </span>
            <span className="navbar__text">Info</span>
          </NavLink>
          </li>

        <li className="navbar__item">
          <NavLink to="/addmentorship" className={({ isActive }) => `navbar__link ${isActive ? 'active' : ''}`}>
            <span className="navbar__icon">
              <EditFilled style={{ fontSize: '30px', color: '#ffffff' }} />
            </span>
            <span className="navbar__text">Mentoría</span>
          </NavLink>
      
        </li>
      </ul>
    </nav>
  );
};

export default NavbarDesktop;
