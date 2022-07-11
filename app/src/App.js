import * as React from "react";
import { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Header from './components/Header'
import Login from './components/Login'
import Homepage from "./components/Homepage";
import Profile from "./components/Profile";
import SignUp from "./components/SignUp";


export default function App() {
  
  // const[showAddShoe, setShowAddShoe] = useState(false)
  // const [shoes, setShoes] = useState([])
  // const email = {username}

//  //Fetch shoes from API
//   useEffect(() => {
//     const fetchShoes = async () => {
//       const res = await fetch('http://localhost:6060/shoes')
//       const data = await res.json()

//       console.log(data)
//     }

//     fetchShoes()
//   }, [])

  //Fetch users from API
//   useEffect(() => {
//   const fetchUsers = async () => {
//     const res = await fetch('http://localhost:6060/users')
//     const data = await res.json()

//     console.log(data)
//   }

//   fetchUsers()
// }, [])


  // const addShoe = async (shoe) => {
  //   const res = await fetch('http://localhost:6060/shoes', {
  //     method: 'POST',
  //     headers: {
  //       'content-type': 'application/json'
  //     },
  //     body: JSON.stringify(shoe),
  //   })
  //   const data = await res.json()

  //   setShoes([...shoes, data])
  // }


  // useEffect(() => {
  //   const fetchShoes = async () => {
  //     const shoesFromServer = await fetchShoes()
  //     setShoes(shoesFromServer)
  //   }
    
  //   fetchShoes()
  // }, [])


  //Add Shoe
  // const addShoe = async (shoe) => {
  //   const res = await fetch('http://localhost:6060/shoes', {
  //     method: 'POST',
  //     headers: {
  //       'content-type': 'application/json'
  //     },
  //     body: JSON.stringify(shoe),
  //   })
  //   const data = await res.json()

  //   setShoes([...shoes, data])
  // }

  return(
    <Router>
      {/* <div className="container"> */}
        <Header/>
        <Routes>
          <Route path="/" element={<Homepage/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/signup" element={<SignUp/>}/>
        </Routes>
      {/* </div> */}
    </Router>
  )
}
