import React, { useEffect, useState } from 'react'
import styles from './EditProduct.module.css'
import { useNavigate, useParams } from 'react-router-dom'
import image from '../../assets/image1.png'
import axios from 'axios'
import {FRONTEND_URL} from '../../utils/utils'

function EditProduct() {

    const navigate=useNavigate();

    const {id}=useParams();

    const [formData,setFormData]=useState({
        productName:"",
        department:"",
        price:"",
        productDescription:"",
        image:""
    })

    useEffect(()=>{
        const fetchData=async()=>{
            const jwttoken = JSON.parse(localStorage.getItem("token"));
            try{
                const response=await axios.get(`${FRONTEND_URL}/product/${id}`,{
                    headers:{
                        "Content-Type":"application/json",
                        Authorization:`Bearer ${jwttoken}`
                    }
                })
                console.log(response)
                setFormData(response.data.product)
            }catch(error){
                console.log(error)
            }
        }
        fetchData();
    },[])

    const handleChange=()=>{

    }

    const handleClick=()=>{

    }

  return (
    <div className={styles.edit_product}>
    <div className={styles.edit_side}>
      <div className={styles.container_heading}>Edit Product</div>
      <div className={styles.input_container}>
        <div className={styles.field_title}>Product Name</div>
        <input
          type="text"
          name="productName"
          value={formData.productName}
          onChange={handleChange}
          className={styles.data_field}
          placeholder="Edit Product Name Here"
        />
      </div>
      <div className={styles.input_container}>
        <div className={styles.field_title}>Product Image Url</div>
        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
          className={styles.data_field}
          placeholder="Edit the link"
        />
      </div>
      <div className={styles.input_container}>
        <div className={styles.field_title}>Price</div>
        <input
          type="text"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className={styles.data_field}
          placeholder="Edit price"
        />
      </div>
      <div className={styles.input_container}>
        <div className={styles.field_title}>Department</div>
        <input
          type="text"
          name="department"
          value={formData.department}
          onChange={handleChange}
          className={styles.data_field}
          placeholder="Edit Department"
        />
      </div>
      <div className={styles.input_container}>
        <div className={styles.product_desc}>Product Description</div>
        <textarea
          name="productDescription"
          value={formData.productDescription}
          onChange={handleChange}
          className={styles.text_area}
          rows={5}
          placeholder="Edit Product Description"
        />
      </div>
      <div className={styles.edit_cancel_button}>
          <button className={styles.cancel_opt} onClick={() => navigate(-1)}>
            Cancel
          </button>
          <button className={styles.edit_opt} onClick={handleClick}>
            Edit Product
          </button>
        </div>
    </div>
    <div className={styles.image_side}>
      <img src={image} alt="edit_product" className={styles.product_image}/>
    </div>
  </div>
  )
}

export default EditProduct
