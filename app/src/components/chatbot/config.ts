// @ts-ignore
import { createChatBotMessage } from 'react-chatbot-kit';
import { BotAvatar } from './BotAvatar';
import { ShowOptions } from './showOptions';
const botName = 'Animo';

const config = {
  initialMessages: [
    createChatBotMessage(`Hi I'm ${botName}.`),
    createChatBotMessage('How are you feeling today?', {
    })
  ],
  botName: botName,
  state: {
    user: undefined,
    talkType: undefined
  },
  customComponents: {
    botAvatar: (props: any) => BotAvatar()
  },
  customStyles: {
    botMessageBox: {
      backgroundColor: '#376B7E'
    },
    chatButton: {
      backgroundColor: '#376B7E'
    }
  },
  widgets: [
    {
      widgetName: 'ShowOptions',
      widgetFunc: (props: any) => ShowOptions(props)
    }
  ]
};

export default config;
