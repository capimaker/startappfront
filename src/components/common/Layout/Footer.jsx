
import './Footer.scss'; 
const Footer = () => {
  return (
      <footer className="footer">
      <div className="footer-content">
        <p className="footer-main-text">
          Ajuntament de València | Valencia Innovation Capital | Startup Valencia
        </p>
        <a href="/contact" className="footer-contact-link">
          Contáctanos
        </a>
        <p className="footer-address">
          Sala de Formación, Piso 2, La Harinera (C/ de Joan Verdeguer, 116, Poblats Marítims, 46024 Valencia)
        </p>
      </div>
    </footer>
  );
}
  


export default Footer