import React from 'react'
import { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'

const AddMileage = ( {email, fetchShoesForRunner, shoe_id, shoe_brand, mileage } ) => {

  const [addMileage, setAddMileage] = useState(0)
  const [message, setMessage] = useState('')

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const newMileage = mileage + addMileage;

  const getNewRecord = () => {
    // updateCondition()
    fetchShoesForRunner()
  }

  // useEffect(() => {
  //   updateCondition()
  // }, [])


  const updateCondition = async () => {
  try{
    let res = await fetch(`http://localhost:6060/condition`, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: shoe_id,
          total_miles: newMileage
        }),
    });
       if (res.status === 200) {
          setMessage("Miles Added");
        } else {
          setMessage("Some error occured");
        }}
         catch (err) {
          console.log(err)
        }
      }    


  let handleSubmit = async (e) => {
    e.preventDefault();
    if(addMileage < 0) {
      console.log('no negative numbers');
      return(null)
    }
    try {
      let res = await fetch(`http://localhost:6060/mileagecondition`, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: shoe_id,
          shoe_brand: shoe_brand,
          miles_added: addMileage,
          total_miles: newMileage
        }),
      });
      if (res.status === 200) {
        getNewRecord();
      } else {
        setMessage("Some error occured");
      }
    } catch (err) {
      console.log(err);
    }
    updateCondition()
    setAddMileage('')
  };


  return (
    <>
    <Button variant="primary" onClick={handleShow}>
        Add Run
    </Button>
    <div className='modal'>
      <Modal show={show} onHide={handleClose}>
        <form className='add-form' onSubmit={handleSubmit} >
          <div className='form-control'>
            <Modal.Header closeButton>
              <Modal.Title>Add a Run</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <input className='form-control' type='number' name='mileage' required='required' placeholder='Enter Run Mileage' value={addMileage} onChange={(e) => setAddMileage(parseFloat(e.target.value))}></input>
            </Modal.Body>
            <Modal.Footer> 
              {/* <Button className='btn btn-block' type='submit'> Add </Button>
              <Button variant="primary" onClick={handleClose}> Save Changes</Button> */}
              <Button className='btn btn-block' onClick={handleClose} type='submit'>Add</Button>
            </Modal.Footer>
          </div>
        </form>
      </Modal>
    </div>
    </>
  )
}

export default AddMileage




// const Example = () => {
//   const [show, setShow] = useState(false);

//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

//   return (
//     <>
//       <Button variant="primary" onClick={handleShow}>
//         Launch demo modal
//       </Button>
//     <div className='modal'>
//       <Modal show={show} onHide={handleClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>Modal heading</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleClose}>
//             Close
//           </Button>
//           <Button variant="primary" onClick={handleClose}>
//             Save Changes
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//     </>
//   );
// }

// export default Example

