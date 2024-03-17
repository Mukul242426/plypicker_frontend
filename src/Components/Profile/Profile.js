import React, { useState ,useEffect} from 'react'
import styles from './Profile.module.css'
import axios from 'axios'
import { FRONTEND_URL } from '../../utils/utils'

export default function Profile() {

    const [data,setData]=useState({})

    useEffect(()=>{
      const fetchData=async()=>{

        const jwttoken=JSON.parse(localStorage.getItem('token'))

        try{
          const response=await axios.get(`${FRONTEND_URL}/review/profile`,{
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
            <td>{data?.pending && data?.pending}</td>
            <td>{data?.approved && data?.approved}</td>
            <td>{data?.rejected && data?.rejected}</td>
            </tr>
          </tbody>
        </table>
        {/* </div> */}
      </div>
    </div>
  )
}
