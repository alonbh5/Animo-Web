/* eslint-disable */


  
  // we created this object and this will be the props for the html tag
  interface ArticleProps {
    text: string
    url: string
    author: string
    img: string
  }
  

// this is kind of HTML tag, I can create its props, here we decied how to display the tag/component we created. this is one Tip component
// export const TipComponent = ({text, url}: ArticleProps) => {
// const text = TipsProps.text
//const url = TipsProps.url
export const ArticleComponent = ({ text, url, author, img }: ArticleProps) => {
    return (
      <div className= "tile">
        {img.includes('.jpg') && <img src={img} />}
        <br></br>
        <a id="link" href={url} target="_blank"> {text} </a>
        <br></br>
        {author}
      </div>
    )
  }