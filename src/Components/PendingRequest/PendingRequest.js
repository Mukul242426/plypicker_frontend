import React, { useEffect,useState } from 'react'
import styles from './PendingRequest.module.css'
import axios from 'axios'
import {FRONTEND_URL} from '../../utils/utils'
import {useNavigate, useParams} from 'react-router-dom'
import toast from 'react-hot-toast'

export default function PendingRequest() {

    const navigate=useNavigate()

    const {id}=useParams();
    const [data,setData]=useState({})

    useEffect(()=>{
        const fetchData=async()=>{

            const jwttoken=JSON.parse(localStorage.getItem('token'))

            try{
                console.log(id)
                const response=await axios.get(`${FRONTEND_URL}/review/pending/request/${id}`,{
                    headers:{
                        "Content-Type":"application/json",
                        Authorization:`Bearer ${jwttoken}`
                    }
                })
                console.log(response)
                setData(response.data.requestInfo)
            }catch(error){
                console.log(error)
            }
        }
        fetchData()
    },[])

    const handleUpdated=async(status)=>{

        const jwttoken=JSON.parse(localStorage.getItem('token'))

        try{
            if(status==="approved"){
                const updatedResponse=await axios.put(`${FRONTEND_URL}/product/${data.suggestedChanges.id}`,data.suggestedChanges,{
                    headers:{
                        "Content-Type":"application/json",
                        Authorization:`Bearer ${jwttoken}`
                    }
                })
                console.log(updatedResponse)
            }
    
            const updatedStatus=await axios.patch(`${FRONTEND_URL}/review/status/${data._id}`,{status},{
                headers:{
                    "Content-Type":"application/json",
                    Authorization:`Bearer ${jwttoken}`
                }
            })
            console.log(updatedStatus)
            toast.success(updatedStatus.data.message)

            navigate(-1)

        }catch(error){
            console.log(error)
        }
    }

  return (
    <div className={styles.pending_req}>
      <h2>Review Request Details</h2>
      <p><strong>Team Member's Email:</strong> {data?.authorsMail}</p>
      <p><strong>Product Name:</strong> {data?.productName}</p>
      {/* Display suggested changes */}
      <div>
        <h3><strong>Suggested Changes :</strong></h3>
        {data?.suggestedChanges &&  Object.entries(data.suggestedChanges).map(([key,value], idx) => (
             key !== "id" && <li key={idx}><strong>{key}:</strong> {value}</li>
        ))}
      </div>
      <div className={styles.buttons}>
        <button className={styles.approve} onClick={()=>handleUpdated("approved")}>
          Approve
        </button>
        <button className={styles.reject} onClick={()=>handleUpdated("rejected")}>
          Reject
        </button>
      </div>
    </div>
  )
}
