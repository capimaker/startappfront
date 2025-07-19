import LogoAV from '../../../assets/logosCorporativos/LogoAV.png';
import LogoSV from '../../../assets/logosCorporativos/LogoSV.png';
import LogoVIC from '../../../assets/logosCorporativos/LogoVIC.png';
import './header.css';

export const Header = () => {
  return (
    <header className="header__container">
      <div className="header__logo-container">
        <img className="header__logo" src={LogoAV}></img>
        <img className="header__logo" src={LogoSV}></img>
        <img className="header__logo" src={LogoVIC}></img>
      </div>

      <h1 className="header__title">Seed Startup Program</h1>
    </header>
  );
};
