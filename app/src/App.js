import * as React from "react";
import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
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
import Settings from "./components/Settings"
import { appBarClasses } from "@mui/material";

// import Protected from "./components/Protected"

export default function App() {

  const [userId, setUserId] = useState('');
  const[runnerShoeRecords, setRunnerShoeRecords] = useState([]);
  const[firstName, setFirstName] = useState('');
  const [data, setData] = useState({})
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [message, setMessage] = useState('');
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  
  // const cors = require('cors');
  // App.use(cors());
  // const logIn = () => {
  //   setIsLoggedIn(true);
  //   };

  //Load Shoe Data
  const fetchShoesForRunner = async (userId) => {
    console.log(userId)
    // const response = await fetch(`http://localhost:6060/runner/${email}`);
    const response = await fetch(`https://aq4k8seahj.execute-api.us-east-1.amazonaws.com/records/${userId}`, {
      method: 'GET',
      headers: {
        'accept': 'application/json',
        'accept': '*/*'
      },
    })
    const data = await response.json();
    console.log(data);
    console.log(data.Item.shoe_records);
    setRunnerShoeRecords(data.Item.shoe_records);
    setFirstName(data.Item.firstName)
    setData(data.Item);
  } 

  //validate credentials
  const validateCredentials = () => {
    console.log(userId)
    if (userId == '') {
      console.log('User not validated!');
    }    
    else if(userId) {
      navigate("/profile", { state: { userId: userId} } );
    } else {
      alert('Incorrect email/password')
    }
  }
  
   //Validate username and password against database
   const validateUser = async (email, password) => {
    console.log("validating user");
  
    console.log(email);
    console.log(password)

    const res = await fetch("https://aq4k8seahj.execute-api.us-east-1.amazonaws.com/validate", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Accept': "*/*"
      },
      body: JSON.stringify(
        {
            email: email,
            password: password
        })
      });
  
    const data = await res.json();
    console.log(data)
    setUserId(data);
    
    validateCredentials();
  }
  //Add Shoe

  const addShoe = async (data) => {
    console.log(data)
    const res = await fetch("https://aq4k8seahj.execute-api.us-east-1.amazonaws.com/shoerecord", {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Accept': "*/*",
        'Acces-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
          id: userId,
          shoeRecordId: uuidv4(),
          shoe_brand: data.shoeBrand,
          mileage: data.mileage,
          shoe_model: data.shoeModel

      })
      });
    if (res.status === 200) {
      console.log("Added Shoe");
      fetchShoesForRunner();
    } else {
      console.log("Some error occured");
    }
  };

  //Update Mileage/Condition

  const update = async (shoe_id, newMileage, newShoeBrand, newCondition) => {
    console.log(userId)
    try{
      let res = await fetch("https://aq4k8seahj.execute-api.us-east-1.amazonaws.com/editshoerecord", {
          method: "PUT",
          headers: { 
            'Content-Type': 'application/json' ,
            'Content-Type': 'application/json',
            'Accept': "*/*",
          },
          body: JSON.stringify({
            id: 'poopy',
            shoeRecordId: shoe_id,
            mileage: newMileage,
            shoe_brand: newShoeBrand,
            condition: newCondition
          }),
      });
         if (res.status === 200) {
            setMessage("Miles Added");
          } else {
            setMessage("Some error occured");
          }}
           catch (err) {
            console.log(err)
          }
        }   

  //Remove Shoe
  const removeShoe = async (shoeRecordId, userId) => {
    console.log(shoeRecordId)
    console.log(userId)
    try {
      let res = await fetch("https://aq4k8seahj.execute-api.us-east-1.amazonaws.com/deleteshoerecord", {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: userId,
        shoeRecordId
      })
    });
    if (res.status === 200) {
      setMessage("Removed Shoe");
      fetchShoesForRunner();
      // handleClose();
    } else {
      setMessage("Some error occured");
    } 
  } catch (err) {
      console.log(err);}
    }

  return(
      <div className="container"> 
        <Header/>
        <Routes>
          <Route path="/" element={<Homepage/>}/>
            <Route path="/login" element={<Login onValidate={validateUser}/>}/>
            <Route path="/profile"  element={
              //  <Protected isLoggedIn={isLoggedIn}>
                  <Profile fetchShoesForRunner={fetchShoesForRunner} runnerShoeRecords={runnerShoeRecords} firstName={firstName} data={data} removeShoe={removeShoe} addShoe={addShoe} update={update}/>
              // </Protected>
            }/>
            <Route path="/signup" element={<SignUp/>}/>
            <Route path="/settings" element={<Settings/>}/>
        </Routes>
      </div>
  )
}
