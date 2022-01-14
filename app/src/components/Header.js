import React from 'react'
import { Link } from 'react-router-dom'


const Header = () => {
  const styleObj = {
    fontSize: 20,
    color: "black",
    textAlign: "center",
    paddingLeft: "80%",
  }
  return (
    <header>
      <h1 className='header'>ShoeLife <Link to='/Login' style={styleObj}>Login</Link> </h1> 
    </header>
  )
}

export default Header


{/* <p style={styleObj}>Sign Out</p> */}