import React from 'react'
import { Link } from 'react-router-dom'
import { useState, useRef } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye,faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Eye = <FontAwesomeIcon className="icon" icon={faEye} />;
const EyeSlash = <FontAwesomeIcon className="icon" icon ={faEyeSlash}/>;

const Login = () => {
//   const [formdata, setformdata] = useState({

//     email: '',
//     password: ''

// }

  const[username, setUsername] = useState('');
  const[password, setPassword] = useState('');

  // function performValidation() {
  // return username.length > 0 && password.length > 0;
  // }

  // const[show,setshow]=useState(false)
  // const pass = useRef();


// const handleChange = (e) => {
//     setformdata({...formdata, [e.target.name]:e.target.value})
//     }

  const handleSubmitClick = (e) => {
      e.preventDefault();
      console.log("Authenticated");
  }
      //Fetch API stuff here 

  //   setformdata({
  //     email:'',
  //     password: ''
  //   })
  //   setshow(false)
  // }


  // const showpassword = () =>{
  //   setshow(!show)
  //   pass.current.type = show ? 'password':'text';
  //   }

  return (
    <>
    <form className='add-form' onSubmit={handleSubmitClick}>
        <div className='form-control'>
          <label>Email</label>
          <input 
            type='text' 
            placeholder='Enter Your Email'
            value={username}
            onChange={e => setUsername(e.target.value)}/>
        </div>
        <div className='form-control'>
          <label>Password</label>
          <input 
            // ref={pass}
            type='password' 
            placeholder='Enter Your Password' 
            value={password}
            onChange={e => setPassword(e.target.value)}/>
            {/* {show ? <i onClick={showpassword}>{Eye}</i>:<i onClick={showpassword}>{EyeSlash}</i>} */}
        </div>
        <input className='btn btn-block' type='submit' value='Enter' />
      </form>
      <div className='go-back'>
      <Link to='/'> Go Back </Link>
    </div>
    </>
  )
  }

  export default Login