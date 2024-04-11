import React, { useState } from 'react'
import { BE_URL } from '../../info/url'
import axios from 'axios'
import {useNavigate} from 'react-router-dom' 
import './Login.css'
const Login = () => {
   const navigate = useNavigate();
   const [userData, setUserData] = useState({
      username: '',
      password: ''
   });
   const inputHandler = (event) => {
      setUserData(prev => ({ ...prev, [event.target.id]: event.target.value }))
   }
   const formSubmitHandler = async(e) => {
      e.preventDefault();
     
      try{
         const response = await axios.post(`${BE_URL}/auth/login/`,userData,{
            withCredentials: true,
         
         })
         console.table(response)
         localStorage.setItem('token',response.data.token);
         localStorage.setItem('username',response.data.data.username);
         localStorage.setItem('role',response.data.role)
         localStorage.setItem('name',response.data.data.name)
         
         navigate('/home')
         navigate(0)
      }
      catch(error){
         alert(error)
      }
   }
   return (
      <div className='auth-container'>
         <div>
            <form onSubmit={formSubmitHandler}>
               <div className=''>
                  <input
                     id='username'
                     type='text'
                     placeholder='Username'
                     required
                     className='input' 
                     onChange={inputHandler}
                     />
               </div>
               <div>
                  <input
                     id='password'
                     type='text'
                     placeholder='Password'
                     required
                     className='input'
                     onChange={inputHandler}
                  />
               </div>
               <div>
                  <button className='btn btn-login btn-login-1' type='submit'>Login</button>
               </div>
            </form>
         </div>
      </div>
   )
}

export default Login