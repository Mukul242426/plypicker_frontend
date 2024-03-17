import React, { useState } from 'react'
import styles from './Profile.module.css'
import axios from 'axios'
import { FRONTEND_URL } from '../../utils/utils'

export default function Profile() {

    const [data,setData]=useState({})

    useEffect(()=>{
      const fetchData=async()=>{
        const response=await axios.get(`${FRONTEND_URL}/review/profile`,{
          header:{
            "Content-Type":"application/json",
            Authorization:`Bearer ${jwttoken}`
          }
        })
      }
    },[])

  return (
    <div className={styles.analytics}>
      <div className={styles.analysis_box}>
        <div className={styles.title}>Analytics</div>
        <table className={styles.analysis_table}>
          <thead>
            <tr className={styles.table_heading}>
              <th>No. Pending Requests</th>
              <th>No. Approved Requests</th>
              <th>No. Rejected Requests</th>
            </tr>
          </thead>
          <tbody>
            <tr className={styles.product_analysis}>
            <td>{data?.pending?.length ? data?.pending:0}</td>
            <td>{data?.approved?.length ? data?.approved:0}</td>
            <td>{data?.rejected?.length ? data?.rejected:0}</td>
            </tr>
          </tbody>
        </table>
        {/* </div> */}
      </div>
    </div>
  )
}
