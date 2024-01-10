import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
function LandingPageHeader() {
const [showDropdown, setShowDropdown] = useState(false)
  const handleMouseEnter = () =>{
    setShowDropdown(true)
  }
  const handleMouseLeave =() =>{
    setShowDropdown(false)
  }
  return (
    <div className='landing-header'>
    <div className='left-side'>
    <Link className='link' to="/"><img src='headerlogo.png' className='header-logo' alt='header'></img>  </Link>
    </div>     
    <div className='middle-side'>
    <div
          className='services'
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
    <p> Services </p>  
    {showDropdown && (
            <div className='dropdown-menu'>
             <Link className='link' to="/cite"> <p className='menu-option'>Citation Machine</p> </Link>
             <Link to="/article" className='link'><p className='menu-option'>Article Finder</p> </Link>
             <Link to='/detect' className='link'> <p className='menu-option'>AI detector </p></Link>
            </div>
    )}
    </div>
    <p> Developers</p>
    <p> Marketing </p>
    </div>
    <div className='right-side'>
    
    <button className='create-account'> Create Account</button>
    </div>      
     </div>
  )
}

export default LandingPageHeader