import React from 'react'
import { useState } from 'react'
import { nanoid } from "nanoid";
import { Modal, Button } from 'react-bootstrap'

const AddShoe = ( {email, fetchShoesForRunner} ) => {

  const [shoeBrand, setShoeBrand] = useState("")
  const [mileage, setMileage] = useState(0)
  const [message, setMessage] = useState('')
  
  
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    fetchShoesForRunner();
  }
  const handleShow = () => setShow(true);

  const getCondition = (mileage) => {
    if(mileage <= 100){
      return 'new'
    }
    else if (mileage > 100 && mileage <= 300){
      return 'good'
    }
    else if(mileage > 300 && mileage <=500){
      return 'bad'
    }
    else if(mileage > 500){
      return 'bitch get off the road'
    }
  }


  let handleSubmit = async (e) => {
    e.preventDefault();
    if(mileage < 0) {
      console.log('no negative numbers');
      return(null)
    }
    try {
      let res = await fetch(`http://localhost:6060/shoe`, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email,
          shoe_record: {
            id: nanoid(),
            shoe_brand: shoeBrand,
            mileage: mileage,
            condition: getCondition(mileage)
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
    setShoeBrand('');
    setMileage('');
  };

  return (
    <>
    <Button variant="primary" onClick={handleShow}>
        Add a New Shoe
    </Button>
    <div className='modal'>
      <Modal show={show} onHide={handleClose}>
        <form className='add-form' onSubmit={handleSubmit} >
          <div className='form-control'>
            <Modal.Header closeButton>
              <Modal.Title>Add a Shoe</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <input className='form-control' type='text' name='shoe_brand' required='required' value={shoeBrand} placeholder='Enter a Shoe Brand' onChange={(e) => setShoeBrand(e.target.value)}></input>
              <input className='form-control' type='number' name='mileage' required='required' value={mileage} placeholder='Enter Current Mileage' onChange={(e) => setMileage(parseFloat(e.target.value))}></input>
            </Modal.Body>
            <Modal.Footer>
              <Button className='btn btn-block' onClick={handleClose} type='submit'>Add</Button>
            </Modal.Footer>
          </div>
        </form>
      </Modal>
    </div>
    </>
  )

  
}

export default AddShoe
