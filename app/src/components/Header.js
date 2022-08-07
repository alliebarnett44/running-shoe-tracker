import React from 'react'
import { useLocation } from 'react-router-dom'
import Logo from '../logos/logo.png'
import { FaCog } from 'react-icons/fa'
import { Navbar, Container } from 'react-bootstrap'
import { NavDropdown } from 'react-bootstrap'
import { ThemeProvider } from 'react-bootstrap'


const Header = () => {
  const { pathname } = useLocation();
  const navDropdownTitle = (<FaCog style={{color: 'black', cursor: 'pointer', margin: '5px', paddingTop: '20px', paddingLeft: '10px', fontsize: '2px'}}/>)

if(pathname==="/" || pathname==="/signup"){
  return (
  <ThemeProvider prefixes={{ container : "my-container"}}>
  <Navbar>
    <Container>
      <h1 className='header'>
        <img src={Logo} alt="Logo" className='logo' href='#/'/>
      <div float="right" className="dropdown" >
        <NavDropdown align="right" title="Login/Sign Up" id="dropdown-basic-button" paddingLeft="100px">
          <NavDropdown.Item href="/Login">Login</NavDropdown.Item>
          <NavDropdown.Item href="/Signup">Sign Up</NavDropdown.Item>
          <NavDropdown.Item href="/Profile">Profile</NavDropdown.Item>
        </NavDropdown>
      </div>
      </h1> 
    </Container>
  </Navbar>
  </ThemeProvider>
  )
}
  
  return (
    <ThemeProvider prefixes={{ container : "my-container"}}>
    <Navbar>
      <Container>
        <h1 className='header'>
          <img src={Logo} alt="Logo" className='logo' href='#/'/>
          {/* <Link to='/' className='menu1'>Homepage</Link>
          <Link to='/Login' className='menu'>Login</Link> 
          <Link to='/SignUp' className='menu'>Create an Account</Link> */}
          {/* <Link to="/" className='menu'>Sign Out</Link> */}
        {/* <NavDropdown align="center" id="dropdown-basic-button"  paddingLeft="100px">
          <NavDropdown.Item href="/Login">Login</NavDropdown.Item>
          <NavDropdown.Item href="/Signup">Sign Up</NavDropdown.Item>
        </NavDropdown> */}
        <NavDropdown title = {<div style={{display: "inline-block"}}><FaCog style={{color: 'black', cursor: 'pointer', margin: '5px', paddingTop: '20px', paddingleft: '10px', fontsize: '2px'}}/></div>} id="dropdown-basic-button">
          <NavDropdown.Item href="/Settings">User Settings</NavDropdown.Item>
          <NavDropdown.Item href="/">Log Out</NavDropdown.Item>
        </NavDropdown>
        </h1> 
      </Container>
    </Navbar>
    </ThemeProvider>
    )
}

export default Header

