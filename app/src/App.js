import React from "react";
import { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Header from './components/Header'
import Login from './components/Login'
import Homepage from "./components/Homepage";
import AddShoe from "./components/AddShoe";
import Profile from "./components/Profile";

export default function App() {
  
  // const[showAddShoe, setShowAddShoe] = useState(false)
  const [shoes, setShoes] = useState([])

  useEffect(() => {
    const fetchShoes = async () => {
      const res = await fetch('http://localhost:6060')
      const data = await res.json()

      console.log(data)
    }

    fetchShoes()
  }, [])

  const addShoe = async (shoe) => {
    const res = await fetch('http://localhost:6060/shoes', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(shoe),
    })
    const data = await res.json()

    setShoes([...shoes, data])
  }


  // useEffect(() => {
  //   const fetchShoes = async () => {
  //     const shoesFromServer = await fetchShoes()
  //     setShoes(shoesFromServer)
  //   }
    
  //   fetchShoes()
  // }, [])

  // //Fetch shoes from API
  //  const fetchShoes = async() => {
  //   const res = await fetch('http://localhost:6060/shoes')
  //   const data = await res.json()

  //   console.log(data)
  // }

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
      <div className="container">
        <Header/>
        <Route 
          path="/" 
          exact
          render={(props) => (
            <Homepage />
            )} />

        <Route path="/Login" component={Login}/>
        <Route path="/Profile" render={() =>
          <div>
            <Profile />
            <AddShoe onAdd={addShoe}/>
          </div>
        }/>
      </div>
    </Router>
  )
}






// export default function App() {
//   return (
//     <Router>
//       <div>
//         <ul>
//           <li>
//             <Link to="/home">Home</Link>
//           </li>
//           <li>
//             <Link to="/">Login</Link>
//           </li>
//         </ul>

//         <hr />

//         {/*
//           A <Switch> looks through all its children <Route>
//           elements and renders the first one whose path
//           matches the current URL. Use a <Switch> any time
//           you have multiple routes, but you want only one
//           of them to render at a time
//         */}
//         <Switch>
//           <Route path="/home">
//             <Home />
//           </Route>
//           <Route exact path="/">
//             <Login />
//           </Route>
//         </Switch>
//       </div>
//     </Router>
//   );
// }

// // You can think of these components as "pages"
// // in your app.


// // import React from 'react';
// // import Navbar from "react-bootstrap/Navbar";
// // import Nav from "react-bootstrap/Nav";
// // import { LinkContainer } from "react-router-bootstrap";
// // import './App.css';
// // import Routes from "./routes";

// // function App() {
// //   return (
// //     <div className="App container py-3">
// //       <Navbar collapseOnSelect bg="light" expand="md" className="mb-3">
// //         <LinkContainer to="/">
// //           <Navbar.Brand className="font-weight-bold text-muted">
// //             TrackyMyShoes
// //           </Navbar.Brand>
// //         </LinkContainer>
// //         <Navbar.Toggle />
// //         <Navbar.Collapse className="justify-content-end">
// //           <Nav activeKey={window.location.pathname}>
// //             <LinkContainer to="/signup">
// //               <Nav.Link>Signup</Nav.Link>
// //             </LinkContainer>
// //             <LinkContainer to="/login">
// //               <Nav.Link>Login</Nav.Link>
// //             </LinkContainer>
// //           </Nav>
// //         </Navbar.Collapse>
// //       </Navbar>
// //       <Routes />
// //     </div>
// //   );
// // }