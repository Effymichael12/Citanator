import React, { useState } from 'react';
import LandingPageHeader from '../Components/LandingPageHeader';
import { ToastContainer, toast } from 'react-toastify';

function ArticleFinder() {
  const [search, setSearch] = useState("");
  const [articles, setArticles] = useState([]);
  const [isLoading, setisLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const response = await fetch(process.env.REACT_APP_ARTICLEFINDER , {
      method: "POST",
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ search })
    });

    const jsonResponse = await response.json();


    if (!response.ok) {
      isLoading(false)
      toast.error(jsonResponse.error, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    if (jsonResponse.result && jsonResponse.result.length > 0) {
      setisLoading(true);
      toast('Searching', {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      toast.success('Found some articles', {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });

      setArticles(jsonResponse.result);
    } else {
      toast.error('Could not find any articles', {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
  }
  const createCitation = async (url) => {
    try {
      
      // Create a textarea element
      const textarea = document.createElement('textarea');
      textarea.value = url;
  
      // Append the textarea to the document
      document.body.appendChild(textarea);
  
      // Select the text in the textarea
      textarea.select();
  
      // Copy the selected text to the clipboard
      document.execCommand('copy');
  
      // Remove the textarea from the document
      document.body.removeChild(textarea);
  
      console.log('Text was copied');
    } catch (error) {
      console.error('Error copying text:', error);
      toast.error('Error copying url!', {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  
    toast('Citation Url was copied to clipboard!', {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  
    setTimeout(() => {
      window.location.href = '/cite';
    }, 1500);
  };
  const redirect = (e) =>{
    window.open(e.target.value)
  }
 

  return (
    <div>
      <LandingPageHeader />
      <div className='article-finder'>
        <h1 className='finder-title'> Article Finder</h1>
        <p className='finder-slogan'> Find articles for your paper</p>
        <form onSubmit={handleSubmit} className='search-bar-finder'>
          <input onChange={(e) => setSearch(e.target.value)} value={search} className='search-input'></input>
          <button type='submit' className='search-article-button'>
            <svg fill='white' xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg>
            {isLoading ? "Searching.." : "Search"}
          </button>
        </form>
        <div className='article-list'>
          {articles.length > 0 ? (
            articles.map((result, index) => (
              <div key={index} className='article-itself'>
                <p className='article-name'>{result.title}</p>
                <p className='article-name'>{result.date}</p>
                <div className='article-options'>
                  <button onClick={()=>createCitation(result.url)} value={result.url} className='cite-article-button'>
                    <svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" fill='white' viewBox="0 0 448 512"><path d="M96 0C43 0 0 43 0 96V416c0 53 43 96 96 96H384h32c17.7 0 32-14.3 32-32s-14.3-32-32-32V384c17.7 0 32-14.3 32-32V32c0-17.7-14.3-32-32-32H384 96zm0 384H352v64H96c-17.7 0-32-14.3-32-32s14.3-32 32-32zm32-240c0-8.8 7.2-16 16-16H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16zm16 48H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16s7.2-16 16-16z"/></svg>
                    Cite
                  </button>
                  <button onClick={redirect}  value={result.url} className='visit-article-button'>
                    <svg fill='white' xmlns="http://www.w3.org/2000/svg" height="16" width="20" viewBox="0 0 640 512"><path d="M579.8 267.7c56.5-56.5 56.5-148 0-204.5c-50-50-128.8-56.5-186.3-15.4l-1.6 1.1c-14.4 10.3-17.7 30.3-7.4 44.6s30.3 17.7 44.6 7.4l1.6-1.1c32.1-22.9 76-19.3 103.8 8.6c31.5 31.5 31.5 82.5 0 114L422.3 334.8c-31.5 31.5-82.5 31.5-114 0c-27.9-27.9-31.5-71.8-8.6-103.8l1.1-1.6c10.3-14.4 6.9-34.4-7.4-44.6s-34.4-6.9-44.6 7.4l-1.1 1.6C206.5 251.2 213 330 263 380c56.5 56.5 148 56.5 204.5 0L579.8 267.7zM60.2 244.3c-56.5 56.5-56.5 148 0 204.5c50 50 128.8 56.5 186.3 15.4l1.6-1.1c14.4-10.3 17.7-30.3 7.4-44.6s-30.3-17.7-44.6-7.4l-1.6 1.1c-32.1 22.9-76 19.3-103.8-8.6C74 372 74 321 105.5 289.5L217.7 177.2c31.5-31.5 82.5-31.5 114 0c27.9 27.9 31.5 71.8 8.6 103.9l-1.1 1.6c-10.3 14.4-6.9 34.4 7.4 44.6s34.4 6.9 44.6-7.4l1.1-1.6C433.5 260.8 427 182 377 132c-56.5-56.5-148-56.5-204.5 0L60.2 244.3z"/></svg>
                    Visit
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No articles found</p>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default ArticleFinder;
