/* eslint-disable */
import "./showOptions.css";

export const ShowOptions = (props: any) => {
  const options = [
    {
      text: "First Talk",
      handler: props.actionProvider.handlerFirstTalk,
      id: 1,
    },
    {
      text: "Advice",
      handler: props.actionProvider.handlerAdvice,
      id: 2,
    },
    {
      text: "Analyze My Emotion",
      handler: props.actionProvider.handlerAnalyzeMyEmotion,
      id: 3,
    },
  ];

  const optionsMarkup = options.map((option) => (
    <button
      className="type-of-talk-button"
      key={option.id}
      onClick={option.handler}
    >
      {option.text}
    </button>
  ));

  return <div className=".type-of-talk-containe">{optionsMarkup}</div>;
};

export default ShowOptions;
