import { BrowserRouter } from 'react-router-dom';
import './App.css';
import AppLayout from './components/common/Layout/AppLayout';

function App() {
  return (
    <>
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </>
  );
}

export default App;
