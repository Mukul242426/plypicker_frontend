import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styles from './Header.module.css'
import { UserContext } from "../../contexts/UserContext";
import toast from 'react-hot-toast';


function Header() {

  const navigate = useNavigate();
  const {isLoggedIn,setIsLoggedIn}=useContext(UserContext)

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
        <div className={styles.logout_button} onClick={handleLogout}>
          Logout
        </div>
        <div className={styles.profile} onClick={()=>navigate("/profile")}>My Profile</div>
      </div>
    </div>
  );
}

export default Header;