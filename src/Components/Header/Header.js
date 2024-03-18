import React, { useContext,useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from './Header.module.css'
import { UserContext } from "../../contexts/UserContext";
import toast from 'react-hot-toast';


function Header() {

  const navigate = useNavigate();
  const {isLoggedIn,setIsLoggedIn}=useContext(UserContext)
  const [role,setRole]=useState('')

  useEffect(()=>{
    if(localStorage.getItem('token')){
      setRole(JSON.parse(localStorage.getItem('role')))
    }
    else
    {
      setRole('')
      navigate('/')
    }
  },[isLoggedIn])

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false)
    toast.success("Logged Out Successfully")
  };

  return (
    <div className={styles.header}>
      <div className={styles.shopify} onClick={()=>navigate('/')}>Shopify</div>
      <div className={styles.buttons} style={{display:isLoggedIn?'none':'flex'}}>
        <button className={styles.login_button} onClick={() => navigate("/login")}>
          Login
        </button>
        <button
          className={styles.register_button}
          onClick={() => navigate("/register")}
        >
          Register
        </button>
      </div>
      {/* <div className='buttons'style={{display:session?'flex':'none'}}> */}
      <div className={styles.buttons} style={{display:isLoggedIn?'flex':'none'}}>
        <div className={styles.pending_reviews} style={{display:role==="team member"?'flex':'none'}} onClick={()=>navigate('/profile/my-submissions')}>My Submissions</div>
        <div className={styles.pending_reviews} style={{display:role==="admin"?'flex':'none'}} onClick={()=>navigate('/pending-requests')}>Requests</div>
        <div className={styles.profile} onClick={()=>navigate("/profile")}>My Profile</div>
        <div className={styles.logout_button} onClick={handleLogout}>
          Logout
        </div>
      </div>
    </div>
  );
}

export default Header;