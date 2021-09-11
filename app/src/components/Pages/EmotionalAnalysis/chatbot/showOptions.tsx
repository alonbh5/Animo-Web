import './showOptions.css';

export const ShowOptions = (props: any) => {
  const options = [
    {
      text: 'Advice',
      handler: props.actionProvider.setTalkTypeAdvice,
      id: 2
    },
    {
      text: 'Analyze My Emotion',
      handler: props.actionProvider.setTalkTypeAnalyzeMyEmotion,
      id: 3
    }
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
