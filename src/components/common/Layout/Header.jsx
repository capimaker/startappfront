import React from 'react';
import './Header.scss'; 
import logo from '../../../assets/icons/logo.JPG'; 




function Header() {
  return (

 <header className="header">
     
      

     
         <div className="logo-brand" title="Logo">
        <img src={logo} alt="Logo Startup" className="logo-icon" />
       
      </div>
      <a href="/login" className="login-link">
        LOGIN
      </a>
    </header>
  );
}

export default Header;