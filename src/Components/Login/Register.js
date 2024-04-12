import React,{useState} from 'react'
import './Login.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { BE_URL, } from '../../info/url';
const Register = () => {
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
        const response = await axios.post(`${BE_URL}/auth/register/`,userData,{
           withCredentials: true,
        
        })
        console.table(response)
        // localStorage.setItem('token',response.data.token);
        // localStorage.setItem('username',response.data.data.username);
        // localStorage.setItem('role',response.data.role)
        // localStorage.setItem('name',response.data.data.name)
        alert('Register Successfull')
        navigate('/login')
        // navigate(0)
     }
     catch(error){
        alert('Error')
     }
  }
  return (
     <div className='auth-container'>
        <div>
           <form onSubmit={formSubmitHandler}>
           <div className=''>
                 <input
                    id='name'
                    type='text'
                    placeholder='Name'
                    required
                    className='input' 
                    onChange={inputHandler}
                    />
              </div>
              <div className=''>
                 <input
                    id='username'
                    type='text'
                    placeholder='Ref No'
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
                 <button className='btn btn-login btn-login-1' type='submit'>Register</button>
              </div>
           </form>
        </div>
     </div>
  )
}

export default Register