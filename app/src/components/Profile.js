import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { Table, TableBody, TableRow } from '@mui/material'
import AddShoe from './AddShoe';
import AddFirstShoe from './AddFirstShoe';
import RemoveShoeModal from './RemoveShoeModal'
import AddMileage from './AddMileage';
import nikeLogo from '../logos/nikelogo.png'
import defaultLogo from '../logos/oldlogo.png'
import reebokLogo from '../logos/reeboklogo.png'
import adidasLogo from '../logos/adidaslogo.png'
import brooksLogo from '../logos/brookslogo.png'
import mizunoLogo from '../logos/mizunologo.png'
import nbLogo from '../logos/newbalancelogo.png'
import asicsLogo from '../logos/asicslogo.png'
import Login from './Login.js'




const Profile = ({ fetchShoesForRunner, data, removeShoe, addShoe, update, loginData }) => {
  console.log(loginData)

  const location = useLocation();
  const userId = location.state.userId
  console.log(userId)



  //Get Shoe Logo
  const shoeLogo = (brand) => {
    if(brand === 'Nike' || brand === 'nike'){
      return(nikeLogo)
    } else if(brand === 'Adidas' || brand === 'adidas'){
      return(adidasLogo)
    } else if(brand === 'Reebok' || brand === 'reebok'){
      return(reebokLogo)
    } else if(brand === 'Brooks' || brand === 'brooks'){
      return(brooksLogo)
    } else if(brand === 'Mizuno' || brand === 'mizuno') {
      return(mizunoLogo)
    } else if(brand === 'New Balance' || brand === 'new balance') {
      return(nbLogo)
    }  else if(brand === 'Asics' || brand === 'asics') {
      return(asicsLogo)
    }
    else {
      return(defaultLogo)
    }
  }

  
  const isEmptyObject = (obj) => {
      return JSON.stringify(obj) === {};
  }


  useEffect(() => {
    console.log(location)
    // fetchShoesForRunner(userId);
  })
  

if(loginData.shoe_records.length == 0){
  return (
    <div className='container-2'>
      <div>Hello {loginData.firstName}!</div>
      <p>Start keeping track of your running shoes by adding shoes below.</p>
      <AddShoe className="button" userId={userId} fetchShoesForRunner={fetchShoesForRunner} addShoe={addShoe}/>
      {/* <AddFirstShoe userId={userId} fetchShoesForRunner={fetchShoesForRunner}/> */}
    </div>
  ) 
} 
// // else if (!runnerShoeRecords.length) 
// else if (runnerShoeRecords == undefined) {
//   return (
//     <div>
//       <div>Hello {firstName}!</div>
//       <p>Start keeping track of your running shoes by adding shoes below.</p>
//       <AddShoe className="button" userId={userId} fetchShoesForRunner={fetchShoesForRunner}/>
//     </div>
//   ) 
// } 
else {
  return (
    <div className='container'>
      <h2>Hello {loginData.firstName}! </h2>
      <Table className='table'>
        <TableBody>
          <TableRow className='table-header'>
            <th></th>
            <th>Shoe Brand</th>
            <th>Shoe Model</th>
            <th>Mileage</th>
            <th>Condition</th>
            <th className='edit'>Edit</th>
          </TableRow>
          {
            loginData.shoe_records.map((shoeRecord) => (
              <TableRow className='table-data' key={shoeRecord.shoeRecordId}>
                <td><img src={shoeLogo(shoeRecord.shoe_brand)} alt="Logo" className='table-logo'/></td>
                <td>{shoeRecord.shoe_brand}</td>
                <td>{shoeRecord.shoe_model}</td>
                <td>{shoeRecord.mileage}</td>
                <td>{shoeRecord.condition}</td>
                <td>
                  <AddMileage className="button" shoe_id={shoeRecord.shoeRecordId} shoe_brand={shoeRecord.shoe_brand} mileage={shoeRecord.mileage} fetchShoesForRunner={fetchShoesForRunner} userId={userId} update={update} /> 
                  <RemoveShoeModal shoeRecord={shoeRecord} removeShoe={removeShoe} userId={userId}/>
                </td>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
      <AddShoe className="button" userId={userId} fetchShoesForRunner={fetchShoesForRunner} addShoe={addShoe}/>
      <br></br>
      <br></br>
      <></>
      <a href='./login'>Sign Out</a>

    </div>
  )
}
}

  
export default Profile


          
