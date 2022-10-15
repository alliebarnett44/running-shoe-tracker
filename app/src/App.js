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
  const [loginData, setLoginData] = useState({});
  const [showErrorMessage, setShowErrorMessage] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  
  // const cors = require('cors');
  // App.use(cors());
  // const logIn = () => {
  //   setIsLoggedIn(true);
  //   };

  const getCondition = (mileage) => {
    if(mileage <= 100){
      return 'new'
    }
    else if (mileage > 100 && mileage <= 300){
      return 'good'
    }
    else if(mileage > 300 && mileage <=500){
      return 'bad'
    }
    else if(mileage > 500){
      return 'bitch get off the road'
    }
  }

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
    setLoginData(data.Item);
  } 


  //Create new User

  const createUser = async(data) => {
    const res = await fetch("https://aq4k8seahj.execute-api.us-east-1.amazonaws.com/shoes", {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Accept': "*/*"
      },
      body: JSON.stringify(
        {
          id : uuidv4(),
          email: data.email,
          username: data.username,
          password: data.password,
          firstName: data.firstName,
          lastName : data.lastName,
          shoe_records: []
        })
      });
    const response = await res.json();
    console.log(response)
    const id = response.Item.id;
    if(res.status === 200) {
      console.log('Added User')
    } else {
      console.log('Error')
    }
    console.log(id)
    setUserId(id)
    fetchShoesForRunner(id);
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
  
    const response = await res.json();
    console.log(response);
    console.log(response.Count)
    const newLoginData = response.Items[0];
    // console.log(data.Items[0].id);
    setLoginData(newLoginData);

    if (response && response.Count != 0) {
      setShowErrorMessage('')
      setUserId(newLoginData.id);
      navigate("/profile", { state: { userId: newLoginData.id } } );
    } else if (response.Count == 0) {
      setShowErrorMessage('Incorrect Password')
    }
    else {
      setShowErrorMessage('Error')
      console.log ('Error');
    }
  }

  // //validate credentials
  // const validateCredentials = (userId) => {
  //   console.log(userId)
  //   console.log(runnerShoeRecords)
  //   if (userId == '') {
  //     console.log('User not validated!');
  //   }    
  //   else if(userId) {
  //     navigate("/profile", { state: { userId: userId} } );
  //   } else {
  //     alert('Incorrect email/password')
  //   }
  // }


  //Add Shoe
  const addShoe = async (data) => {
    console.log(data)
    console.log(userId)
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
          shoe_model: data.shoeModel,
          condition: getCondition(data.mileage)

      })
      });
      const response = await res.json();
      console.log(response);
      
      console.log(userId)

      fetchShoesForRunner(userId)
    };



  //Update Mileage/Condition

  const update = async (data) => {
    try{
      let res = await fetch("https://aq4k8seahj.execute-api.us-east-1.amazonaws.com/editshoerecord", {
          method: "PUT",
          headers: { 
            'Content-Type': 'application/json' ,
            'Content-Type': 'application/json',
            'Accept': "*/*",
          },
          body: JSON.stringify({
            id: userId,
            shoeRecordId: data.shoe_id,
            mileage: data.newMileage,
            shoe_brand: data.shoe_brand,
            condition: data.newCondition
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
      fetchShoesForRunner(userId);
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
      fetchShoesForRunner(userId);
      // handleClose();
    } else {
      setMessage("Some error occured");
    } 
  } catch (err) {
      console.log(err);}
    }

  return(
      <div > 
        <Header/>
        <Routes>
          <Route path="/" element={<Homepage/>}/>
            <Route path="/login" element={
            <>
            <Login onValidate={validateUser} loginData={loginData}/>
            <div className='error-message'>
              {showErrorMessage}
            </div>
            </>
            }
            />
            <Route path="/profile"  element={
              //  <Protected isLoggedIn={isLoggedIn}>
                  <Profile fetchShoesForRunner={fetchShoesForRunner} data={data} removeShoe={removeShoe} addShoe={addShoe} update={update} userId={userId} loginData={loginData}/>
              // </Protected>
            }/>
            <Route path="/signup" element={<SignUp fetchShoesForRunner={fetchShoesForRunner} createUser={createUser}/>}/>
            <Route path="/settings" element={<Settings/>}/>
        </Routes>
      </div>
  )
}
