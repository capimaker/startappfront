import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MentorshipSessionForm from './components/mentorship/MentorshipSessionForm';
import StartupGallery from './components/startups/StartupGallery';
//import { Header } from './components/common/Header/Header';
//import { Footer } from './components/common/Footer/Footer';
import InstructorsGallery from './components/instructors/InstructorsGallery';


const App = () => {
  return (
  <BrowserRouter> 
    {/*<Header/>*/}
      <Routes>
        
        <Route path="/agendarmentoria" element={<MentorshipSessionForm />} />
        <Route path="/startups" element={<StartupGallery />} />
        <Route path="/instructors" element={<InstructorsGallery />} />
        
      </Routes>
    {/*<Footer/>*/}
   </BrowserRouter>
  );
};

export default App;

