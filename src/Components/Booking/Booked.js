import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { BE_URL, token, userId, userRole } from '../../info/url';
import './Booked.css'
const Booked = () => {
  const [booked, setBooked] = useState([]);

  
  async function getAllBooked() {
    if (userRole === 'admin' && userRole) {
      const response = await axios.get(`${BE_URL}/booking`, {
        withCredentials: true,
        headers: {
          Authorization: `${token}`
        }
      });
      setBooked(response.data.data);
      console.table(response.data.data);
    }
    else if (userRole === 'user' && userRole) {
      const response = await axios.get(`${BE_URL}/booking/${userId}`, {
        withCredentials: true,
        headers: {
          Authorization: `${token}`
        }
      });
      console.table(response.data.data);
      setBooked(response.data.data);
    }
    

  }
  useEffect(() => {
    getAllBooked();
  }, []);

  return (
    <div className='booked-container'>

      {
      (userId &&
        booked.map((data,index) => (
        <div key={index} className='booked-container-item'>
          <div>
          <h3> {data.name} {data.username}</h3>
        </div>
        <div>
          <p>Time : {`${data.time} ,Date : ${data.date}`}</p>
        </div>
        <div>
          <p>Status : {data.examstatus}</p>
        </div>
        <div>
          <p>Exam type : {data.examtype}</p>
        </div>
        </div>))) 
      
      }
      
      
    </div>
  )
}

export default Booked