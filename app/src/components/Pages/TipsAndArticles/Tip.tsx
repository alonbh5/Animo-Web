import React from 'react';

export type TipItem = {
  confirm: boolean;
  _id: string;
  data_type: string;
  content: string;
  title: string;
}

type TipsProps = {
    text: string
    content: string
}

export const Tip = ({ text, content }: TipsProps) => {
  return (
    <div>
      <h3>{text}</h3>
      <p style = {{ width: '1000px' }}>{content}</p>
      <br></br>
    </div>
  );
}
;
