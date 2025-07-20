import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from './components/common/Layout/AppLayout';
import MentorshipSessionForm from './components/mentorship/MentorshipSessionForm';
import './App.css';

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
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
