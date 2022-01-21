import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';

function Profile() {
  const[runnerRecord, setRunnerRecord] = useState({});
  const location = useLocation();


  useEffect(() => {
    const fetchShoesForUser = async () => {
      const response = await fetch(`http://localhost:6060/shoes/allie.barnett44@gmail.com`);
      const data = await response.json()
      console.log(data)
      setRunnerRecord(data)
    } 
    fetchShoesForUser();
  }, [])
  

  return (
    <div className="Home">
      <table>
        <tr>
          <th>User Name</th>
          <th>Shoe Brand</th>
          <th>Mileage</th>
          <th>Condition</th>
        </tr>
          <td>{runnerRecord.first_name}</td>
          <td>{runnerRecord.shoe_brand}</td>
          <td>{runnerRecord.mileage}</td>
          <td>{runnerRecord.condition}</td>
      </table>
    </div>
  )
}
  
  export default Profile
