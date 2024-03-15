import { Routes,Route } from 'react-router-dom';
import './App.css';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login'
import { Toaster } from "react-hot-toast";



function App() {
  return (
    <>
    <Toaster/>
    <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login/>}/>
    </Routes>
    </>
  );
}

export default App;
