import React, { useEffect, useState } from 'react';
import LandingPageHeader from '../Components/LandingPageHeader';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

function AiDetector() {
  const [count, setCount] = useState("");
  const [textInput, setTextInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [credit, setCredit] = useState(3);

  useEffect(() => {
    const storedCredit = localStorage.getItem('Credit');
    if (!storedCredit) {
      setCredit(3);
    } else {
      setCredit(parseInt(storedCredit, 10));
    }
  }, []);

  const handleWordCountandDetect = async (e) => {
    const data = e.target.value.split(' ');
    setCount(data.length + "/");
    setTextInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (credit <= 0) {
      toast.error('No credits left. Please subscribe to get more checks.', {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    const options = {
      method: 'GET',
      url: process.env.REACT_APP_AIURL,
      params: {
        text: textInput,
      },
      headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_KEY,
        'X-RapidAPI-Host': process.env.REACT_APP_HOST,
      },
    };

    try {
      const response = await axios.request(options);
      setIsLoading(false);

      toast("Detecting...", {
        position: "bottom-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      if (credit > 0) {
        setCredit(credit - 1);
        localStorage.setItem('Credit', credit - 1);
      }

      localStorage.setItem('ai-detected-data', JSON.stringify(response.data));

      setTimeout(() => {
        window.location.href = '/results';
      }, 1500);
    } catch (error) {
      console.error(error);
      toast.error(error, {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setIsLoading(true);
    }
  };

  return (
    <div className='detector'>
      <LandingPageHeader />
      <h1 className='ai-title'> Ai Detector </h1>
      <p className='ai-subtitle'> save yourself from plagiarism! Check now for free</p>
      <form onSubmit={handleSubmit} className='ai-form'>
        <p className='ai-instructions'> Paste your text here: <span>{count}500</span> words maximum</p>
        <textarea onChange={(e) => handleWordCountandDetect(e)} className='ai-text-input'></textarea>
        <p className='credits'>you have <span>{credit} </span>credits left</p>
        <p className='subscribe'> Subscribe and get multiple checks for just $1.59/month</p>
        <button type='submit' className='check-button' disabled={isLoading || credit <= 0}>
          {isLoading ? "Detecting..." : 'Check'}
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default AiDetector;
