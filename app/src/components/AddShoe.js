import React from 'react'
import { useState } from 'react'

const AddShoe = ({ onAdd }) => {
  const[shoe, setShoe] = useState('')
  const[mileage, setMileage] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    if(!shoe) {
      alert('Add New Shoe')
      return
    } else {
      onAdd({shoe, mileage});
      setShoe('');
      setMileage('');
    }}


  return (
    <form className='add-form' onSubmit={onSubmit}>
      <div className='form-control'>
        <label>Add A New Shoe</label>
        <input type='text' placeholder='Add New Shoe' value={shoe} onChange={(e) => setShoe(e.target.value)}/>
      </div>
      <div className='form-control'>
        <label>Add Mileage</label>
        <input type='number' placeholder='Add Mileage' value={mileage} onChange={(e) => setMileage(e.target.value)}/>
      </div>
      
      <input className='btn btn-block' type='submit' value='Save Shoe'/>
    </form>
  )
}

export default AddShoe
