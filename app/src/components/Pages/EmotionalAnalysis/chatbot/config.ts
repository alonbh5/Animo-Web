import { createChatBotMessage } from 'react-chatbot-kit';
import { BotAvatar } from './BotAvatar';
import { UserAvatar } from './UserAvatar';
import { ShowOptions } from './showOptions';
const botName = 'Animo';

const config = {
  /* Set first bot message - to start conversation */
  initialMessages: [
    createChatBotMessage(`Hi I'm ${botName}.`),
    createChatBotMessage('I am here to talk with you.')
  ],
  botName: botName,
  /* The state of the bot - user data and the type of the talk */
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
  /* Show buttons with options for the type of the talk */
  widgets: [
    {
      widgetName: 'ShowOptions',
      widgetFunc: (props: any) => ShowOptions(props)
    }
  ]
};

export default config;
