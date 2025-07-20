import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RocketFilled, DatabaseFilled, BulbFilled, EditFilled, HomeFilled } from '@ant-design/icons';
import './NavbarMobile.css';

const NavbarMobile = () => {
  /* const { user } = useSelector((state) => state.auth); */

  return (
    <nav className="navbar__mobile">
      <ul className="navbarm__list">
        {/* <li className="navbarm__userItem">
          <img className="navbarm__user-img" src={user.image} />
        </li> */}

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
      </ul>
    </nav>
  );
};

export default NavbarMobile;
