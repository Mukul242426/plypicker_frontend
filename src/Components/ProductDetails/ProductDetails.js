import React, { useState,useEffect } from "react";
import styles from "./ProductDetails.module.css";
import Header from "../Header/Header";
import {FRONTEND_URL} from '../../utils/utils'
import axios from 'axios'
import { useParams } from "react-router-dom";

function ProductDetails() {

    const {id}=useParams()

   const [data,setData]=useState({});

   useEffect(()=>{
    const fetchData=async()=>{
  
        const jwttoken = JSON.parse(localStorage.getItem("token"));

        try{
            const response=await axios.get(`${FRONTEND_URL}/product/${id}`,{
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${jwttoken}`,
                }})
            console.log(response)
            setData(response.data.product)

        }catch(error){
            console.log(error)

        }
    }
    fetchData()
   },[])

  return (
    <div className={styles.product}>
      <div className={styles.container_1}>
        <Header />
      </div>
      <div className={styles.container_2}>
        <div className={styles.product_details_container}>
          <div className={styles.product_image}>
            <img src={data.image} alt={data.productName} />
          </div>
          <div className={styles.product_info}>
            <h1 className={styles.product_name}>{data.productName}</h1>
            <p className={styles.price}>${data.price}</p>
            <p className={styles.product_description}>{data.productDescription}</p>
            <p className={styles.department}>Department: {data.department}</p>
            <button className={styles.edit_button}>Edit Product</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
