import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import Logo from '../logos/logo.png'
import { FaCog } from 'react-icons/fa'
import { Navbar, Container, DropdownButton, Dropdown } from 'react-bootstrap'
import { NavDropdown } from 'react-bootstrap'
import { ThemeProvider } from 'react-bootstrap'


const Header = () => {
  const { pathname } = useLocation();

if(pathname==="/"){
  return (
  <ThemeProvider prefixes={{ container : "my-container"}}>
  <Navbar>
    <Container>
      <h1 className='header'>
        <img src={Logo} alt="Logo" className='logo' href='#/'/>
        {/* <Link to='/' className='menu1'>Homepage</Link>
        <Link to='/Login' className='menu'>Login</Link> 
        <Link to='/SignUp' className='menu'>Create an Account</Link> */}
        <NavDropdown align="center" id="dropdown-basic-button" title="Login/Sign Up" paddingLeft="100px">
          <NavDropdown.Item href="/Login">Login</NavDropdown.Item>
          <NavDropdown.Item href="/Signup">Sign Up</NavDropdown.Item>
        </NavDropdown>
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
          <Link to="/" className='menu'>Sign Out</Link>
          <NavDropdown align="center" id="dropdown-basic-button"  paddingLeft="100px">
          <NavDropdown.Item href="/Login">Login</NavDropdown.Item>
          <NavDropdown.Item href="/Signup">Sign Up</NavDropdown.Item>
        </NavDropdown>
          <FaCog style={{color: 'dark-gray', cursor: 'pointer', margin: '5px', paddingTop: '20px', paddingLeft: '10px', fontsize: '2px'}}/>
        </h1> 
      </Container>
    </Navbar>
    </ThemeProvider>
    )
}

export default Header

