import './App.css';
// 1. Keep the necessary imports
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Note: Should be 'react-router-dom'
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import { useState } from 'react';

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };
  return (
    // 2. Wrap the entire application content with <BrowserRouter>
    <NoteState>
      <div className='container'>
        <BrowserRouter>
          <Navbar />
          <div className='p-3 mt-5'>
            <Alert alert={alert} />
            <Routes>
              <Route index element={<Home showAlert={showAlert} />} />
              <Route path='/about' element={<About />} />
              <Route path='/login' element={<Login showAlert={showAlert} />} />
              <Route
                path='/signup'
                element={<Signup showAlert={showAlert} />}
              />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </NoteState>
  );
}

export default App;
