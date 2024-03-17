import React, { useState } from "react";
import styles from "./ProductDetails.module.css";
import Header from "../Header/Header";

function ProductDetails() {

   const [data,setData]=useState({});

  return (
    <div className={styles.product}>
      <div className={styles.container_1}>
        <Header />
      </div>
      <div className={styles.container_2}>
        <div className={styles.product_details_container}>
          <div className={styles.product_image}>
            <img src={image} alt={productName} />
          </div>
          <div className={styles.product_info}>
            <h1 className={styles.product_name}>{productName}</h1>
            <p className={styles.price}>${price}</p>
            <p className={styles.product_description}>{productDescription}</p>
            <p className={styles.department}>Department: {department}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
