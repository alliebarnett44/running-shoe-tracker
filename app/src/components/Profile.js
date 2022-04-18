import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import AddRun from "./AddRun";
import AddShoe from './AddShoe';
import AddMileage from './AddMileage';
import RemoveShoe from './RemoveShoe';
import { v4 as uuid } from 'uuid';

function Profile() {
  const location = useLocation();
  const[runnerShoeRecords, setRunnerShoeRecords] = useState([]);
  
  const email = location.state.email
  
  const fetchShoesForRunner = async () => {
    const response = await fetch(`http://localhost:6060/runner/${email}`);
    const data = await response.json()
    console.log(data)
    setRunnerShoeRecords(data.shoe_records)
  } 
 
  useEffect(() => {
    console.log(location)
    fetchShoesForRunner();
  }, [setRunnerShoeRecords])

  console.log(runnerShoeRecords);
  

  return (
    <div className='container'>
      <h2>Hello {location.state.email}!</h2>
      <table className='table'>
        <tbody>
          <tr className='table-header'>
            <th>Shoe Brand</th>
            <th>Mileage</th>
            <th>Condition</th>
          </tr>
          {
            runnerShoeRecords.map((shoeRecord) => (
              <tr className='table-data' key={shoeRecord.id}>
                <td>{shoeRecord.shoe_brand}</td>
                <td>{shoeRecord.mileage}</td>
                <td>{shoeRecord.condition}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    
      <AddMileage email = {email} fetchShoesForRunner = {fetchShoesForRunner}/>
      <AddShoe email = {email} fetchShoesForRunner = {fetchShoesForRunner}/>
      <AddRun shoes = {runnerShoeRecords} />
      <a href='./login'>Back to Login Page</a>

    </div>
  )
}
  
  export default Profile


  // <h2> Add a Shoe </h2>
  //     <form>
  //       <input type='text' name='shoe_brand' required='required' placeholder='Enter Shoe Brand' onChange={handleAddFormChange}></input>
  //       <input type='text' name='mileage' required='required' placeholder='Enter Mileage' onChange={handleAddFormChange}></input>
  //       <input type='text' name='condition' required='required' placeholder='Enter Condition' onChange={handleAddFormChange}></input>
  //       <button type='submit' onSubmit={handleSubmit}>Add</button>
  //     </form>
