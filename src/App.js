import { Routes,Route } from 'react-router-dom';
import './App.css';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login'
import { Toaster } from "react-hot-toast";
import Dashboard from './Components/Dashboard/Dashboard';
import { useEffect, useState } from 'react';
import {UserContext} from './contexts/UserContext'
import ProductDetails from './Components/ProductDetails/ProductDetails';


function App() {

  const [isLoggedIn,setIsLoggedIn]=useState(false)

  useEffect(()=>{
    if(localStorage.getItem("token")){
      setIsLoggedIn(true)
    }

  },[])

  return (
    <>
    <Toaster/>
    <UserContext.Provider value={{isLoggedIn,setIsLoggedIn}}>
    <Routes>
    <Route path="/" element={<Dashboard/>}/>
    <Route path="/register" element={<Register />} />
    <Route path="/login" element={<Login/>}/>
    <Route path="/product/:id" element={<ProductDetails/>}/>
    </Routes>
    </UserContext.Provider>
    </>
  );
}

export default App;
