class MessageParser {
  actionProvider: any;
  state: any;
  constructor (actionProvider: any, state: any) {
    this.actionProvider = actionProvider;
    this.state = state;
  }

  /* Defines the behavior of the bot each user's message */
  parse = (message: string) => {
    if (this.state.user === undefined) {
      this.actionProvider.setUserParameters(message);
    } else if (this.state.talkType === undefined) {
      this.actionProvider.setWidgetShowOptions();
    }

    if (this.state.talkType === 'GetToKnow') {
      this.actionProvider.handlerTalk(
        message, this.state.user.id, this.state.talkType);
    }

    if (this.state.talkType === 'Advice') {
      this.actionProvider.handlerAdvice(
        message, this.state.user.id, this.state.talkType);
    }

    if (this.state.talkType === 'AnalyzeMyEmotion') {
      this.actionProvider.handlerAnalyzeMyEmotion(
        message, this.state.user.id, this.state.talkType);
    }

    if (this.state.talkType === 'AnalyzeMyEmotion-Result') {
      this.actionProvider.handlerAnalyzeMyEmotionResult(
        message, this.state.user.id, this.state.talkType);
    }
  }
}

export default MessageParser;
