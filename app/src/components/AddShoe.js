import React from 'react'
import { useState } from 'react'
import { v4 as uuidv4 } from "uuid";
import { Modal, Button } from 'react-bootstrap'
import { useRadioGroup } from '@mui/material';


const AddShoe = ( {userId, fetchShoesForRunner, addShoe} ) => {

  const [shoeBrand, setShoeBrand] = useState("")
  const [mileage, setMileage] = useState(0)
  const [shoeModel, setShoeModel] = useState("")
  
  
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    fetchShoesForRunner(userId);
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
    console.log(shoeBrand)
    console.log(shoeModel)
    console.log(mileage)
    addShoe({ shoeBrand, shoeModel, mileage })
    setShoeBrand('');
    setMileage('');
    setShoeModel('');
    getCondition('');
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
                <input className='form-control' type='text' name='shoe_model' required='required' value={shoeModel} placeholder='Enter Shoe Model' onChange={(e) => setShoeModel(e.target.value)}></input>
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


// await fetch(`http://localhost:6060/shoe`, {
//   method: "PUT",
//   headers: { 'Content-Type': 'application/json' },
//   body: JSON.stringify({
//     email: email,
//     shoe_record: {
//       id: nanoid(),
//       shoe_brand: shoeBrand,
//       shoe_model: shoeModel,
//       mileage: mileage,
//       condition: getCondition(mileage)
//     }
//   }),
// });





   