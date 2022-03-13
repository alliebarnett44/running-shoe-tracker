import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import AddMileage from "./AddMileage";
import AddShoe from './AddShoe'

function Profile() {
  const[runnerRecord, setRunnerRecord] = useState({});
  const location = useLocation();
  

  useEffect(() => {
    console.log(location)
    const fetchShoesForUser = async () => {
      const response = await fetch(`http://localhost:6060/shoes/${location.state.email}`);
      const data = await response.json()
      console.log(data)
      setRunnerRecord(data.runnerRecord)
    } 
    fetchShoesForUser();
  }, [])
  
  console.log(runnerRecord);

  return (
    <div className='container'>
      <table className='table'>
        <tbody>
          <tr className='table-header'>
            <th>User Name</th>
            <th>Shoe Brand</th>
            <th>Mileage</th>
            <th>Condition</th>
          </tr>
          <tr className='table-data'>
            <td>{runnerRecord.email}</td>
            <td>{runnerRecord.shoe_brand}</td>
            <td>{runnerRecord.mileage}</td>
            <td>{runnerRecord.condition}</td>
          </tr>
        </tbody>
      </table>
      <AddMileage />
      <AddShoe />
      <a href='./login'>Back to Login Page</a>
    </div>
  )
}
  
  export default Profile
