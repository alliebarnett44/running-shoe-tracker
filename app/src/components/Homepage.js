import React from 'react'
import Allie from '../logos/allie.png'


const Homepage = () => {

  return (
    <div className="container">
      <p>This is the Homepage</p>
      <br/>
      <p>Keep track of your running shoes. Never run on old shoes!</p>
      <img src={Allie} alt="Logo" className='photo' href='#/'/>
    </div>
    
  )
}

export default Homepage


// import img from '/images/download.png'
/* <div className="logo">
        <img src={img} />
      </div> */

{/* <a href='./profile'>Link to Profile</a> */}