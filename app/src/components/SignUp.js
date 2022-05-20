import React from 'react'
import { useState, useRef } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Form , FormGroup, FormControl, FormLabel, Button} from 'react-bootstrap';
import { faEye,faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap'
import PasswordChecklist from 'react-password-checklist';

const Eye = <FontAwesomeIcon className="icon" icon={faEye} />;
const EyeSlash = <FontAwesomeIcon className="icon" icon ={faEyeSlash}/>;

const SignUp = () => {
  const[username, setUsername] = useState('');
  const[email, setEmail] = useState('');
  const[password, setPassword] = useState('');
  const[confirmPassword, setConfirmPassword] = useState('');
  const[show, setShow] = useState(false);
  const pass = useRef();
  const [showModal, setShowModal] = useState(false);

  // const validateNewUserDetails = (email, password, username) => {
  //   if( password.length < 7 || password )
  // }

  const handleClose = () => {
    setShowModal(false);
  }
  const handleShowModal = () => {
    setShowModal(true);
  }
  const handleError = () => {
    alert('This email already exists!')
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    if(password !== confirmPassword) {
      console.log('Passwords do not match');
      alert('Passwords do not match!!')
    } 
    let res = await fetch(`http://localhost:6060/user`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email,
        username: username,
        password: password
      })
    });
    if(res.status === 200) {
      console.log('Added User')
      handleShowModal();
    } else {
      console.log('Error')
      handleError();
    }
  } 
 

const showpassword = () =>{
  setShow(!show)
  pass.current.type = show ? 'password':'text';
  }
  
  
  return (
    <div>
      <Form className='add-form' onSubmit={handleSubmit} >
        <FormGroup className='form-control'>
          <FormLabel>Enter Email</FormLabel>
          <FormControl 
            type='text' 
            placeholder='Enter Your Email'
            value={email}
            onChange={e => setEmail(e.target.value)}/>
        </FormGroup>
        <FormGroup className='form-control'>
          <FormLabel>Create Username</FormLabel>
          <FormControl 
            type='text' 
            placeholder='Enter Your Username'
            value={username}
            onChange={e => setUsername(e.target.value)}/>
        </FormGroup>
        <FormGroup className='form-control'>
          <FormLabel>Create Password</FormLabel>
          <FormControl 
            ref={pass}
            type='password' 
            placeholder='Enter Your Password' 
            value={password}
            onChange={e => setPassword(e.target.value)}/>
            {show ? <i onClick={showpassword}>{Eye}</i>:<i onClick={showpassword}>{EyeSlash}</i>}
        </FormGroup>
        <FormGroup className='form-control'>
          <FormLabel>Confirm Password</FormLabel>
          <FormControl 
            ref={pass}
            type='password' 
            placeholder='Confirm Password' 
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}/>
            {show ? <i onClick={showpassword}>{Eye}</i>:<i onClick={showpassword}>{EyeSlash}</i>}
            {/* <PasswordChecklist
              rules={["length","specialChar","number","capital","match"]}
              minLength={5}
              value={password}
              valueAgain={confirmPassword}
              onChange={(isValid) => {}}
              // messages={{
              //   minLength: "The password is at least 8 characters",
              //   specialChar: "the password contains a special character"
              // }}
            /> */}
        </FormGroup>
    
        <Button className='btn btn-block' type='submit' value='Submit'>Submit</Button>
      </Form>
      <div className='modal'>
      <Modal show={showModal} onHide={handleClose}>
            <Modal.Body>
              <Link to='/Login'> User created! Go to Sign In </Link>
            </Modal.Body>
            <Modal.Footer>
              <button className='btn btn-block' onClick={handleClose} type='submit'>Close</button>
            </Modal.Footer>
      </Modal>
    </div>
    </div>
    
  )
}

export default SignUp

