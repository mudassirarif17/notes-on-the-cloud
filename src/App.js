import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from "react-router-dom";

import Navbar from './components/Navbar';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import About from './components/About';

function App() {
  return (
    <>
    <Navbar/>
    <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/signup" element={<Signup />}/>
    <Route path="/signin" element={<Login/>} />
    <Route path="/about" element={<About/>} />
    </Routes>
    </>
  );
}

export default App;
