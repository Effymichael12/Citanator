import React from 'react'
import LandingPageHeader from '../Components/LandingPageHeader'
import { Link } from 'react-router-dom'

function LandingPage() {
  return (
    <div className='landing'>
    <div className='landingPage'>
      < LandingPageHeader />
      <div className='page-information'>
        <h1 className='landing-title'>Citations Made Simple</h1>
        <p className='landing-tag'>A perfect platform for students. Free and easy access to essential resources for school </p>
        <div className='landing-options'>
         <Link className='link' to="/cite"> <button className='get-started'> Start Citing</button></Link>
          <p className='explore'>(explore services for free)</p>
        </div>
      </div>
      <div className='page-image'>
        <img src='landing.png' className='landing-image' alt='landing'></img>
      </div>
    </div>

    <div className='services-page'>
          <h1 className='service-title'> Our Services</h1>
          <p className='service-info'> Choose the Service that you need at no cost</p>
          <div className='service-options'>
          <div className='service-box'>
            <img src='citation.png' className='citation-png' alt='citation'></img>
            <h2 className='option-heading'> Citation Machine</h2>
            <p className='option-info'>Choose some of the most popular citation formats to cite your sources. Choose formats such as APA, MLA, Chicago, and AMA. It is compatible for different types of sources such as video, journal, website, and pdf</p>
           <Link className='link' to="/cite"> <button className='choose-option-button'>Start for Free</button></Link>
          </div>
          <div className='service-box'>
            <img src='article.png' className='citation-png' alt='citation'></img>
            <h2 className='option-heading'> Article Finder</h2>
            <p className='option-info'>The article finder searches some of the most popular journal articles online and gets you the best resources. with amazing search capabilities find all the articles you need in one place</p>
            <Link className='link' to='/article'><button className='choose-option-button'>Start for Free</button></Link>
          </div>
          <div className='service-box'>
            <img src='aitest.png' className='citation-png' alt='citation'></img>
            <h2 className='option-heading'> AI detector</h2>
            <p className='option-info'>leverage the capabilities of our AI detector to enhance the quality of your writing, mitigating the risk of inadvertent plagiarism. Utilize this tool to identify and refine sections of your essay.</p>
           <Link className='link' to="/detect"> <button className='choose-option-button'>Start for Free</button></Link>
          </div>
          </div>

      </div>
    </div>
  )
}

export default LandingPage