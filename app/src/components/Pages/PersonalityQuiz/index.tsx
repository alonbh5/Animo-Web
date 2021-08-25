
import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../../shared/context/auth-context';
import { useHttpClient } from '../../../shared/hooks/http-hook';
import { User } from '../../api/configuration/models/users';
import { personalQuiz } from '../../api/configuration/models/personalQuiz';
import { Personality } from '../../api/configuration/models/personality';
import LoadingSpinner from '../../../shared/UIElements/LoadingSpinner';
import { AxiosRequestConfig } from 'axios';
import { PesonalityInfo } from './PersonalityInfo';
import { Quiz } from './Quiz';

const PersonalQuiz = (props: any) => {
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [personalityData, setPesonalityData] =
  useState<undefined | Personality>(undefined);
  const { isLoading, error, sendRequest } = useHttpClient();
  const auth = useContext(AuthContext);
  const user = auth.user as User;
  let presonalityInfo;
  let startQuizButton;
  let aboutQuiz;

  let pesonalityQuiz;
  let title = 'Personality Quiz';
  useEffect(() => {
    if (user.personality && user.personality !== '') {
      getPersonlaityData(user.personality!);
    }
  }, []);

  const getPersonlaityData = async (personalityType: string) => {
    const params: AxiosRequestConfig = {
      method: 'GET',
      url: `/persdata/getbyname/${personalityType}`
    };
    try {
      const response = await sendRequest(params);
      setPesonalityData(response.data);
    } catch {
    }
  };

  const handelSubmitQuiz = async (quizAnswers: personalQuiz[]) => {
    const params: AxiosRequestConfig = {
      method: 'PATCH',
      url: `/botres/addquizans/${user.id}`,
      data: {
        quizAnswers
      }
    };
    try {
      const response = await sendRequest(params);
      auth.fetchUser();
      getPersonlaityData(response.data);
      setIsQuizStarted(false);
    } catch {
    }
  };

  const startQuiz = async () => {
    const params: AxiosRequestConfig = {
      method: 'POST',
      url: `/botres/StartPersQuiz/${user.id}`
    };
    try {
      await sendRequest(params);
      auth.fetchUser();
      setIsQuizStarted(true);
    } catch {
      setIsQuizStarted(false);
    }
  };

  if (!isQuizStarted) {
    if (personalityData) {
      presonalityInfo = <PesonalityInfo personality={personalityData} />;
      title = 'My Personality Info';
    } else {
      aboutQuiz = <div>
        <h3>{`Dear ${user.first_name},`}</h3>
        <p>
          {`In order to know you well,
         we will ask you to complete the follwoing questionnaire. 
      This questionnaire will determine your personality, 
      allow us to customize your experiense,
       and give you a better advices based on your personality`}
        </p>
      </div>;
    }
    startQuizButton =
      <button
        className="btn btn-primary btn-lg"
        onClick={() => startQuiz()}>
        {personalityData ? 'Re-start Quiz' : 'Start Quiz'}
      </button>;
  } else {
    if (user.persQuiz?.length !== 0 && user.persQuiz) {
      pesonalityQuiz =
       <Quiz
         quiz={user.persQuiz}
         onSubmit={handelSubmitQuiz}
       />;
    }
  }

  return (
    <div id='team' className='text-center'>
      <div className='container'>
        <div className='col-md-8 col-md-offset-2 section-title'>
          <h2>{title}</h2>
          {error && <h5 style={{ color: 'red' }}>{error}</h5>}
          {isLoading && <LoadingSpinner asOverlay />}
          {presonalityInfo}
          {aboutQuiz}
          {startQuizButton}
          {pesonalityQuiz}
        </div>
      </div>
    </div>
  );
};
export default PersonalQuiz;
