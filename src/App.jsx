import { BrowserRouter } from 'react-router-dom';
import './App.css';
import AppLayout from './components/common/Layout/AppLayout';
import Login from "./components/Login/Login";

function App() {
  return (
    <>
      <BrowserRouter>
        <AppLayout />
        <Routes>
        <Route path="/" element={<Login/>} />
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
