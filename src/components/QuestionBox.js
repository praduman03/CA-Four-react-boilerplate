import React,{useState,useEffect} from 'react'
import questions from '../questions'
import Result from './Result'
import img from '../assets/kalvium.png'
import '../App.css'



export default function QuestionBox() {
  const[count,setcount]=useState(0)
  const[textColor, setTextColor]=useState('white')
  const[showresult,setshowresult]=useState(false)
  const[score,setscores]=useState(0)
  const[darkmode,setdarkmode]=useState(false)
  const[lighttext,setlighttext]=useState('Dark mode')


  const increment=(isCorrect)=>{
    if(isCorrect){
      setscores(score+1)
    }
    if(count<4){
    setcount(count+1)
    }
    else{
      setshowresult(true)
    }
  }
  const highlight=()=>{
    setTextColor('red')
  }
  const removehighlight=()=>{
    setTextColor('white')
  }

  useEffect(()=>{
    const body=document.body
    if(darkmode===true){
      body.classList.add('dark-mode')
      setlighttext('Light mode')
    }
    else{
      body.classList.remove('dark-mode')
      setlighttext('Dark mode')
    }
  },[darkmode])
  
  return (
    <div className='body'>
        <div className='Questionnav'>
          <img className='kalvium' src={img} alt="" />
          <div className='themebutton'>
          <input type='checkbox' onClick={()=>darkmode===false? setdarkmode(true):setdarkmode(false)} id='theme'/>
          <label htmlFor="theme">{lighttext}</label>
          </div>
        </div>
        {showresult ?
        (<Result data={score}/>):
        (<div className='flex'>
        <div className='container'>
            <h2>Question: {count+1} out of 5</h2>
            <h1 id='ques' style={{color:textColor}}>{questions[count].text}</h1>
          <div className='optionsdiv'>
            {questions[count].options.map((choice)=>(
              <button onClick={()=>{increment(choice.isCorrect)}}>{choice.text}</button>
            ))}
          </div>
          <div className='highlightdiv'>
            <button onClick={highlight}>Highlight</button>
            <button  onClick={removehighlight}>Remove Highlight</button>
          </div>
        </div>
      </div>
        )
      }
    </div>
  )
}
