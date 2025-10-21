import './App.css';
// 1. Keep the necessary imports
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Note: Should be 'react-router-dom'
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';

function App() {
  return (
    // 2. Wrap the entire application content with <BrowserRouter>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route index element={<Home />} />
        <Route path='/about' element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
