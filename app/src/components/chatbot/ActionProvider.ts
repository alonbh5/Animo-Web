/* eslint-disable */
import { truncateSync } from "fs";
import axios, { AxiosRequestConfig } from 'axios';
import { User } from '../api/configuration/models/users'
import { isIfStatement } from "typescript";
import validator from 'validator'


export const serverAPIPort = 3000;
export const host = 'http://localhost'
export const APIRootPath = `${host}:${serverAPIPort}`

class ActionProvider {
  createChatBotMessage: any;
  setState: any;
  createClientMessage: any;
  constructor(createChatBotMessage: any, setStateFunc: any, createClientMessage: any) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
    this.createClientMessage = createClientMessage;
  }

  setUserParameters = async (message: string) => {
    let botAnswer = '';
    let userfound = false;
    const params: AxiosRequestConfig = {
      baseURL: `${APIRootPath}`,
      method: 'GET',
      url: `/users`, // url diffrent
    }

    if (!validator.isEmail(message)) {
      botAnswer = this.createChatBotMessage(`It seems like you entered a wrong email, please try again`);
    }
    else {
      try {
        const result = await axios.request(params);
        const Users: User[] = result.data.data.allUser;

        Users.forEach(user => {
          if (user.email === message) {
            userfound = true;
            this.setState((prevState: { messages: any; }) => ({
              ...prevState,
              username: user.first_name,
              userId: user._id,
            }));
            botAnswer = this.createChatBotMessage(`Hello ${user.first_name}. how can I help you?`, {
              widget: "ShowOptions",
            });
          }
        })
        if (!userfound) {
          botAnswer = this.createChatBotMessage(`It seems like you entered a wrong email, please try again`);
        }
      } catch (error) {
        botAnswer = this.createChatBotMessage(`Sorry, We have some internal Error. please try us later`);
      }
    }

    this.setChatbotMessage(botAnswer);
  }

  //fetach from DB
  getAnswerFromBot = async (params: AxiosRequestConfig) => {
    try {
      const result = await axios.request(params);
      return result.data.message;
    } catch (error) {
      return 'Sorry, We have some internal Error. please try us later';
    }
  }

  handlerFirstTalk = async (userMessage: string, userId: string, talkType: string) => {
    this.setState((prevState: { messages: any; }) => ({
      ...prevState,
      talkType: `GetToKnow`,
    }));

    const params: AxiosRequestConfig = {
      baseURL: `${APIRootPath}`,
      method: 'GET',
      url: `/botres/talk`, // url diffrent
      data: {
        userId,
        userMessage,
        talkType
      }
    }

    //const botAnswer = await this.getAnswerFromBot(params)
    //check whats comming back .
    let botAnswer
    try {
      botAnswer = await axios.request(params);
      console.log(botAnswer);
    } catch (error) {
      botAnswer = 'Sorry, We have some internal Error. please try us later';
    }

    const botMessage = this.createChatBotMessage(botAnswer, {
      withAvatar: true,
    })

    this.setChatbotMessage(botMessage);
  };

  handlerAdvice = async (userMessage: string) => {
    const params: AxiosRequestConfig = {
      baseURL: `${APIRootPath}`,
      method: 'GET',
      url: `/users`, // url diffrent
      // data: {
      //   message
      // }
    }

    this.setState((prevState: { messages: any; }) => ({
      ...prevState,
      talkType: `Advice`,
    }));

    const botAnswer = await this.getAnswerFromBot(params)
    const botMessage = this.createChatBotMessage(botAnswer, {
      withAvatar: true,
    })

    this.setChatbotMessage(botMessage);
  };

  handlerAnalyzeMyEmotion = async (userMessage: string) => {
    const params: AxiosRequestConfig = {
      baseURL: `${APIRootPath}`,
      method: 'GET',
      url: `/users`, // url diffrent
      // data: {
      //   message
      // }
    }

    this.setState((prevState: { messages: any; }) => ({
      ...prevState,
      talkType: `AnalyzeMyEmotion`,
    }));

    const botAnswer = await this.getAnswerFromBot(params)
    const botMessage = this.createChatBotMessage(botAnswer, {
      withAvatar: true,
    })

    this.setChatbotMessage(botMessage);
  };

  setChatbotMessage = (message: any) => {
    this.setState((prevState: { messages: any; }) => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
  }


  todosHandler = async (message: string) => {
    const params: AxiosRequestConfig = {
      baseURL: `${APIRootPath}`,
      method: 'GET',
      url: `/users`, // url diffrent
    }
    const answer = await this.getAnswerFromBot(params)
    const messageAnswer = this.createChatBotMessage(answer, {
      widget: "CreateQuiz",
    });
    this.setChatbotMessage(messageAnswer);
  }
}

export default ActionProvider;