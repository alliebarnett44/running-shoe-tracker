import React, { Component } from 'react'
import axios from 'axios'
import { render } from 'react-dom';


const Profile = () => {
  return (
    <div>
      <p>This is My Profile</p>
    </div>
  )
}

export default Profile



// const runnerRecord = runnerRecord 

// export default class Profile extends Component {
  
//   constructor() {
//     super();
//     this.state = { runnerRecord: {} };
//   }


// componentDidMount = () => {
//   axios.get("/shoes")
//     .then(res => res.json())
//     .then(response => {console.log(response)}
//     );
// };

// render(){
//   return (
//     <div>
//       <button>Get my Shoe Data</button>
//       <h1>This is my profile</h1>
//       <p>My shoe data: {this.state.runnerRecord} </p>
//     </div>
//   )
// }
// }


// //Profile Page fetching data using username
// export const Profile = () => {
//   const [runnerRecord, setRunnerRecord] = useState({})

//   useEffect(() => {
//     fetch(`http://localhost:6060/shoes/${this.props.location.email}`)
//       .then(res => res.json())
//       .then(
//         (response) => {setRunnerRecord({
//             runnerRecord: response.runnerRecord
//           });
//         }),
//       runnerRecord
//       });

//   return (
//     <div className="Profile">
//       <table>
//         <tr>
//           <th>User Name</th>
//           <th>Shoe Brand</th>
//           <th>Mileage</th>
//           <th>Condition</th>
//           <th>Shoe Age (Months)</th>
//         </tr>
//         {runnerRecord.shoe_records.map((val, key) => {
//           return (
//             <tr key={key}>
//               <td>{runnerRecord.first_name}</td>
//               <td>{val.shoeBrand}</td>
//               <td>{val.mileage}</td>
//               <td>{val.condition}</td>
//               <td>{val.shoeAge}</td>
//             </tr>
//           )
//         })}
//       </table>
//     </div>
//   );
// }

// export default Profile;





// class Home extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { runnerRecord: {} };
//   }

//   componentDidMount() {

//     fetch(`http://localhost:6060/shoes/${this.props.location.email}`)
//       .then(res => res.json())
//       .then(
//         (response) => {
//           this.setState({
//             runnerRecord: response.runnerRecord
//           });
//         },
//         // Note: it's important to handle errors here
//         // instead of a catch() block so that we don't swallow
//         // exceptions from actual bugs in components.
//         (error) => {
//           this.setState({
//             isLoaded: true,
//             error
//           });
//         }
//       )
//   }

//     return (
//       <div className="Profile">
//         <table>
//           <tr>
//             <th>User Name</th>
//             <th>Shoe Brand</th>
//             <th>Mileage</th>
//             <th>Condition</th>
//             <th>Shoe Age (Months)</th>
//           </tr>
//           {this.state.runnerRecord.shoe_records.map((val, key) => {
//             return (
//               <tr key={key}>
//                 <td>{this.state.runnerRecord.first_name}</td>
//                 <td>{val.shoeBrand}</td>
//                 <td>{val.mileage}</td>
//                 <td>{val.condition}</td>
//                 <td>{val.shoeAge}</td>
//               </tr>
//             )
//           })}
//         </table>
//       </div>
//     );
//   }

// export default Profile} 
