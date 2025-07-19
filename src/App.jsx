import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import MentorshipSessionForm from './components/mentorship/MentorshipSessionForm';

const App = () => {
  return (
   // <BrowserRouter> 
     <Router>
      <Routes>
        <Route path="/crearsesion" element={<MentorshipSessionForm />} />
      </Routes>
    </Router>
   // </BrowserRouter>
  );
};

export default App;

