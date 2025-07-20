import LogoAV from '../../../assets/logosCorporativos/LogoAV.png';
import LogoSV from '../../../assets/logosCorporativos/LogoSV.png';
import LogoVIC from '../../../assets/logosCorporativos/LogoVIC.png';
import logoApp from '../../../assets/logoApp.png';
import './header.css';

export const Header = () => {
  return (
    <header className="header__container">
      <div className="header__title-container">
        <img className="header__title-logo" src={logoApp}></img>
        <h1 className="header__title">Seed Startup Program</h1>
      </div>

      <div className="header__logos-container">
        <img className="header__logos" src={LogoAV}></img>
        <img className="header__logos" src={LogoSV}></img>
        <img className="header__logos" src={LogoVIC}></img>
      </div>
    </header>
  );
};
