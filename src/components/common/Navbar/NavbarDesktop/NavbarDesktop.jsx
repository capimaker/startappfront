import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './navbarDesktop.css';
import { EditFilled, RobotFilled, SecurityScanFilled, WechatFilled } from '@ant-design/icons';

const NavbarDesktop = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <nav className="navbar__desktop">
      <ul className="navbar__list">
        <li className="navbar__userItem">
          <img className="navbar__user-img" src={user.image} />
          <span className="navbar__text">{user.username}</span>
        </li>

        <li className="navbar__item">
          <NavLink to="/dashboard" className={({ isActive }) => `navbar__link ${isActive ? 'active' : ''}`}>
            <span className="navbar__icon">
              <WechatFilled style={{ fontSize: '32px', color: '#00a1e0' }} />
            </span>
            <span className="navbar__text">StartUps</span>
          </NavLink>
        </li>

        <li className="navbar__item">
          <NavLink to="/search" className={({ isActive }) => `navbar__link ${isActive ? 'active' : ''}`}>
            <span className="navbar__icon">
              <SecurityScanFilled style={{ fontSize: '32px', color: '#00a1e0' }} />
            </span>
            <span className="navbar__text">Mentores</span>
          </NavLink>
        </li>

        <li className="navbar__item">
          <NavLink to="/profile" className={({ isActive }) => `navbar__link ${isActive ? 'active' : ''}`}>
            <span className="navbar__icon">
              <RobotFilled style={{ fontSize: '30px', color: '#00a1e0' }} />
            </span>
            <span className="navbar__text">Formadores</span>
          </NavLink>
        </li>

        <li className="navbar__item">
          <NavLink to="/newpost" className={({ isActive }) => `navbar__link ${isActive ? 'active' : ''}`}>
            <span className="navbar__icon">
              <EditFilled style={{ fontSize: '30px', color: '#00a1e0' }} />
            </span>
            <span className="navbar__text">+ Mentoría</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavbarDesktop;
