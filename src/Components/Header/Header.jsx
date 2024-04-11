import React from 'react';
import {Link} from 'react-router-dom';
import './Header.css';

const Header = () => {
   return(

      <div className='header-container'> 
         <ul className='header-container-item'>
            <li><Link className='header-container-item-link' to='/home'>Home</Link></li>
            <li><Link className='header-container-item-link' to='/book'>Book</Link></li>
            <li><Link className='header-container-item-link' to='/booked'>Booked</Link></li>
         </ul>
         <ul className='header-container-item'>
            <button className='btn btn-login'><Link className='header-container-item-link' to='login'>Login</Link></button>
            {/* <button className='btn btn-register'><Link className='header-container-item-link' to='register'>Register</Link></button> */}
         </ul>
      </div>
   )
};
export default Header;