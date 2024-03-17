import React from 'react'
import styles from './Card.module.css'
import { useNavigate } from 'react-router-dom'

function Card({department,productName,price,productDescription,image,id}) {

    const navigate=useNavigate()

  return (
    <div className={styles.card} onClick={()=>navigate(`/product/${id}`)}>
      <img src={image} alt={productName} />
      <div className={styles.card_content}>
        <h3>{productName}</h3>
        <p className={styles.price}>${price}</p>
        <p className={styles.description}>{productDescription}</p>
        <p className={styles.department}>Department: {department}</p>
      </div>
    </div>
  )
}

export default Card
