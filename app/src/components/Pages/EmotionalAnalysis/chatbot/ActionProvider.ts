import axios, { AxiosRequestConfig } from 'axios';
import { botResponse } from '../../../api/configuration/models/botRes';

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
    const storedData = JSON.parse(localStorage.getItem('userData'));

    let botAnswer;

    try {
      const params: AxiosRequestConfig = {
        baseURL: process.env.REACT_APP_BACKEND_URL,
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
      // change to general error?
      botAnswer = errorMessage.concat(' - in Advice');
    }

    const botMessage = this.createChatBotMessage(botAnswer, {
      withAvatar: true
    });

    this.setChatbotMessage(botMessage);
    if (botRes.response_type === 'Advice-Done') {
      this.setWidgetShowOptions();
    }
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
          talkType: 'AnalyzeMyEmotion-Result'
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

  handlerAnalyzeMyEmotionResult = async (
    textFromUser: string, userId: string, talkType: string) => {
    const params = this.getParams(textFromUser, userId, talkType);
    let botAnswer = '';
    const botRes: botResponse | undefined = await this.getAnswerFromBot(params);

    if (botRes) {
      botAnswer = botRes.content;
      if (botRes.response_type === 'AnalyzeMyEmotion-ResultDone') {
        this.setState((prevState: { messages: any; }) => ({
          ...prevState,
          talkType: undefined
        }));
      }
    } else {
      botAnswer = errorMessage.concat('- in AnalyzeMyEmotion-Result');
    }

    const botMessage = this.createChatBotMessage(botAnswer, {
      withAvatar: true
    });

    this.setChatbotMessage(botMessage);
    if (botRes.response_type === 'AnalyzeMyEmotion-ResultDone') {
      this.setWidgetShowOptions();
    }
  };

  getAnswerFromBot = async (params: AxiosRequestConfig) => {
    try {
      const result = await axios.request(params);
      return result.data as botResponse;
    } catch (error:any) {
      return undefined;
    }
  }

  getParams = (textFromUser: string, userId: string, talkType: string) => {
    const params: AxiosRequestConfig = {
      baseURL: process.env.REACT_APP_BACKEND_URL,
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
      talkType: 'Advice'
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
