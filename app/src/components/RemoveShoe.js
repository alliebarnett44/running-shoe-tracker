import React from 'react'
import { useState } from 'react'
import { nanoid } from "nanoid";

const RemoveShoe = ( {email, fetchShoesForRunner} ) => {


  const [shoeBrand, setShoeBrand] = useState("")
  const [mileage, setMileage] = useState("")
  const [condition, setCondition] = useState("")
  const [message, setMessage] = useState("");


  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch(`http://localhost:6060/delete`, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email,
          shoe_record: {
            id: nanoid(),
            shoe_brand: shoeBrand,
            mileage: mileage,
            condition: condition
          }
        }),
      });
      if (res.status === 200) {
        setMessage("Added Shoe");
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
          <label>Remove A Shoe</label>
          <input className='form-control' type='text' name='shoe_brand' required='required' placeholder='Enter a Shoe Brand' onChange={(e) => setShoeBrand(e.target.value)}></input>
          <input className='form-control' type='text' name='mileage' required='required' placeholder='Enter a Mileage' onChange={(e) => setMileage(e.target.value)}></input>
          <input className='form-control' type='text' name='condition' required='required' placeholder='Enter a Condition' onChange={(e) => setCondition(e.target.value)}></input>
          <button className='btn btn-block' type='submit'>Remove</button>
        </div>
      </form>
  )
}

export default RemoveShoe

