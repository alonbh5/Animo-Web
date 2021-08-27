/* eslint-disable */
//@ts-ignore
import { createChatBotMessage } from "react-chatbot-kit";
import { BotAvatar } from "./BotAvatar";
import { ShowOptions } from "./showOptions";
import { User } from '../api/configuration/models/users'
const botName = "Animo";
//const username = GetUserName();
// type BotState = {
//   questions: [],
//   username: string,
//   userId:string,
//   idTalk: [],
//   answers: [],
// }
const config = {
  initialMessages: [
    createChatBotMessage(`Hi I'm ${botName}.`),
    createChatBotMessage(`How are you feeling today?`, {
    }),
  ],
  botName: botName,
  state: {

    user: undefined,
    talkType: undefined,
    getToknow: false,
  },
  customComponents: {
    botAvatar: (props: any) => BotAvatar(),
  },
  customStyles: {
    botMessageBox: {
      backgroundColor: "#376B7E",
    },
    chatButton: {
      backgroundColor: "#376B7E",
    },
  },
  widgets: [
    {
      widgetName: "ShowOptions",
      widgetFunc: (props: any) => ShowOptions(props),
    },
  ]
}

export default config