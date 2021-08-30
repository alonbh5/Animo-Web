/* eslint-disable */


  
  // we created this object and this will be the props for the html tag
  interface TipsProps {
    text: string
    content: string
  }
  

// this is kind of HTML tag, I can create its props, here we decied how to display the tag/component we created. this is one Tip component
// export const TipComponent = ({text, url}: ArticleProps) => {
// const text = TipsProps.text
//const url = TipsProps.url
export const TipComponent = ({ text, content }: TipsProps) => {

    return (
      <div >
        {text}
        <br></br>
        <br></br>
        {content}
      </div>
    )
  }