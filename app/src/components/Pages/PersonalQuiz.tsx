
import React, { useState, useContext } from 'react'
import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from "../../shared/hooks/http-hook";
import { User } from '../api/configuration/models/users';
import { personalQuiz } from '../api/configuration/models/personalQuiz';
import { AxiosRequestConfig } from "axios";
import ProgressBar from 'react-bootstrap/ProgressBar'

const Quiz = (props: { quiz: personalQuiz[] }) => {
  const quizQuestions = [...props.quiz]
  const totalQuestions = props.quiz?.length || 0;
  const [questionNumber, setQuestionNumber] = useState(1);
  const [currChoise, setCurrChoise] = useState("0")

  const handelNext = (event: any) => {
    event.preventDefault();
    quizQuestions[questionNumber - 1].answer = currChoise;
    setQuestionNumber(prevState => prevState + 1)
    setCurrChoise("-1")
  }

  const handleSubmit = (event: any) => {
    quizQuestions[questionNumber - 1].answer = currChoise;
    setQuestionNumber(prevState => prevState + 1)
    setCurrChoise("-1")
  }

  const handelBack = (event: any) => {
    event.preventDefault();
    setQuestionNumber(prevState => prevState - 1)
  }

  const handleChange = (e: any) => {
    const { value } = e.target
    setCurrChoise(value)
  }

  return (
    <>
      <h3 style={{ marginTop: "50px", marginBottom: "30px" }}>{quizQuestions[questionNumber - 1].question}</h3>
      <span>
        <span>Disagree</span>
        <span className='radiosquiz' >
          <input type="radio" value="-3" name="choose" onChange={handleChange} checked={currChoise === "-3"} />
        </span>
        <span className='radiosquiz' >
          <input type="radio" value="-2" name="choose" onChange={handleChange} checked={currChoise === "-2"} />
        </span>
        <span className='radiosquiz' >
          <input type="radio" value="-1" name="choose" onChange={handleChange} checked={currChoise === "-1"} />
        </span >
        <span className='radiosquiz' >
          <input type="radio" value="0" name="choose" onChange={handleChange} checked={currChoise === "0"} />
        </span>
        <span className='radiosquiz' >
          <input type="radio" value="1" name="choose" onChange={handleChange} checked={currChoise === "1"} />
        </span>
        <span className='radiosquiz' >
          <input type="radio" value="2" name="choose" onChange={handleChange} checked={currChoise === "2"} />
        </span>
        <span className='radiosquiz' >
          <input type="radio" value="3" name="choose" onChange={handleChange} checked={currChoise === "3"} />
        </span>
        <span className='radiosquiz' >Agree</span>
      </span>

      <ProgressBar className='progressBar' now={questionNumber} min={1} max={totalQuestions} label={`${questionNumber} / ${totalQuestions}`} />
      {questionNumber <= totalQuestions ?
        <div>
          <button style={{ marginRight: '12px' }} className="btn btn-primary" disabled={questionNumber === 1} onClick={handelBack}>Back</button>
          <button className="btn btn-primary" onClick={handelNext}>Next</button>
        </div> :
        <div>
          <button className="btn btn-primary" onClick={handelNext}>Submit</button></div>
      }
    </>
  )
}

export const PersonalQuiz = (props: any) => {
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const { isLoading, error, sendRequest, clearMessages } = useHttpClient();
  const auth = useContext(AuthContext);
  const user = auth.user as User;


  const startQuiz = async () => {
    const params: AxiosRequestConfig = {
      method: 'POST',
      url: `/botres/StartPersQuiz/${user.id}`,
    }
    try {
      const response = await sendRequest(params);
      setIsQuizStarted(true)
    } catch {
      console.log("ERROR")
    }
  }



  return (
    <div id='team' className='text-center'>
      <div className='container'>
        <div className='col-md-8 col-md-offset-2 section-title'>
          <h2>Personal Quiz</h2>
          <h4></h4>
          {!isQuizStarted ? <button className="btn btn-primary btn-lg" onClick={() => startQuiz()}>Start Quiz</button> :
            user.persQuiz && <Quiz quiz={user.persQuiz} />}
        </div>
      </div>
    </div>
  )
}
