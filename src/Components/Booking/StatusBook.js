import React from 'react'

const StatusBook = (props) => {
  return (
    <div>
      <input type='radio' name={props.name._id} value='Pending' className='status'/>P
      <input type='radio' name={props.name._id} value='Approved' className='status'/>A
      <input type='radio' name={props.name._id} value='Rejected' className='status'/>R
      
    </div>
  )
}

export default StatusBook