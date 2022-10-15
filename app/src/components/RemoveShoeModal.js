import React from 'react'
import { Button, Modal } from 'react-bootstrap';
import { useState } from 'react'
import { FaTrash } from 'react-icons/fa'

const RemoveShoeModal = ({ shoeRecord, removeShoe, userId}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  }

  return (
    <div>
      <FaTrash style={{color: 'black', cursor: 'pointer', margin: '5px', fontsize: '5px'}} onClick={ () => {handleShow()} } />
      <Modal id={shoeRecord.id} show={show} onHide={handleClose}>
        <Modal.Body>
          Are you sure you want to delete this shoe record? 
          <button className='btn btn-block' onClick={handleClose} type='submit'>No</button>
          <button className='btn btn-block' onClick={ () => removeShoe(shoeRecord.shoeRecordId, userId)} type='submit'>Yes, I am sure.</button>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default RemoveShoeModal