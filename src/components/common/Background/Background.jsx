import backgroundImage from '../../../assets/background.png';
import './Background.css';

const Background = ({ children }) => {
  return (
    <div className="background" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <main>{children}</main>
    </div>
  );
};

export default Background;
