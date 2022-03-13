import React from 'react'
import { useState } from 'react';

const AddMileage = ( {mileage} ) => {
  const[addMileage, setAddMileage] = useState('');

  const onSubmit = (e) => {
    e.preventDefault()
    if(!addMileage) {
      alert('Please Enter a Mileage')
      return
    } else {
      console.log(addMileage)
    }
  }

  return (
    <form className='add-form' onSubmit={onSubmit}>
        <div className='form-control'>
          <label>Update Shoe Mileage</label>
          <input type='text' placeholder='Add Mileage' value={addMileage} onChange={(e) => setAddMileage(e.target.value)}/>
        </div>
        <input className='btn btn-block' type='submit' value='Add Mileage'/>
      </form>
  )
}

export default AddMileage