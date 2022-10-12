import React from 'react'
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Form , FormGroup, FormControl, FormLabel, Button} from 'react-bootstrap';
import { faEye,faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap'
import StrengthMeter from './StrengthMeter';
import { v4 as uuidv4} from 'uuid'

const Eye = <FontAwesomeIcon className="icon" icon={faEye} />;
const EyeSlash = <FontAwesomeIcon className="icon" icon ={faEyeSlash}/>;

const SignUp = () => {
  const[username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const[email, setEmail] = useState('');
  const[password, setPassword] = useState('');
  const[confirmPassword, setConfirmPassword] = useState('');
  const[show, setShow] = useState(false);
  const pass = useRef();
  const [showModal, setShowModal] = useState(false);
  const [showMessage, setShowMessage] = useState('');
  const[showConfirm, setShowConfirm] = useState(false)
  const [showErrorMessage, setShowErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if(password !== confirmPassword) {
      setShowMessage('Passwords do not match!')
      return;
    }
    if(email === '' || username === '') {
      setShowMessage('Enter Username/Email')
      return;
    } 
    if(password === confirmPassword) {
      setShowMessage('')
    } 
    if(email !== '' && username !==''){
      setShowMessage('')
    }
    else {
      return
    }
  }, [password, confirmPassword, email, username])

  const handleClose = () => {
    setShowModal(false);
    setUsername('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  }
  const handleShowModal = () => {
    setShowModal(true);
  }
  const handleError = () => {
    // setShowErrorMessage('A user with this email already exists!')
    alert('A user with this email already exists!')
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    let res = await fetch("https://aq4k8seahj.execute-api.us-east-1.amazonaws.com/shoes", {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Accept': "*/*"
      },
      body: JSON.stringify(
        {
          id : uuidv4(),
          email: email,
          username: username,
          password: password,
          firstName: firstName,
          lastName : lastName,
          shoe_records: []
        })
      });
    const data = await res.json();
    console.log(data)
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

  const showConfirmPassword = () =>{
    setShowConfirm(!showConfirm)
    pass.current.type = showConfirm ? 'password':'text';
    }

const goToProfile = () => {
  navigate("/profile", { state: { email: email} } )
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
          <FormLabel>Enter First Name</FormLabel>
          <FormControl 
            type='text' 
            placeholder='Enter Your First Name'
            value={firstName}
            onChange={e => setFirstName(e.target.value)}/>
        </FormGroup>
        <FormGroup className='form-control'>
          <FormLabel>Enter Your Last Name</FormLabel>
          <FormControl 
            type='text' 
            placeholder='Enter Your Last Name'
            value={lastName}
            onChange={e => setLastName(e.target.value)}/>
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
            <StrengthMeter password={password}/>
        </FormGroup>
        <FormGroup className='form-control'>
          <FormLabel>Confirm Password</FormLabel>
          <FormControl 
            ref={pass}
            type='password' 
            placeholder='Confirm Password' 
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}/>
            {show ? <i onClick={showConfirmPassword}>{Eye}</i>:<i onClick={showConfirmPassword}>{EyeSlash}</i>}
            <br/>
            <div className='error-message'> {showMessage} </div>
            <div className='error-message'>{showErrorMessage}</div>
        </FormGroup>
    
        <Button className='btn btn-block' type='submit' value='Submit'>Submit</Button>
      </Form>
      <div className='modal'>
      <Modal show={showModal} onHide={handleClose}>
            <Modal.Body>
              {/* <Link to='/Login'> User created! Go to Sign In </Link> */}
              <button onClick={goToProfile} >User created! Go to Profile </button>
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


