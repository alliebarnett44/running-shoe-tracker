import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import AddMileage from "./AddMileage";
import AddShoe from './AddShoe'

function Profile() {
  const[runnerShoeRecords, setRunnerShoeRecords] = useState([]);
  const location = useLocation();
  

  useEffect(() => {
    console.log(location)
    const fetchShoesForRunner = async () => {
      const response = await fetch(`http://localhost:6060/runner/${location.state.email}`);
      const data = await response.json()
      console.log(data)
      setRunnerShoeRecords(data.shoe_records)
    } 
    fetchShoesForRunner();
  }, [])
  
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
              <tr className='table-data'>
                <td>{shoeRecord.shoe_brand}</td>
                <td>{shoeRecord.mileage}</td>
                <td>{shoeRecord.condition}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <AddMileage />
      <AddShoe />
      <a href='./login'>Back to Login Page</a>
    </div>
  )
}
  
  export default Profile
