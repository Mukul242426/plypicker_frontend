import React, { useEffect, useState } from 'react'
import styles from './MySubmissions.module.css'
import axios from 'axios'
import { FRONTEND_URL } from '../../utils/utils';
import { useNavigate } from 'react-router-dom';

export default function MySubmissions() {

  const navigate=useNavigate()

  const [data,setData]=useState({});

  useEffect(()=>{
    const fetchData=async()=>{

      const jwttoken=JSON.parse(localStorage.getItem('token'))

      try{
        const response=await axios.get(`${FRONTEND_URL}/review`,{
          headers:{
            "Content-Type":"application/json",
            Authorization:`Bearer ${jwttoken}`
          }
        })
        console.log(response)
        setData(response.data)

      }catch(error){
        console.log(error)
      }
    }
    fetchData()
  },[])


  return (
    <div className={styles.analytics}>
      <div className={styles.analysis_box}>
        <div className={styles.title}>My Submissions</div>
        <table className={styles.analysis_table}>
          <thead>
            <tr className={styles.table_heading}>
              <th>Pending Requests</th>
              <th>Approved Requests</th>
              <th>Rejected Requests</th>
            </tr>
          </thead>
          <tbody>
            <tr className={styles.product_analysis}>
            <td>{data?.pending?.length ? data?.pending?.map((product,index)=>(<div key={index}>{product?.productName}</div>)):""}</td>
            <td>{data?.approved?.length ? data?.approved?.map((product,index)=>(<div key={index}>{product?.productName}</div>)):""}</td>
            <td>{data?.rejected?.length ? data?.rejected?.map((product,index)=>(<div key={index}>{product?.productName}</div>)):""}</td>
            </tr>
          </tbody>
        </table>
        {/* </div> */}
      </div>
    </div>
  )
}
