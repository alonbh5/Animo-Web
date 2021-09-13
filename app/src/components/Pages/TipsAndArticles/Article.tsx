import React from 'react';

export type ArticleItem = {
  confirm: boolean;
  _id: string;
  data_type: string;
  link: string;
  author: string;
  title: string;
  img: string;
  content: string;
}

type ArticleProps = {
  text: string
  link: string
  author: string
  img: string
  content: string
}

export const Article = ({ text, link, author, img, content }: ArticleProps) => {
  return (
    <div className= "tile">
      {img.includes('.jpg') && <img src={img} />}
      <br></br>
      <a id="link" href={link} target="_blank" rel="noreferrer"> {text} </a>
      <br></br>
      {author}
    </div>
  );
}
;
