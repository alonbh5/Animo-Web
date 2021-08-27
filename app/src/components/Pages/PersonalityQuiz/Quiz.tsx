import { useState } from 'react';
import { personalQuiz } from '../../api/configuration/models/personalQuiz';
import ProgressBar from 'react-bootstrap/ProgressBar';

type QuizProps = {
    quiz: personalQuiz[];
     onSubmit: (quiz: personalQuiz[]) => void
}

export const Quiz = (props:QuizProps) => {
  const quizQuestions = [...props.quiz];
  const totalQuestions = props.quiz?.length || 0;
  const [questionNumber, setQuestionNumber] = useState(1);
  const [currChoise, setCurrChoise] = useState('0');

  const handelNext = (event: any) => {
    event.preventDefault();
    quizQuestions[questionNumber - 1].answer = currChoise;
    setQuestionNumber(prevState => prevState + 1);
  };

  const handelBack = (event: any) => {
    event.preventDefault();
    setQuestionNumber(prevState => prevState - 1);
  };

  const _onSubmit = (event: any) => {
    event.preventDefault();
    quizQuestions[questionNumber - 1].answer = currChoise;
    props.onSubmit(quizQuestions);
    quizQuestions.forEach((quiz, index) => console.log(index + quiz.answer));
  };

  const handleChange = (e: any) => {
    const { value } = e.target;
    setCurrChoise(value);
  };

  return (
    <>
      <h3 style={{ marginTop: '50px', marginBottom: '30px' }}>
        {quizQuestions[questionNumber - 1]?.question}
      </h3>
      <span>
        <span>Disagree</span>
        <span className='radiosquiz' >
          <input
            type="radio"
            value="-3"
            name="choose"
            onChange={handleChange}
            checked={currChoise === '-3'}
          />
        </span>
        <span className='radiosquiz' >
          <input
            type="radio"
            value="-2"
            name="choose"
            onChange={handleChange}
            checked={currChoise === '-2'}
          />
        </span>
        <span className='radiosquiz' >
          <input
            type="radio"
            value="-1"
            name="choose"
            onChange={handleChange}
            checked={currChoise === '-1'}
          />
        </span >
        <span className='radiosquiz' >
          <input
            type="radio"
            value="0"
            name="choose"
            onChange={handleChange}
            checked={currChoise === '0'}
          />
        </span>
        <span className='radiosquiz' >
          <input
            type="radio"
            value="1"
            name="choose"
            onChange={handleChange}
            checked={currChoise === '1'}
          />
        </span>
        <span className='radiosquiz' >
          <input
            type="radio"
            value="2"
            name="choose"
            onChange={handleChange}
            checked={currChoise === '2'}
          />
        </span>
        <span className='radiosquiz' >
          <input
            type="radio"
            value="3"
            name="choose"
            onChange={handleChange}
            checked={currChoise === '3'}
          />
        </span>
        <span className='radiosquiz' >Agree</span>
      </span>

      <ProgressBar
        className='progressBar'
        now={questionNumber}
        min={1}
        max={totalQuestions}
        label={`${questionNumber} / ${totalQuestions}`}
      />
      {questionNumber < totalQuestions
        ? <div>
          <button
            style={{ marginRight: '12px' }}
            className="btn btn-primary"
            disabled={questionNumber === 1}
            onClick={handelBack}>
                 Back
          </button>
          <button className="btn btn-primary" onClick={handelNext}>Next</button>
        </div>
        : <div>
          <button
            className="btn btn-primary"
            onClick={_onSubmit}>
               Submit
          </button>
        </div>
      }
    </>
  );
};
