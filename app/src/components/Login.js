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

const Login = ({ }) => {

  const[email, setEmail] = useState('');
  const[password, setPassword] = useState('');
  const[show,setshow]=useState(false)
  const pass = useRef();
  const navigate = useNavigate();

  function isEmptyObject(obj){
    return JSON.stringify(obj) === '{}';
}

  const handleSubmit = async e => {
 
    //Validate username and password against database 
    const validateUser = async () => {
      console.log("validating user");
    
    console.log(email);
    console.log(password)

     const res = await fetch("https://w0y4datx2d.execute-api.us-east-1.amazonaws.com/prod/api", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Accept': "*/*"
        },
        body: JSON.stringify(
          {
            operation: "validate",
            tableName: "running-shoe-tracker-users",
            payload: {
              email: email,
              password: password
            }
          })
        });
      //   .then(response => response.json())
      //   .then(data => {
      //     console.log('Success:', data);
      //   })
      //   .catch((error) => {
      //     console.error('Error:', error);
      // });

      // const res = await fetch(`http://localhost:6060/butt?email=${email}&password=${password}`);
      const data = await res.json();
      console.log(data)

      // const response = await fetch(`http://localhost:6060/runner/${email}`);
      //Fetch shoe record from user if they are validated
      const response = await fetch("https://w0y4datx2d.execute-api.us-east-1.amazonaws.com/prod/api", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Accept': "*/*"
        },
        body: JSON.stringify(
          {
            operation: "get-shoes",
            tableName: "running-shoe-tracker",
            payload: {
              email: email,
            }
          })
        });
      
      const shoe_record_data = await response.json();
      console.log(shoe_record_data)
      
      if(data && shoe_record_data['{}']){
        alert('new user')
      }
      else if(data) {
        navigate("/profile", { state: { email: email} } );
      } else {
        alert('Incorrect email/password')
      }
      
    }
    validateUser();
    e.preventDefault();
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


      
 

  




