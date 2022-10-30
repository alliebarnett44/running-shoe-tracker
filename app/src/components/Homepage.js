import React from 'react'
import Allie from '../logos/allie.png'


const Homepage = () => {

  return (
    // <div>
    //   <img src={Allie} alt="Logo" className='photo' href='#/'/>
    //   <h1>Keep track of your running shoes. Never run on old shoes!</h1>
    // </div>
    <div className='rst' style={{ backgroundImage: `url(${Allie})` }}>
      {/* <img src={Allie} alt="Logo" className='photo' href='#/'/> */}
      <h1>Keep track of your running shoes. Never run on old shoes!</h1>
    </div> 
    
  )
}

export default Homepage


{/* <div className='rst' style={{ backgroundImage: `url(${Allie})` }}>
    //   <img src={Allie} alt="Logo" className='photo' href='#/'/>
    //   <h1>Keep track of your running shoes. Never run on old shoes!</h1>
    // </div> */}