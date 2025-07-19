import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MentorshipSessionForm from './components/mentorship/MentorshipSessionForm';
//import { Header } from './components/common/Header/Header';
//import { Footer } from './components/common/Footer/Footer';


const App = () => {
  return (
  <BrowserRouter> 
    {/*<Header/>*/}
      <Routes>
        
        <Route path="/agendarmentoria" element={<MentorshipSessionForm />} />
        
      </Routes>
    {/*<Footer/>*/}
   </BrowserRouter>
  );
};

export default App;

