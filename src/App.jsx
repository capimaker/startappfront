
import { Routes, Route } from 'react-router-dom';

import './App.css'

import Header from './components/common/Layout/Header'
import Navbar from './components/common/Layout/Navbar'
import Footer from './components/common/Layout/Footer'
import Home from './pages/Home';


function App() {
  
  
 

  return (
    <>
      <Header style={{ paddingLeft: '230px' }} /> 
     <Navbar />
     <main style={{ paddingLeft: '260px' }} > 
         
         <Routes>
        <Route path="/" element={<Home />} />
       
      </Routes>
      </main>
     <Footer/>
    </>
  )
}

export default App
