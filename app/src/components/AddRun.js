import React from 'react'
import { useState } from 'react';
import { Dropdown } from 'react-bootstrap'

const AddRun = () => {
  const[addMileage, setAddMileage] = useState('');

  const shoeRecords = [
    {
      shoe_brand: "Asics",
      mileage: 14
    },
    {
      shoe_brand: "Nike",
      mileage: 11
    },
    {
      shoe_brand: "Shoes",
      mileage: 100
    }
  ]
  
  

  return (
    <form className='add-form' >
        <div className='form-control'>
          <label>Add a Run</label>
            <div>
              <Dropdown id="dropdown-basic-button" title="Dropdown button">
                <Dropdown.Toggle variant="success" id="dropdown-basic" className='dropdown-toggle'>
                  Pick Shoe
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item className='dropdown-item'> Item 1 </Dropdown.Item>
                  <Dropdown.Item className='dropdown-item'> Item 2 </Dropdown.Item>
                  <Dropdown.Item className='dropdown-item'> Item 3 </Dropdown.Item>
                  {shoeRecords.map(({shoeRecord}) => (<Dropdown.Item key={shoeRecords.id} valeu={shoeRecords.mileage}> {shoeRecords.shoe_brand} </Dropdown.Item>))}
                </Dropdown.Menu>
              </Dropdown>
            </div>
          <input type='text' placeholder='Add Mileage' value={addMileage} onChange={(e) => setAddMileage(e.target.value)}/>
        </div>
        <input className='btn btn-block' type='submit' value='Add'/>
      </form>
  )
}

export default AddRun

// {shoeRecords.map((shoeRecord) => (<Dropdown.Item key={shoeRecord.id}> {shoeRecords.shoe_brand} </Dropdown.Item>))}


// const[addMileage, setAddMileage] = useState('');
// const[addShoe, setAddShoe] = useState('');

// const onSubmit = (e) => {
//   e.preventDefault()
//   if(!addMileage || !addShoe) {
//     alert('Please Enter a Mileage')
//     return
//   } else {
//     console.log(addMileage & addShoe)
//   }
// }

/* <form className='add-form' onSubmit={onSubmit}>
        <div className='form-control'>
          <label>Add Another Shoe</label>
          <input type='text' placeholder='Add Shoe Brand' value={addShoe} onChange={(e) => setAddShoe(e.target.value)}/>
        </div>
        <div className='form-control-2'>
          <label id='add-mileage'>Add Mileage</label>
          <input type='text' placeholder='Add Mileage' value={addMileage} onChange={(e) => setAddMileage(e.target.value)}/>
        </div>
        <input className='btn btn-block' type='submit' value='Add New Shoe'/>
      </form> */