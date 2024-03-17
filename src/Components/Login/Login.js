import React,{useContext, useState} from 'react'
import styles from './Login.module.css'
import image from '../../assets/image1.png'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FRONTEND_URL } from '../../utils/utils';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { UserContext } from '../../contexts/UserContext';

function Login() {

  const navigate=useNavigate()
  const {setIsLoggedIn}=useContext(UserContext)

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role:"team member"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
        ...formData,
        [name]:value
    })
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${FRONTEND_URL}/login`, formData);
      localStorage.setItem("token", JSON.stringify(response.data.jwtToken));
      localStorage.setItem("role",JSON.stringify(response.data.role))
      setIsLoggedIn(true)
      toast.success(response.data.message);
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.error.message);
    }    
    console.log(formData)

  };

  return (
    <div className={styles.login_page}>
      <div className={styles.left}>
        <div className={styles.heading}>
          <div className={styles.title_1}>Login to your account</div>
        </div>
        <form className={styles.login}>
          <div className={styles.loginBox}>
            <input
              type="email"
              name="email"
              required
              className={styles.form_input}
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
            />
          </div>
          <div className={styles.registerBox}>
            <input
              type="password"
              name="password"
              className={styles.form_input}
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
            />
          </div>
          <div className={styles.option_box}>
          {["team member", "admin"].map((value, index) => (
          <div key={index} className={styles.option_type}>
            <input
              type="radio"
              className={styles.radio_btn}
              value={value}
              checked={
               formData.role===value
              }
              onChange={()=>setFormData({...formData,role:value})}
            />
            <div>{value.charAt(0).toUpperCase() + value.slice(1)}</div>
          </div>
        ))}
          </div>
          <div className={styles.box_1}>
            <div className={styles.buttonBox}>
              <button className={styles.create_btn} onClick={handleSubmit}>
                Login
              </button>
            </div>
            <div className={styles.txt_msg}>
              <span className={styles.message}>Don't have an account?</span>{" "}
              <Link to="/register" className={styles.link}>
               Register
              </Link>
            </div>
          </div>
        </form>
      </div>
      <div className={styles.right}>
        {/* <div className={styles.randomText}>Your Personal Job Finder</div> */}
        <img src={image} className={styles.default} alt="default" />
      </div>
    </div>
      
  );
}

export default Login
