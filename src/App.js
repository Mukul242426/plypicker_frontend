import { Routes,Route } from 'react-router-dom';
import './App.css';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login'
import { Toaster } from "react-hot-toast";
import Dashboard from './Components/Dashboard/Dashboard';
import { useEffect, useState } from 'react';
import {UserContext} from './contexts/UserContext'
import ProductDetails from './Components/ProductDetails/ProductDetails';
import EditProduct from './Components/EditProduct/EditProduct';
import MySubmissions from './Components/MySubmissions/MySubmissions';
import Profile from './Components/Profile/Profile'
import Pending from './Components/Pending/Pending';

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
    <Route path="/edit/product/:id" element={<EditProduct/>}/>
    <Route path="/profile" element={<Profile/>}/>
    <Route path="/profile/my-submissions" element={<MySubmissions/>}/>
    <Route path="/pending-requests" element={<Pending/>}/>
    </Routes>
    </UserContext.Provider>
    </>
  );
}

export default App;
