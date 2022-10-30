import React from 'react'
import Navbar from './Navbar'
import { useLocation } from 'react-router-dom'
import Logo from '../logos/logo.png'
import { FaCog } from 'react-icons/fa'
import { NavDropdown } from 'react-bootstrap'
import { ThemeProvider } from 'react-bootstrap'


const Header = () => {
  const { pathname } = useLocation();
  // const navDropdownTitle = (<FaCog style={{color: 'black', cursor: 'pointer', margin: '5px', paddingTop: '20px', paddingLeft: '10px', fontsize: '2px'}}/>)

  const mystyle = {
    color: "purple",
    // display: "flex",
    justifyContent: "right",
    float: "right"
  };

// if(pathname==="/" || pathname==="/signup"){
//   return (
//   <div>
//     {/* <Navbar/> */}
//     <div>
//         <h1 className='header'>
//           <img src={Logo} alt="Logo" className='logo' href='#/'/>
//         <div float="right" className="dropdown" >
//           <NavDropdown stlye={{textAlign:"right"}} title="Login/Sign Up" id="dropdown-basic-button" paddingLeft="100px">
//             <NavDropdown.Item href="/Login" style={mystyle} >Login</NavDropdown.Item>
//             <NavDropdown.Item href="/Signup" style={mystyle}>Sign Up</NavDropdown.Item>
//             <NavDropdown.Item href="/Profile" style={mystyle}>Profile</NavDropdown.Item>
//           </NavDropdown>
//         </div>
//         </h1> 
//     </div>
//   </div>
 
//   )
// }
  
  return (
    <div>
    <Navbar/>
      {/* <h1 className='header'>
        <img src={Logo} alt="Logo" className='logo' href='#/'/>
      <NavDropdown title = {<div style={{display: "inline-block"}}><FaCog style={{color: 'black', cursor: 'pointer', margin: '5px', paddingTop: '20px', paddingleft: '10px', fontsize: '2px'}}/></div>} id="dropdown-basic-button">
        <NavDropdown.Item href="/settings">User Settings</NavDropdown.Item>
        <NavDropdown.Item href="/">Log Out</NavDropdown.Item>
      </NavDropdown>
      </h1>  */}
    </div>
    )
}

export default Header

