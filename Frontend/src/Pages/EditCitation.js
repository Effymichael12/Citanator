import React from 'react'
import LandingPageHeader from '../Components/LandingPageHeader'
import { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';

function EditCitation() {
  const [WebTitle, setWebTitle ] = useState("");
  const [Website, setWebsite] = useState("");
  const [Author, setAuthor] = useState("");
  const [Published, setPublished] = useState("");
  const [errors, setErrors] = useState("");
  const [format, setFormat] = useState("");
  const [Type, setType] = useState("");
  const [Today, setToday] = useState("");
  const [url, setUrl] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newWebsite, setNewWebsite] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newPublishd, setNewPublished] = useState("");
  const [newToday, setNewToday] = useState("");
  const [newUrl, setNewUrl] = useState("")
  const [isLoading, setIsloading] = useState(false);

  useEffect(() =>{
          //eslint-disable-next-line
    let isCancelled = false
    const getCitation = () =>{
      try{
        const citationStorage = localStorage.getItem('Citation');
      const data = JSON.parse(citationStorage);
      if(data && data.citation && Array.isArray(data.citation)){
        data.citation.forEach(entry =>{
          if(entry.title){
            setWebTitle(entry.title)
            setNewTitle(entry.title)
          }
          if(entry.websiteName){
            setWebsite(entry.websiteName)
            setNewWebsite(entry.websiteName)
          }
          if(entry.publishedDate){
            setPublished(entry.publishedDate)
            setNewPublished(entry.publishedDate)
          }
          if(entry.errors){
            setErrors("Manually edited")
          }
          if(entry.Type){
            setType(entry.Type)
      
          }
          if(entry.format){
            setFormat(entry.format)
          
          }
          if(entry.author){
            setAuthor(entry.author)
            setNewAuthor(entry.author)
          }
          if(entry.todayDate){
            setToday(entry.todayDate)
            setNewToday(entry.todayDate)
          }
          if(entry.Link){
            setUrl(entry.Link)
            setNewUrl(entry.Link)
          }
        })
      }
      if(Array.isArray(data)){
        data.forEach(entry =>{
          if(entry.title){
            setWebTitle(entry.title)
            setNewTitle(entry.title)
          }
          if(entry.websiteName){
            setWebsite(entry.websiteName)
            setNewWebsite(entry.websiteName)
          }
          if(entry.publishedDate){
            setPublished(entry.publishedDate)
            setNewPublished(entry.publishedDate)
          }
          if(entry.errors){
            setErrors("Manually edited")
          }
          if(entry.Type){
            setType(entry.Type)
      
          }
          if(entry.format){
            setFormat(entry.format)
          
          }
          if(entry.author){
            setAuthor(entry.author)
            setNewAuthor(entry.author)
          }
          if(entry.todayDate){
            setToday(entry.todayDate)
            setNewToday(entry.todayDate)
          }
          if(entry.Link){
            setUrl(entry.Link)
            setNewUrl(entry.Link)
          }
        })
      }
      }
      catch(error){
        console.log(error)
        toast.error(error.message, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          }); // Set the error
      }
    }
    getCitation();
    return () => {
      //eslint-disable-next-line
      isCancelled = true
  }
  },[])

  const handleUpdate = async(e) => {

    e.preventDefault();
    const response = await fetch(process.env.REACT_APP_UPDATEROUTE, {
      method:'POST', 
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({newAuthor, newWebsite, newPublishd, newTitle, newUrl, newToday, errors, format, Type})
    })
    const json = await response.json();
    if(!response.ok){
      setIsloading(false)
      toast.error("Citation Update Failed", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        }); // Set the error from the JSON response
      return;
    }
    if(response.ok){
      setIsloading(true)
      toast.success("Citation Updated", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        }); // Set the error from the JSON response
        localStorage.setItem('Citation', JSON.stringify( json.citation));
        setTimeout(()=>{
          window.location.href="/citelist"
        },1899)

      return;
    }
    
    console.log('updated successfully');
  };


  return (
    <div className='editcitation'>
      <LandingPageHeader />
      <h1 className='manual-title'> Your Citation</h1>
      <p className='manual-subtitle'> Manually edit or create citation</p>
      <div className='sub-title'>  
      <h2> Manual Citation</h2>
      </div>
      <form onSubmit={handleUpdate} className='citation-form'>
        <div className='manual-form'>
          <div className='left-side-form'>
            <label className='label'>Author</label>
            <input
              name='author'
              defaultValue={Author}
              onChange={(e) => setNewAuthor(e.target.value)}
              className='form-input'
            ></input>
            <label className='label'>Website Name</label>
            <input
              name='websiteName'
              defaultValue={Website}
              onChange={(e) =>setNewWebsite(e.target.value)}
              className='form-input'
            ></input>
            <label className='label'>Website Title</label>
            <input
              name='title'
              defaultValue={WebTitle}
              onChange={(e)=>setNewTitle(e.target.value)}
              className='form-input'
            ></input>
          </div>
          <div className='right-side-form'>
            <label className='label'>Date Published</label>
            <input
              name='publishedDate'
              defaultValue={Published}
              className='form-input'
              onChange={(e) => setNewPublished(e.target.value)}
            ></input>
            <label className='label'>Date Accessed</label>
            <input
              name='todayDate'
              defaultValue={Today}
              className='form-input'
              onChange={(e) => setNewToday(e.target.value)}
            ></input>
            <label className='label'>Url</label>
            <input onChange={(e) =>setNewUrl(e.target.value)} name='Link' defaultValue={url}  className='form-input'></input>
          </div>
        </div>
        <button type='submit' className='create-manual-button'>
         {isLoading ? "Loading..." : "Update"}
        </button>
      </form>
      <ToastContainer />

    </div>
  )
}

export default EditCitation