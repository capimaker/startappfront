import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from './components/common/Layout/AppLayout';
import MentorshipSessionForm from './components/mentorship/MentorshipSessionForm';
import StartupList from './features/startups/StartupList';
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
          <Route
            path="/startups"
            element={
              <AppLayout>
                <StartupList />
              </AppLayout>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
