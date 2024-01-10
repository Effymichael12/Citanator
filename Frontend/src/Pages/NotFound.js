import React from 'react'
import LandingPageHeader from '../Components/LandingPageHeader'
function NotFound() {
  return (
    <div className='Not Found'>
    <LandingPageHeader />
    <div className='Sorry'>
      <img src='404.png' className='sorry-pic' alt='sorry'></img>
    </div>
    </div>
  )
}

export default NotFound