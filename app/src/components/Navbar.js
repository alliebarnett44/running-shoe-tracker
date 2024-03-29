import React from 'react'
import Logo from '../logos/logo.png'
import { useLocation } from 'react-router-dom';

const Navbar = () => {

  const { pathname } = useLocation();

  if(pathname==="/" || pathname==="/signup") {
    return (
      <nav className="navigation">
      <a href="/" className="brand-name">
        <img src={Logo} alt="Logo" className='logo' href='#/'/>
      </a>
      <button className="hamburger">
        {/* icon from heroicons.com */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="white"
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <div
        className="navigation-menu">
        <ul>
          <li>
            <a href="/Login">Log In</a>
          </li>
          <li>
            <a href="/Signup">Sign Up</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
        </ul>
      </div>
    </nav>
    )
  }

  else {
  return (
    <div>
      <nav className="navigation">
      <a href="/" className="brand-name">
        <img src={Logo} alt="Logo" className='logo' href='#/'/>
      </a>
      <button className="hamburger">
        {/* icon from heroicons.com */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="white"
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <div
        className="navigation-menu">
        <ul>
          <li>
            <a href="/">Log Out</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
          <li>
            <a href="/settings">User Settings</a>
          </li>
        </ul>
      </div>
    </nav>
    </div>
  )
}}

export default Navbar