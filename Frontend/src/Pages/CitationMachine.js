import React from 'react'
import { useState } from 'react'
import LandingPageHeader from '../Components/LandingPageHeader'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CitationMachine() {
  const [Format, setFormat] = useState("");
  const [type, setType] = useState("")
  const [Url, setUrl] = useState("")
  const [isLoading, setisLoading] = useState(false)
  

  const handleFormatSelection = (format) =>{
    setFormat(format)
  }
  const handleTypeSelection = (type) =>{
    setType(type)
  }
  const handleSubmit = async(e) =>{
    e.preventDefault();
    setisLoading(true)
    toast("Creating Citation", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      }); // Set the error from the JSON response

    try {
      const response = await fetch(process.env.REACT_APP_CITEROTUE, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ Format, type, Url })
      });
  
      const json = await response.json();
  
      if (!response.ok) {
        toast.error("Citation Failed", {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          }); // Set the error from the JSON response
          setisLoading(false)
        return;
      }
  
      if (response.ok) {
        localStorage.setItem(`Citation`, JSON.stringify(json));
        toast.success("Citation Created", {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
        setTimeout(()=>{
          window.location.href = '/citelist'
        },1599)
        setisLoading(false)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        }); // Set the error from the JSON response
      return;
    }
  }
  return (
    <div className='citation-machine'>
      <LandingPageHeader></LandingPageHeader>
      <h1 className='citation-title'> Start Citing</h1>
      <p className='citation-slogan'> Paste a link to get started</p>
      <form onSubmit={handleSubmit} className='citation-form'>
      <div className='paste-here'>
        <button disabled={true} className='paste-button'>Paste Here</button>
        <input onChange={(e)=>setUrl(e.target.value)} value={Url} className='paste-input'></input>
      </div>
      <div className='format'>
        <div className='format-option'>
          <div className={`mark-box ${Format === "MLA"?'selected':''}`} onClick={()=>handleFormatSelection('MLA')}></div>
          <p> MLA</p>
        </div>
        <div className='format-option'>
        <div className={`mark-box ${Format === "APA"?'selected':''}`} onClick={()=>handleFormatSelection('APA')}></div>
          <p> APA</p>
        </div>
        <div className='format-option'>
        <div className={`mark-box ${Format === "AMA"?'selected':''}`} onClick={()=>handleFormatSelection('AMA')}></div>
          <p> AMA</p>
        </div>
        <div className='format-option'>
        <div className={`mark-box ${Format === "Chicago"?'selected':''}`} onClick={()=>handleFormatSelection('Chicago')}></div>
          <p> Chicago</p>
        </div>


      </div>
      <div className='type'>
      <div className='type-option'>
      <div className={`mark-box ${type === "Article"?'selected':''}`} onClick={()=>handleTypeSelection('Article')}></div>
          <p> Article</p>
        </div>
        <div className='type-option'>
        <div className={`mark-box ${type === "Website"?'selected':''}`} onClick={()=>handleTypeSelection('Website')}></div>
          <p> Website</p>
        </div>
        <div className='type-option'>
        <div className={`mark-box ${type === "Video"?'selected':''}`} onClick={()=>handleTypeSelection('Video')}></div>
          <p> Video</p>
        </div>
        <div className='type-option'>
        <div className={`mark-box ${type === "Book"?'selected':''}`} onClick={()=>handleTypeSelection('Book')}></div>
          <p> Book</p>
        </div>
        <div className='type-option'>
        <div className={`mark-box ${type === "Journal"?'selected':''}`} onClick={()=>handleTypeSelection('Journal')}></div>
          <p> Journal</p>
        </div>
      </div>
      <button  type='submit' className='create-citation-button'> {isLoading ? "loading...":"Create Citation"}</button>
      </form>
      <ToastContainer position="bottom-right"
autoClose={3000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light" />
    </div>
  )
}

export default CitationMachine