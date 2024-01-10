import React from 'react'
import LandingPageHeader from '../Components/LandingPageHeader'
import { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom'
function CitationList() {
  const [image, setImage] = useState(null)
  const [webTitle, setWebTitle] = useState("")
  const [publishedDate, setPublishedDate] = useState("")
  const [website, setWebsite] = useState("")
  const [author, setAuthor] = useState("")
  const [citeerror, setCiteError] = useState("")
  const [url, setUrl] = useState("")
  const [today, setToday] = useState("")
  const [findFormat, setfindFormat] = useState("")
  const [format, setFormat] = useState("")
  
useEffect(()=>{
  // eslint-disable-next-line
  let isCancelled = false
  const getCtations = () =>{
    try {
      const citationStorage = localStorage.getItem('Citation');

      // Check for errors in the stored data
    
      const data = JSON.parse(citationStorage);
      if(data && data.citation && Array.isArray(data.citation)){
        data.citation.forEach(entry =>{
          if(entry.format){
            setfindFormat(entry.format)

          }
          if(entry.title){
            setWebTitle(entry.title)
          }
          if(entry.author){
            setAuthor(entry.author)
          }
          if(entry.publishedDate){
            if(entry.publishedDate === "undefined NaN NaN"){
              setPublishedDate("")
              if(publishedDate === ""){
                setCiteError('Error Getting Published Date')
              }
            }
          }
          if(entry.websiteName){
            setWebsite(entry.websiteName)
          }
          if(entry.todayDate){
            setToday(entry.todayDate)
          }
          if(entry.Link){
          setUrl(entry.Link)
          }
         
          if(entry.errors){
            setCiteError(entry.errors)
           
          if( Array.isArray(entry.errors) && entry.errors.length === 0){
            setImage( <svg fill='green' xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512"><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>)
          }
          if(Array.isArray(entry.errors) && entry.errors.length > 0){
            setImage(  <svg fill='#FFA500' xmlns="http://www.w3.org/2000/svg" height="16" width="2" viewBox="0 0 64 512"><path d="M64 64c0-17.7-14.3-32-32-32S0 46.3 0 64V320c0 17.7 14.3 32 32 32s32-14.3 32-32V64zM32 480a40 40 0 1 0 0-80 40 40 0 1 0 0 80z"/></svg>
            )
          }
          }
        })
      }
     if(Array.isArray(data)){
      data.forEach(entry =>{
        if(entry.format){
          setfindFormat(entry.format)

        }
        if(entry.title){
          setWebTitle(entry.title)
        }
        if(entry.author){
          setAuthor(entry.author)
        }
        if(entry.publishedDate){
          setPublishedDate(entry.publishedDate)
          if(publishedDate === undefined){
            setPublishedDate("")
          }
        }
        if(entry.websiteName){
          setWebsite(entry.websiteName)
        }
        if(entry.todayDate){
          setToday(entry.todayDate)
        }
        if(entry.Link){
        setUrl(entry.Link)
        }
       
        if(entry.errors){
          setCiteError(entry.errors)
         
        if( Array.isArray(entry.errors) && entry.errors.length === 0){
          setImage( <svg fill='green' xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512"><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>)
        }
        if(Array.isArray(entry.errors) && entry.errors.length > 0){
          setImage(  <svg fill='#FFA500' xmlns="http://www.w3.org/2000/svg" height="16" width="2" viewBox="0 0 64 512"><path d="M64 64c0-17.7-14.3-32-32-32S0 46.3 0 64V320c0 17.7 14.3 32 32 32s32-14.3 32-32V64zM32 480a40 40 0 1 0 0-80 40 40 0 1 0 0 80z"/></svg>
          )
        }
        }
      })
     }
     
    } catch (error) {
      console.error(error);
    }
  };
  getCtations();
  return () =>{
    isCancelled = true
  }
// eslint-disable-next-line
},[])
useEffect(() =>{
  if(findFormat === 'MLA'){
    const splitName = author.split(' ');
    const reverse = splitName.reverse().join(' ')
    setFormat(reverse + ", " + webTitle + ", " + website+ ", " + publishedDate + ", " + today +", " +  url)
  }
  if(findFormat === 'APA'){
    setFormat(author + ", " +publishedDate+ ", " + webTitle+ ", " + website  + ", " + today +", " +  url)
  }
  if(findFormat === 'AMA'){
    setFormat(author + ", " +webTitle+ ", " +website + ", " + publishedDate  + ", " + today +", " + url)
  }
  if(findFormat === "Chicago"){
    const splitName = author.split(' ');
    const reverse = splitName.reverse().join('')
    setFormat(reverse + ", " + webTitle + ", " + website+ ", " + publishedDate + ", " + today +", " + url)

  }
},[findFormat, author, webTitle, publishedDate, website, url, today])
const handleCopy = () => {
  try {
    const content = document.querySelector("#content");
    const range = document.createRange();
    range.selectNode(content);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    
    document.execCommand('copy');

    console.log('Text was copied');
  } catch (error) {
    console.error('Error copying text:', error);
  }
  toast('Citation Copied!', {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    });
};


  return (
    <div className='citationlist'>
      <LandingPageHeader />
      <h1 className="citation-title">Your Citations</h1>
      <p className='citation-slogan'>Your Citation Is Ready</p>
      <div className='citation-list'>
      <h2> Citation</h2>
      <div className='citations'>
      <div className='citation-box'>
      {image}
      </div>
      <p className='citation-area' value={format} id='content'>{format}</p>
      <div className='cite-buttons'>
      <Link className='link' to="/manual"><button className='cite-button'>
      <svg xmlns="http://www.w3.org/2000/svg" fill='white' height="16" width="16" viewBox="0 0 512 512"><path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"/></svg>
         Edit</button></Link>
      <button onClick={handleCopy} className='cite-button'> 
      <svg fill='white' xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512"><path d="M384 336H192c-8.8 0-16-7.2-16-16V64c0-8.8 7.2-16 16-16l140.1 0L400 115.9V320c0 8.8-7.2 16-16 16zM192 384H384c35.3 0 64-28.7 64-64V115.9c0-12.7-5.1-24.9-14.1-33.9L366.1 14.1c-9-9-21.2-14.1-33.9-14.1H192c-35.3 0-64 28.7-64 64V320c0 35.3 28.7 64 64 64zM64 128c-35.3 0-64 28.7-64 64V448c0 35.3 28.7 64 64 64H256c35.3 0 64-28.7 64-64V416H272v32c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V192c0-8.8 7.2-16 16-16H96V128H64z"/></svg>
      Copy
      </button>
      </div>
      </div>
      {citeerror && <p className='error-cite'>{citeerror}</p>}
      </div>
      <ToastContainer
position="bottom-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
/>
    </div>
  )
}

export default CitationList