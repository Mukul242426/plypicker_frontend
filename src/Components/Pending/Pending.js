import React, { useEffect, useState } from "react";
import styles from "./Pending.module.css";
import axios from "axios";
import { FRONTEND_URL } from "../../utils/utils";
import { useNavigate } from "react-router-dom";

function Pending() {

  const navigate=useNavigate();

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const jwttoken = JSON.parse(localStorage.getItem("token"));

      try {
        const response = await axios.get(
          `${FRONTEND_URL}/review/pending/request`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${jwttoken}`,
            },
          }
        );
        console.log(response.data.pending);
        setData(response.data)
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className={styles.analytics}>
      <div className={styles.analysis_box}>
        <div className={styles.title}>Pending Requests</div>
        <table className={styles.analysis_table}>
          <thead>
            <tr className={styles.table_heading}>
              <th>Pending Requests</th>
              <th>Team Members email</th>
              <th>Product's Name</th>
              <th>Review Request</th>
            </tr>
          </thead>
          <tbody>
            {data?.pending?.map((ele, index) => (
              <tr key={ele._id} className={styles.product_analysis}>
                <td>{index + 1}</td>
                <td>{ele.authorsMail}</td>
                <td>{ele.productName}</td>
                <td>
                  <button className={styles.review} onClick={()=>navigate(`/pending-requests/${ele._id}`)}>Review</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Pending;
