/* eslint-disable */

import axios, { AxiosRequestConfig } from 'axios';
import { User } from '../api/configuration/models/users';
import validator from 'validator';
import { botResponse } from '../api/configuration/models/botRes';

export const serverAPIPort = 3000;
export const host = 'http://localhost';
export const APIRootPath = `${host}:${serverAPIPort}`;

class ActionProvider {
  createChatBotMessage: any;
  setState: any;
  createClientMessage: any;
  constructor(createChatBotMessage: any,
    setStateFunc: any, createClientMessage: any) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
    this.createClientMessage = createClientMessage;
  }

  setUserParameters = async (message: string) => {
    // @ts-ignore
    const storedData = JSON.parse(localStorage.getItem('userData'));

    let botAnswer;

    try {
      const params: AxiosRequestConfig = {
        baseURL: `${APIRootPath}`,
        method: 'GET',
        url: `/users/getuser/${storedData.userId}`,
        headers: {
          Authorization: 'Bearer ' + storedData.token
        }
      };

      const responseUser = await axios.request(params);
      const data = responseUser.data.data;

      this.setState((prevState: { messages: any; }) => ({
        ...prevState,
        user: {
          id: data._id,
          role_id: data.role_id,
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
          age: data.age,
          gender: data.gender,
          getToKnowState: data.getToKnowState,
          personality: data.personality
        }
      }))

      //   if (data.getToKnowState === 'Done') {
      //     botAnswer = this.createChatBotMessage(`Ok ${data.first_name}, 
      //     What would you like to do now?`, {
      //       widget: 'ShowOptions',
      //       withAvatar: true,
      //     });
      //  } else {
      //     this.handlerFirstTalk(message, data._id, 'GetToKnow')
      //   }
      botAnswer = this.createChatBotMessage(`Ok ${data.first_name}, ready for some questions?`)
    }
    catch (err) {
      botAnswer = this.createChatBotMessage(
        'Sorry, We have some internal Error. please try us later', {
        withAvatar: true,
      });
    }
    this.setChatbotMessage(botAnswer);

  }


  // fetach from DB
  getAnswerFromBot = async (params: AxiosRequestConfig) => {
    try {
      const result = await axios.request(params);
      console.log(result.data);
      return result.data as botResponse;
    } catch (error) {
      console.log(error.message);
      return undefined;
    }
  }

  handlerFirstTalk = async (
    textFromUser: string, userId: string, talkType: string) => {
    // this.setState((prevState: { messages: any; }) => ({
    //   ...prevState,
    //   talkType: 'GetToKnow'
    // }));

    console.log("USETMESSGAE" + textFromUser)
    console.log("USERID" + userId)
    console.log("TALKTYPE" + talkType)

    const params: AxiosRequestConfig = {
      baseURL: `${APIRootPath}`,
      method: 'POST',
      url: '/botres/talk', // url diffrent
      data: {
        userId,
        textFromUser,
        talkType
      },
      headers: {}
    };
    let botAnswer = '';

    const botRes: botResponse | undefined = await this.getAnswerFromBot(params);
    if (botRes) {
      botAnswer = botRes.content
    } else {
      botAnswer = "Sorry we ave some issure, try later";
    }

    const botMessage = this.createChatBotMessage(botAnswer, {
      withAvatar: true
    });

    this.setChatbotMessage(botMessage);
  };

  handlerAdvice = async (userMessage: string) => {
    const params: AxiosRequestConfig = {
      baseURL: `${APIRootPath}`,
      method: 'GET',
      url: '/users' // url diffrent
      // data: {
      //   message
      // }
    };

    this.setState((prevState: { messages: any; }) => ({
      ...prevState,
      talkType: 'Advice'
    }));

    const botAnswer = await this.getAnswerFromBot(params);
    const botMessage = this.createChatBotMessage(botAnswer, {
      withAvatar: true
    });

    this.setChatbotMessage(botMessage);
  };

  handlerAnalyzeMyEmotion = async (userMessage: string) => {
    const params: AxiosRequestConfig = {
      baseURL: `${APIRootPath}`,
      method: 'GET',
      url: '/users' // url diffrent
      // data: {
      //   message
      // }
    };

    this.setState((prevState: { messages: any; }) => ({
      ...prevState,
      talkType: 'AnalyzeMyEmotion'
    }));

    const botAnswer = await this.getAnswerFromBot(params);
    const botMessage = this.createChatBotMessage(botAnswer, {
      withAvatar: true
    });

    this.setChatbotMessage(botMessage);
  };

  setChatbotMessage = (message: any) => {
    this.setState((prevState: { messages: any; }) => ({
      ...prevState,
      messages: [...prevState.messages, message]
    }));
  }

  todosHandler = async (message: string) => {
    const params: AxiosRequestConfig = {
      baseURL: `${APIRootPath}`,
      method: 'GET',
      url: '/users' // url diffrent
    };
    const answer = await this.getAnswerFromBot(params);
    const messageAnswer = this.createChatBotMessage(answer, {
      widget: 'CreateQuiz'
    });
    this.setChatbotMessage(messageAnswer);
  }
}

export default ActionProvider;
