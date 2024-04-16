import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { BE_URL, token, userId, userRole } from '../../info/url';
import { useNavigate } from 'react-router-dom'
import './Booked.css'
// import StatusBook from './StatusBook';
// import { MdPendingActions } from "react-icons/md";
const Booked = () => {
  const [booked, setBooked] = useState([]);
  const [allBooked, setAllBooked] = useState([]);
  const [allStatus, setAllStatus] = useState([]);
  const [addAllStatus,setAddAllStatus] = useState([]);
  
  const navigate = useNavigate()
  async function getAllBooked() {
    try {
      if (userRole === 'admin' && userRole) {
        const response = await axios.get(`${BE_URL}/booking`, {
          withCredentials: true,
          headers: {
            Authorization: `${token}`
          }
        });
        setBooked( response.data.data);
        setAllBooked(response.data.data);
        setAllStatus(response.data.data);
        // console.log(response.data.data);
        
      }
      else if (userRole === 'user' && userRole) {
        const response = await axios.get(`${BE_URL}/booking/${userId}`, {
          withCredentials: true,
          headers: {
            Authorization: `${token}`
          }
        });
        // console.table(response.data.data);
        setBooked(response.data.data);
        setAllBooked(response.data.data);
        setAllStatus(response.data.data);
       

      }
    }
    catch (err) {
      localStorage.clear();
      // alert("Please logout and then login")
      navigate('/login')
    }


  }
  useEffect(() => {
    getAllBooked();

  }, []);

  const filterHandler = (e) => {

    const filterData = allBooked.filter((data) => data.date === e.target.value);
    // console.table(booked)
    setBooked(filterData)
    setAllStatus(filterData);
  }

  const statusFilterHandler = (e) => {


    const filterData = allStatus.filter((data) => data.examstatus === e.target.value);
    // console.table(booked)
    setBooked(filterData)
  }

  const approveHandler = async (id, status) => {
    // console.table(id, status)
    try {
      const response = await axios.put(`${BE_URL}/booking/${id}`, { examstatus: status },
        {
          headers: {
            Authorization: `${token}`
          }
        }
      )
      // console.table(response.data);
      getAllBooked()
      // statusFilterHandler('','Approved');
    }
    catch (error) {
      alert(error);
    }
  }

  const deleteHandler = async (id) => {
    const response = await axios.delete(`${BE_URL}/booking/${id}`, {
      headers: {
        Authorization: token
      }
    })
    getAllBooked();
  }
  const statusInputHandler = (e) => {
    let userInputStatus = {
      id:e.target.id,
      status:e.target.value,
    }
    // console.log(userInputStatus)

    setAddAllStatus(prevStatus => [...prevStatus, userInputStatus]);
    
    
  }
const UpdateStatusOfSelecetedBook = async() =>{
  
  
  const uniqueIds = new Set()
  const filteredData = addAllStatus.reverse().filter(obj => {
    if (obj.id && !uniqueIds.has(obj.id)) {
      uniqueIds.add(obj.id);
      return true;
    }
    return false;
  }).reverse();
  // console.log(filteredData)

  const response = axios.put(`${BE_URL}/booking/exam-status`,{filteredData}).then((response)=> {
    alert(response.data.data)
    getAllBooked();
    
  })
  
  

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
          style={{
            cursor: 'pointer',
            margin: '10px'
          }}
          onClick={() => getAllBooked()}
        >
          Clear Filter
        </button>

        <select onChange={statusFilterHandler} className='btn'
          style={{
            textAlign: 'center',
            margin: '10px',
            cursor: 'pointer'
          }}
        >
          <option>Status</option>
          <option>Approved</option>
          <option>Rejected</option>
          <option>pending</option>
        </select>
        <h4
          style={{
            display: 'inline'
          }}
        >Count:{!booked?'0':booked.length}</h4>
      </div>
      <div className='booked-container'>

        {
          (userId &&booked &&
            booked.map((data, index) => (
              <div key={index} className='booked-container-item'>
                <div>
                  <h3> {data.name} {data.username}</h3>
                </div>
                <div>
                  <p>Time : {`${data.time}`}</p>
                </div>
                <div>
                  <p>Date : {`${data.date}`}</p>
                </div>
                <div>
                  <p>Status : {data.examstatus}</p>
                </div>
                <div>
                  <p>Exam type : {data.examtype}</p>
                </div>
                <div>
                  <p>Location : {data.examlocation}</p>
                </div>
                {(userRole === "admin" && <div>
                  {/* <StatusBook name={data}/> */}
                 
                  <input type='radio' name={data._id} id={data._id} value='Approved' className='status' onChange={statusInputHandler}/>✔️
                  <input type='radio' name={data._id} id={data._id} value='Rejected' className='status' onChange={statusInputHandler}/>❌
                  <input type='radio' name={data._id} id={data._id} value='Pending' className='status' onChange={statusInputHandler}/>⏳
                  <input type='radio' name={data._id}  value='ne' className='status' onChange={statusInputHandler}/>NE
                  {/* <button className='btn' onClick={() => approveHandler(data._id, 'Approved')}>✔️</button> */}
                  {/* <button className='btn' onClick={() => approveHandler(data._id, 'Rejected')}>❌</button> */}

                </div>)}
                <button className='btn' onClick={() => deleteHandler(data._id)}>Delete</button>
              </div>)))


        }

        
      </div>
      <button onClick={UpdateStatusOfSelecetedBook} className='btn btn-login-1 btn-login' style={{
        margin:"20px 0px 20px 0px",
        padding:"10px",

      }}>check</button>
    </div>
  )
}

export default Booked