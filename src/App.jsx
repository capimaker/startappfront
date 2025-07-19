
import { Routes, Route } from 'react-router-dom';

import './App.css'

import Header from './components/common/Layout/Header'
import Navbar from './components/common/Layout/Navbar'
import Footer from './components/common/Layout/Footer'
import ContactPage from './pages/ContactPage';
import Home from './pages/Home';
import InfoPage from './pages/InfoPage';


function App() {
  
  
 

  return (
    <>
      <Header style={{ paddingLeft: '230px' }} /> 
     <Navbar />
     <main style={{ paddingLeft: '260px' }} > 
         
         <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/info" element={<InfoPage />} />
       
      </Routes>
      </main>
     <Footer/>
    </>
  )
}

export default App
