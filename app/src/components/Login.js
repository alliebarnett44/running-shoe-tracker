import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useRef } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye,faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Button } from 'react-bootstrap'
import { PropTypes } from 'prop-types'
// import { API } from 'aws-amplify';

const Eye = <FontAwesomeIcon className="icon" icon={faEye} />;
const EyeSlash = <FontAwesomeIcon className="icon" icon ={faEyeSlash}/>;

const Login = ({ onValidate, loginData }) => {
  console.log(loginData)

  const[email, setEmail] = useState('');
  const[password, setPassword] = useState('');
  
  const[show,setshow]=useState(false);
  const pass = useRef();


  const handleSubmit = (e) => {  
    e.preventDefault(); 
    onValidate(email, password);
  }
  
  const showpassword = () =>{
    setshow(!show)
    pass.current.type = show ? 'password':'text';
    }

  return (
    <>
    <form className='add-form' onSubmit={handleSubmit}>
        <div className='form-control'>
          <label>Email</label>
          <input 
            type='text' 
            placeholder='Enter Your Email'
            value={email}
            onChange={e => setEmail(e.target.value)}/>
        </div>
        <div className='form-control'>
          <label>Password</label>
          <input 
            ref={pass}
            type='password' 
            placeholder='Enter Your Password' 
            value={password}
            onChange={e => setPassword(e.target.value)}/>
            {show ? <i onClick={showpassword}>{Eye}</i>:<i onClick={showpassword}>{EyeSlash}</i>}
        </div>
        <Button className='btn btn-block' type='submit' value='Enter'>Submit</Button>
      </form>
      <div className='go-back'>
      <Link to='/'> Back to Home </Link>
  
    </div>
    </>
  )
  }



export default Login


      
 

  




