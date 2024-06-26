import React, { useState } from 'react'
import './Booked.css'
import { BE_URL, userId, userName,token } from '../../info/url';
import axios from 'axios';
const SlotBook = () => {
  const [examDetails,setExamDetails] = useState(
    {
      date:'',
      time:'08.00 AM',
      examtype:'CIA',
      name:userName,
      username:userId,
      examlocation:'EEE LH01'
    }
  );

  const inputHandler = (e) => {
    setExamDetails(prev=>({...prev, [e.target.id] : e.target.value }))
  }
  const formSubmitHandler = async(e)  => {
    e.preventDefault();
    console.table(examDetails)
    try{
      const response = await axios.post(`${BE_URL}/booking`,examDetails,
      {
        withCredentials: true,
        headers: {
          Authorization: `${token}`
        }
      })
      console.table(response.data);
      alert("Solt Booked")
    }
    catch(err){
      alert("Maximum slot reached per day");
      console.table(err)
    }


  }
  return (
    
    <div className='slotbook-container'>
      {(token && (<div>
         <div className='slotbook-container-item'>
            <form onSubmit={formSubmitHandler}>
               <div >
                <div className='label'>Exam Date</div>
                   <input
                     id='date'
                     type='date'
                     placeholder='Username'
                     required
                     className='input'
                     onChange={inputHandler}
                     />
               </div>
               
               <div>
                <div className='label'>Exam Time</div>
                <select className='input' onChange={inputHandler} id='time'> 
                  
                  <option>08.00 AM</option>
                  <option>09.00 AM</option>
                  <option>10.00 AM</option>
                  <option>11.00 AM</option>
                  <option>12.00 PM</option>
                  <option>01.00 PM</option>
                  <option>02.00 PM</option>
                  <option>03.00 PM</option>
                  <option>04.00 PM</option>
                  <option>05.00 PM</option>
                </select>
                  {/* <input
                     id='time'
                     type='text'
                     placeholder='Ex:08:00'
                     required
                     className='input'
                     pattern="([1]?[0-9]|2[0-3]):[0][0]"
                     onChange={inputHandler}
                  /> */}
               </div>
               
               <div>
                <div className='label'>Exam Type</div>
                <select id='examtype' onChange={inputHandler} className='input'>
                  <option value='CIA'>CIA</option>
                  <option value='Module'>Module</option>
                </select>
                 
               </div>
               <div>
               <div className='label'>Location</div>
                <select id='examlocation' onChange={inputHandler} className='input'>
                  <option value='EEE LH01'>EEE LH01</option>
                  <option value='CSE 4F LH01'>CSE 4F LH01</option>
                  <option value='CSE 4F LH02'>CSE 4F LH02</option>
                </select>
               </div>
               <div>
                  <button className='btn btn-login btn-login-book' type='submit'>Book</button>
               </div>
            </form>
         </div>
         </div>)) || (<div style={{fontSize:"29px"}}>Login First....</div>)}
      </div>
  )
}

export default SlotBook