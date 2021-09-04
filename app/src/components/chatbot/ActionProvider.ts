import axios, { AxiosRequestConfig } from 'axios';
import { botResponse } from '../api/configuration/models/botRes';

export const serverAPIPort = 3000;
export const host = 'http://localhost';
export const APIRootPath = `${host}:${serverAPIPort}`;

const errorMessage = 'Sorry we have some issue right now, please try later';

class ActionProvider {
  createChatBotMessage: any;
  setState: any;
  createClientMessage: any;
  constructor (createChatBotMessage: any,
    setStateFunc: any, createClientMessage: any) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
    this.createClientMessage = createClientMessage;
  }

  setUserParameters = async (message: string) => {
    // @ts-ignore
    const storedData = JSON.parse(localStorage.getItem('userData'));

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
      }));
      if (data.getToKnowState === 'Done') {
        botAnswer = this.createChatBotMessage(`${data.first_name}, 
          how can I help you today?`, {
          widget: 'ShowOptions',
          // talkType: 'Conversation',
          withAvatar: true
        });
      } else {
        botAnswer = this.createChatBotMessage(
          `I see it is the first time we are talking.
          Nice to meet you ${data.first_name}.`);
        this.setState((prevState: { messages: any; }) => ({
          ...prevState,
          talkType: 'GetToKnow'
        }));
      }
    } catch (err) {
      botAnswer = this.createChatBotMessage(errorMessage, {
        withAvatar: true
      });
    }
    this.setChatbotMessage(botAnswer);
  }

  handlerTalk = async (
    textFromUser: string, userId: string, talkType: string) => {
    const params = this.getParams(textFromUser, userId, talkType);
    let botAnswer = '';
    const botRes: botResponse | undefined = await this.getAnswerFromBot(params);

    if (botRes) {
      botAnswer = botRes.content;
      if (botRes.response_type === 'GetToKnow-Done') {
        this.setState((prevState: { messages: any; }) => ({
          ...prevState,
          talkType: undefined
        }));
      }
    } else {
      botAnswer = errorMessage;
    }

    const botMessage = this.createChatBotMessage(botAnswer, {
      withAvatar: true
    });
    this.setChatbotMessage(botMessage);
  };

  handlerAdvice = async (
    textFromUser: string, userId: string, talkType: string) => {
    const params = this.getParams(textFromUser, userId, talkType);
    let botAnswer = '';
    const botRes: botResponse | undefined = await this.getAnswerFromBot(params);

    if (botRes) {
      botAnswer = botRes.content;
      if (botRes.response_type === 'Advice-Done') {
        this.setState((prevState: { messages: any; }) => ({
          ...prevState,
          talkType: undefined
        }));
      }
    } else {
      botAnswer = errorMessage.concat(' - in Advice');
    }

    let botMessage = this.createChatBotMessage(botAnswer, {
      withAvatar: true
    });

    this.setChatbotMessage(botMessage);

    botMessage = this.createChatBotMessage('Do you want another advice?');
    // delay
    this.setChatbotMessage(botMessage);
  };

  handlerAnalyzeMyEmotion = async (
    textFromUser: string, userId: string, talkType: string) => {
    const params = this.getParams(textFromUser, userId, talkType);
    let botAnswer = '';
    const botRes: botResponse | undefined = await this.getAnswerFromBot(params);

    if (botRes) {
      botAnswer = botRes.content;
      if (botRes.response_type === 'AnalyzeMyEmotion-Done') {
        this.setState((prevState: { messages: any; }) => ({
          ...prevState,
          talkType: undefined
        }));
      }
    } else {
      botAnswer = errorMessage.concat('- in AnalyzeMyEmotion');
    }

    const botMessage = this.createChatBotMessage(botAnswer, {
      withAvatar: true
    });

    this.setChatbotMessage(botMessage);
  };

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

  getParams = (textFromUser: string, userId: string, talkType: string) => {
    const params: AxiosRequestConfig = {
      baseURL: `${APIRootPath}`,
      method: 'POST',
      url: '/botres/talk',
      data: {
        userId,
        textFromUser,
        talkType
      },
      headers: {}
    };
    return params;
  }

  setWidgetShowOptions = () => {
    const botMessage = this.createChatBotMessage(
      'Is there anything else I can help you with?', {
        widget: 'ShowOptions',
        withAvatar: true
      });
    this.setChatbotMessage(botMessage);
  }

  setTalkTypeAdvice = () => {
    this.setState((prevState: { messages: any; }) => ({
      ...prevState,
      talkType: 'Conversation'
    }));

    const botMessage = this.createChatBotMessage(
      'Tell me, what do you feel right now?');
    this.setChatbotMessage(botMessage);
  }

  setTalkTypeAnalyzeMyEmotion = () => {
    this.setState((prevState: { messages: any; }) => ({
      ...prevState,
      talkType: 'AnalyzeMyEmotion'
    }));

    const botMessage = this.createChatBotMessage(
      'Tell me, what are you doing right now?'
    );
    this.setChatbotMessage(botMessage);
  }

  setChatbotMessage = (message: any) => {
    this.setState((prevState: { messages: any; }) => ({
      ...prevState,
      messages: [...prevState.messages, message]
    }));
  }
}

export default ActionProvider;
