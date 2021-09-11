import { createChatBotMessage } from 'react-chatbot-kit';
import { BotAvatar } from './BotAvatar';
import { UserAvatar } from './UserAvatar';
import { ShowOptions } from './showOptions';
const botName = 'Animo';

const config = {
  initialMessages: [
    createChatBotMessage(`Hi I'm ${botName}.`),
    createChatBotMessage('I am here to talk with you.')
  ],
  botName: botName,
  state: {
    user: undefined,
    talkType: undefined
  },
  customComponents: {
    botAvatar: (props: any) => BotAvatar(),
    userAvatar: (props: any) => UserAvatar()
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
