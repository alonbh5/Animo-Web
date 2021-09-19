import { Personality } from '../../api/configuration/models/personality';

export const PesonalityInfo = (props: { personality: Personality }) => {
  const { personality } = props;

  return (
    <div>
      <h1>{personality.type}</h1>
      <h3> {personality.alias}</h3>
      <p>{personality.descritpion}</p>
      {personality.properites?.map((prop, index) => {
        return (
          <div style={{ marginTop: '60px' }} key={'prop' + index}>
            <h3>{prop.title}</h3>
            {prop.quote?.title && <blockquote>{prop.quote?.title}</blockquote>}
            <h5 style={{ textAlign: 'right' }}>{prop.quote?.author}</h5>
            <p >{prop.description}</p>
          </div>
        );
      })}
    </div>);
};
