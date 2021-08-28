class MessageParser {
  actionProvider: any;
  state: any;
  constructor (actionProvider: any, state: any) {
    this.actionProvider = actionProvider;
    this.state = state;
  }

  parse = (message: string) => {
    if (this.state.user === undefined) {
      this.actionProvider.setUserParameters(message);
    }

    console.log(this.state);

    if (this.state.talkType === 'GetToKnow') {
      this.actionProvider.handlerFirstTalk(
        message, this.state.user.id, this.state.talkType);
    }

    if (this.state.talkType === 'undifined') {
      this.actionProvider.handlerFirstTalk(
        message, this.state.user.id, this.state.talkType);
    }

    // if (this.state.talkType === 'GetToKnow') {
    //   this.actionProvider.handlerFirstTalk(
    //     message, this.state.userId, this.state.talkType);
    // }

    if (this.state.talkType === 'Advice') {
      this.actionProvider.handlerAdvice(
        message, this.state.user.id, this.state.talkType);
    }

    if (this.state.talkType === 'AnalyzeMyEmotion') {
      this.actionProvider.handlerAnalyzeMyEmotion(
        message, this.state.user.id, this.state.talkType);
    }
  }
}

export default MessageParser;
