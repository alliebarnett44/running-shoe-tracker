import React from 'react'
import { useState } from 'react'

const AddShoe = () => {
  const[addMileage, setAddMileage] = useState('');
  const[addShoe, setAddShoe] = useState('');

  const onSubmit = (e) => {
    e.preventDefault()
    if(!addMileage || !addShoe) {
      alert('Please Enter a Mileage')
      return
    } else {
      console.log(addMileage & addShoe)
    }
  }
  
  return (
    <form className='add-form' onSubmit={onSubmit}>
        <div className='form-control'>
          <label>Add Another Shoe</label>
          <input type='text' placeholder='Add Shoe Brand' value={addShoe} onChange={(e) => setAddShoe(e.target.value)}/>
        </div>
        <div className='form-control-2'>
          <label id='add-mileage'>Add Mileage</label>
          <input type='text' placeholder='Add Mileage' value={addMileage} onChange={(e) => setAddMileage(e.target.value)}/>
        </div>
        <input className='btn btn-block' type='submit' value='Add New Shoe'/>
      </form>
  )
}

export default AddShoe