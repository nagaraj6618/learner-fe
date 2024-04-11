import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { BE_URL, token, userName, userRole } from '../../info/url';
const Booked = () => {
  const [booked, setBooked] = useState([]);

  console.table(token)
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
      const response = await axios.get(`${BE_URL}/booking/${userName}`, {
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
    <div>

      {
        booked.map((data) => (<div>

          {data.username}
        </div>))
      }
    </div>
  )
}

export default Booked