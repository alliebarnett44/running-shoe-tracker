import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import AddShoe from './AddShoe';
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



function Profile() {
  const location = useLocation();
  const[runnerShoeRecords, setRunnerShoeRecords] = useState([]);
  const [message, setMessage] = useState('');
  const [show, setShow] = useState(false);
  
  const email = location.state.email

  const handleClose = () => setShow(false);
  
  //Load Shoe Data
  const fetchShoesForRunner = async () => {
    const response = await fetch(`http://localhost:6060/runner/${email}`);
    const data = await response.json()
    console.log(data)
    setRunnerShoeRecords(data.shoe_records);
  } 

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


  //Remove Shoe
  const removeShoe = async (shoeRecord) => {
    console.log(shoeRecord)
    console.log(email)
    try {
      let res = await fetch(`http://localhost:6060/delete`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email,
        shoe_record: shoeRecord
      })
    });
    if (res.status === 200) {
      setMessage("Removed Shoe");
      fetchShoesForRunner();
      handleClose();
    } else {
      setMessage("Some error occured");
    } 
  } catch (err) {
      console.log(err);}
    }


  useEffect(() => {
    console.log(location)
    fetchShoesForRunner();
  }, [setRunnerShoeRecords])

  console.log(runnerShoeRecords);
  

  return (
    <div className='container'>
      <h2>Hello {location.state.email}! </h2>
      <table className='table'>
        <tbody>
          <tr className='table-header'>
            <th></th>
            <th>Shoe Brand</th>
            <th>Mileage</th>
            <th>Condition</th>
            <th className='edit'>Edit</th>
          </tr>
          {
            runnerShoeRecords.map((shoeRecord) => (
              <tr className='table-data' key={shoeRecord.id}>
                <td><img src={shoeLogo(shoeRecord.shoe_brand)} alt="Logo" className='table-logo'/></td>
                <td>{shoeRecord.shoe_brand}</td>
                <td>{shoeRecord.mileage}</td>
                <td>{shoeRecord.condition}</td>
                <td>
                  <AddMileage shoe={shoeRecord.id} shoe_brand={shoeRecord.shoe_brand} mileage={shoeRecord.mileage} fetchShoesForRunner={fetchShoesForRunner} email={email}/>
                  <RemoveShoeModal shoeRecord={shoeRecord} removeShoe={removeShoe}/>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <AddShoe email={email} fetchShoesForRunner={fetchShoesForRunner}/>
      <br></br>
      <br></br>
      <></>
      <a href='./login'>Sign Out</a>

    </div>
  )
}
  
  export default Profile


          
