import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { RocketFilled, DatabaseFilled, BulbFilled, EditFilled, HomeFilled, LogoutOutlined } from '@ant-design/icons';
import './NavbarMobile.css';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../../features/service/authSlice';

const NavbarMobile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logout());
    navigate('/');
  };

  return (
    <nav className="navbar__mobile">
      <ul className="navbarm__list">
        <li className="navbarm__item">
          <NavLink to="/dashboard" className={({ isActive }) => `navbarm__link ${isActive ? 'active' : ''}`}>
            <span className="navbarm__icon">
              <HomeFilled style={{ fontSize: '32px', color: '#ffffff' }} />
            </span>
          </NavLink>
        </li>
        <li className="navbarm__item">
          <NavLink to="/startups" className={({ isActive }) => `navbarm__link ${isActive ? 'active' : ''}`}>
            <span className="navbarm__icon">
              <RocketFilled style={{ fontSize: '32px', color: '#ffffff' }} />
            </span>
          </NavLink>
        </li>
        <li className="navbarm__item">
          <NavLink to="/mentors" className={({ isActive }) => `navbarm__link ${isActive ? 'active' : ''}`}>
            <span className="navbarm__icon">
              <BulbFilled style={{ fontSize: '32px', color: '#ffffff' }} />
            </span>
          </NavLink>
        </li>
        <li className="navbarm__item">
          <NavLink to="/instructors" className={({ isActive }) => `navbarm__link ${isActive ? 'active' : ''}`}>
            <span className="navbarm__icon">
              <DatabaseFilled style={{ fontSize: '30px', color: '#ffffff' }} />
            </span>
          </NavLink>
        </li>
        <li className="navbarm__item">
          <NavLink to="/addmentorship" className={({ isActive }) => `navbarm__link ${isActive ? 'active' : ''}`}>
            <span className="navbarm__icon">
              <EditFilled style={{ fontSize: '30px', color: '#ffffff' }} />
            </span>
          </NavLink>
        </li>

        <li className="navbar__item">
          <span className="navbarm__icon logout" onClick={handleLogout}>
            <LogoutOutlined style={{ fontSize: '30px', color: '#ffffff' }} />
          </span>
        </li>
      </ul>
    </nav>
  );
};

export default NavbarMobile;
