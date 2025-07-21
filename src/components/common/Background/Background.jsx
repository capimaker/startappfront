import './Background.css';

const Background = ({ children }) => {
  return (
    <div className="background">
      <main>{children}</main>
    </div>
  );
};

export default Background;
