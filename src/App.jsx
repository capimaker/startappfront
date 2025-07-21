import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from './components/common/Layout/AppLayout';
import MentorshipSessionForm from './components/mentorship/MentorshipSessionForm';
import './App.css';
import InfoPage from './pages/InfoPage';
import ContactPage from './pages/ContactPage';
import FloatingChatbot from './components/common/FloatingChatbot/FloatingChatbot'; 

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/addmentorship"
            element={
              <AppLayout>
                <MentorshipSessionForm />
              </AppLayout>
            }
            
          />
           <Route path="/info" element={<AppLayout><InfoPage /></AppLayout>} />
           <Route path="/contact" element={<ContactPage />} />
           
        </Routes>
        <FloatingChatbot />
      </BrowserRouter>
    </>
  );
}

export default App;
