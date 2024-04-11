import React from 'react'
import './Home.css'
import { userId, userName, userRole } from '../../info/url'
const Home = () => {
   return (
      <div>
         {(userId && <div className='home-container'>

            <div className='home-container-item'>
               <div className='item'>
                  <h3>Name : {userName}</h3>
               </div>
               <div>
                  <p>Ref No : {userId}</p>
               </div>
               <div>
                  <p>Role : {userRole === 'user' ? 'Student' : userRole}</p>
               </div>
            </div>
         </div>) || (<h3 className=''>Login First...</h3>)}
      </div>
   )
}

export default Home