import React from 'react'
import {Routes,Route} from 'react-router-dom'; 
import Home from '../Components/Home/Home';
import SlotBook from '../Components/Booking/SlotBook';
import Booked from '../Components/Booking/Booked';
import Register from '../Components/Login/Register';
import Login from '../Components/Login/Login';
const Routers = () => {

  return (
    <Routes>

      <Route path='/home' element={<Home/>}/>
      <Route path='/' element={<Home/>}/>
      <Route path='/book' element={<SlotBook/>}/>
      <Route path='/booked' element={<Booked/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
    </Routes>
  )
}

export default Routers