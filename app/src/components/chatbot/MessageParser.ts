import validator from 'validator'
class MessageParser {
  actionProvider: any;
  state: any;
  constructor(actionProvider: any, state: any) {
    this.actionProvider = actionProvider;
    this.state = state;
  }

  parse = (message: string) => {
    //const lowercase = message.toLowerCase();

    if (this.state.username === undefined) {
      this.actionProvider.setUserParameters(message);
    }

    if (this.state.talkType === `GetToKnow`) {
      this.actionProvider.handlerFirstTalk(message, this.state.userId, this.state.talkType);
    }

    if (this.state.talkType === `Advice`) {
      this.actionProvider.handlerAdvice(message);
    }

    if (this.state.talkType === `AnalyzeMyEmotion`) {
      this.actionProvider.handlerAnalyzeMyEmotion(message);
    }

    // if (lowercase.includes("todos")) {

    //   this.actionProvider.todosHandler(message);
    // }
  }
}

export default MessageParser;