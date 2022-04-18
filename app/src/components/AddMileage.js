import React from 'react'
import { useState } from 'react'
import { nanoid } from "nanoid";

const AddMileage = ( {email, fetchShoesForRunner} ) => {

  const [shoeBrand, setShoeBrand] = useState("")
  const [mileage, setMileage] = useState(0)
  const [message, setMessage] = useState('')


  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch(`http://localhost:6060/mileage`, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email,
          shoe_brand: shoeBrand,
          miles_added: mileage
        }),
      });
      if (res.status === 200) {
        setMessage("Miles Added");
        fetchShoesForRunner();
      } else {
        setMessage("Some error occured");
      }
    } catch (err) {
      console.log(err);
    }
  };


  return (
      <form className='add-form' onSubmit={handleSubmit} >
        <div className='form-control'>
          <label>Add A Run</label>
          <input className='form-control' type='text' name='shoe_brand' required='required' placeholder='Enter Shoe Used on Run' onChange={(e) => setShoeBrand(e.target.value)}></input>
          <input className='form-control' type='number' name='mileage' required='required' placeholder='Enter Run Mileage' onChange={(e) => setMileage(parseFloat(e.target.value))}></input>
          <button className='btn btn-block' type='submit'>Add</button>
        </div>
      </form>
  )
}

export default AddMileage
