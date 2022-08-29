import * as React from "react";
import { useState } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Header from './components/Header'
import Login from './components/Login'
import Homepage from "./components/Homepage";
import Profile from "./components/Profile";
import SignUp from "./components/SignUp";
// import Protected from "./components/Protected"

export default function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(null)
  
  // const logIn = () => {
  //   setIsLoggedIn(true);
  //   };

  return(
    <Router>
      {/* <div className="container"> */}
        <Header/>
        <Routes>
          <Route path="/" element={<Homepage/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/profile"  element={
              //  <Protected isLoggedIn={isLoggedIn}>
                  <Profile />
              // </Protected>
            }/>
            <Route path="/signup" element={<SignUp/>}/>
        </Routes>
      {/* </div> */}
    </Router>
  )
}
