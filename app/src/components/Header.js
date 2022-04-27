import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../logos/logo.png'


const Header = () => {
  const styleObj = {
    fontSize: 20,
    color: "black",
    textAlign: "center",
  }
 
  return (
    <header>
      <h1 className='header'>
        <img src={Logo} alt="Logo" className='logo'/>
        <Link to='/' className='menu1'>Homepage</Link>
        <Link to='/Login' className='menu'>Login</Link> 
        <Link to='/SignUp' className='menu'>Sign Up</Link>
      </h1> 
    </header>
  )
}

export default Header

