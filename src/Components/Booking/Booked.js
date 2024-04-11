import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { BE_URL, token, userId, userRole } from '../../info/url';
import './Booked.css'
const Booked = () => {
  const [booked, setBooked] = useState([]);
  const [allBooked, setAllBooked] = useState([]);

  async function getAllBooked() {
    if (userRole === 'admin' && userRole) {
      const response = await axios.get(`${BE_URL}/booking`, {
        withCredentials: true,
        headers: {
          Authorization: `${token}`
        }
      });
      setBooked(response.data.data);
      setAllBooked(response.data.data);
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
      setAllBooked(response.data.data);
      
    }


  }
  useEffect(() => {
    getAllBooked();
    
  }, []);

  const filterHandler = (e) => {
    
    const filterData =  allBooked.filter((data) => data.date === e.target.value);
    console.table(booked)
    setBooked(filterData)
  }

  const approveHandler = async(id,status) => {
    console.table(id,status)
    try{
    const response = await axios.put(`${BE_URL}/booking/${id}`,{examstatus:status},
  {
    headers:{
      Authorization:`${token}`
    }
  }
  )
  console.table(response.data);
  getAllBooked()
    }
    catch(error){
      alert(error);
    }
  }
  return (
    <div>
      <div style={{
        margin: "10px"
      }}>Filter
        <input type='date'
          style={{
            padding: "10px",
            marginLeft: "10px",
          }}
          onChange={filterHandler}
        >
        </input>
        <button className='btn btn-login'
          onClick={() => getAllBooked()}
        >
          Clear Filter
        </button>
      </div>
      <div className='booked-container'>

        {
          (userId &&
            booked.map((data, index) => (
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
                {(userRole === "admin" && <div>
                  <button className='btn' onClick={() => approveHandler(data._id, 'Approved')}>✔️</button>
                  <button className='btn' onClick={() => approveHandler(data._id, 'Rejected')}>❌</button>
                </div>)}

              </div>)))


        }


      </div>
    </div>
  )
}

export default Booked