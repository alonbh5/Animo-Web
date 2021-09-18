/* eslint-disable */
import React, { useState } from "react";
import { TipItem } from "../../Pages/TipsAndArticles/Tip";

type tipRowProp = {
  tip: TipItem;
  confirmData: (tipId: string) => void;
};
export const TipRow = (props: tipDataRowProp) => {
  const { tip } = props;
  const handleChange = (event) => {
    props.confirmData(tip._id);
  };

  return (
    <>
      <tr >
        <td style ={{maxWidth: '100px'}}>{tip.title}</td>
        <td >{tip.author}</td>
        <td >{tip.content}</td>
        <td >
          <a onClick={handleChange}>confirm</a>
        </td >
      </tr>
    </>
  );
};

