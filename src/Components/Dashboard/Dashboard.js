import React, { useContext, useEffect, useState } from "react";
import Header from "../Header/Header";
import styles from "./Dashboard.module.css";
import axios from "axios";
import { FRONTEND_URL } from "../../utils/utils";
import { UserContext } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import Card from "../Card/Card";

function Dashboard() {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const { isLoggedIn, setIsLoggedIn } = useContext(UserContext);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("token"))) {
      setIsLoggedIn(true);
    } else {
      navigate("/login");
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const fetchData = async () => {
      const jwttoken = JSON.parse(localStorage.getItem("token"));

      try {
        const response = await axios.get(`${FRONTEND_URL}/product`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwttoken}`,
          },
        });
        console.log(response);
        setData(response.data.products);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className={styles.dashboard}>
        <div className={styles.upper_box}>
          <Header />
        </div>
        <div className={styles.lower_box}>
          {data?.length>0 && data.map((product, index) => (
            <Card
              key={product.id}
              department={product.department}
              productName={product.productName}
              price={product.price}
              productDescription={product.productDescription}
              image={product.image}
              id={product._id}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
