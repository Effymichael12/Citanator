import React, { useEffect } from 'react'
import LandingPageHeader from '../Components/LandingPageHeader'
import { useState } from 'react'
import CircularProgression from '../Components/CircularProgression'
function AIresults() {
  const [percentage, setPercentage] = useState(0)
  const [sentenceCount, setsentenceCount] = useState("");
  const [aiWords, setaiWords] = useState("");
  const [credit, setCredit] = useState("")
  const [data, setData] = useState("")


 

  useEffect(()=>{
    // eslint-disable-next-line
    let isCancelled = false
    const setDetectedData = () =>{
      const detectedData = localStorage.getItem('ai-detected-data');
      const data = JSON.parse(detectedData);
      setData(data)
      if (data) {
        // Assuming data is an object with properties
        if (data.AI_Sentence_Count) {
          setsentenceCount(data.AI_Sentence_Count);
        }
        if (data.AI_Words) {
          setaiWords(data.AI_Words);
        }
        if (data.Ai_Written) {
          setPercentage(parseFloat(data.Ai_Written));
        }
      }
    }
    setDetectedData()
    return () =>{
      // eslint-disable-next-line
      isCancelled = true
    } 
  },[])
  useEffect(() =>{
    const storedCredit = localStorage.getItem('Credit');
    setCredit(storedCredit)
  },[])

  console.log(percentage)
  return (
    <div className='results-page'>
      <LandingPageHeader />
      <h1 className='ai-title'> Ai Detector </h1>
      <p className='ai-subtitle'> save yourself from plagiarism! Check now for free</p>
      <CircularProgression percentage={percentage} circleWidth="200" />
      <div className='ai-detection-data'>

       <div className='words'>
       <div className='left-side-data'>
        <div className='ai-svg-box'>
        <svg fill='white' xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512"><path d="M254 52.8C249.3 40.3 237.3 32 224 32s-25.3 8.3-30 20.8L57.8 416H32c-17.7 0-32 14.3-32 32s14.3 32 32 32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32h-1.8l18-48H303.8l18 48H320c-17.7 0-32 14.3-32 32s14.3 32 32 32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H390.2L254 52.8zM279.8 304H168.2L224 155.1 279.8 304z"/></svg>
        </div>
        <h3> Words By AI</h3>
        </div>
        <div className='right-side-data'>
        <h2> {aiWords}</h2>
        </div>
       </div>

      <div className='sentences'>
      <div className='left-side-data'>
        <div className='ai-svg-box'>
        <svg fill='white' xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512"><path d="M32 288c-17.7 0-32 14.3-32 32s14.3 32 32 32l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L32 288zm0-128c-17.7 0-32 14.3-32 32s14.3 32 32 32l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L32 160z"/></svg>
        </div>
        <h3> Sentences by AI</h3>
        </div>
        <div className='right-side-data'>
        <h2> {sentenceCount}</h2>
        </div>
      </div>

      </div>
      <p className='sentences-title'> Sentences detected as AI written</p>

      <div className='ai-detected-sentences'>
        {data && Array.isArray(data.Ai_sentences) && (
    <div>
      {data.Ai_sentences.map((sentence, index) => (
        <div key={index} className='sentence'>
          <p>{`"${sentence}"`}</p>
        </div>
      ))}
    </div>
  )}
      </div>
      <div className='remaining-credits'>
        <p>You have <span>{credit} </span>chances remaining</p>
        <h3 className='subscription'> Start a subscription for just $1.59/m and get multiple checks</h3>

      </div>
    </div>
  )
}

export default AIresults