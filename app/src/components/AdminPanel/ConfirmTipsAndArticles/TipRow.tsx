/* eslint-disable */
import React, { useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { TipItem } from "../../Pages/TipsAndArticles/Tip";
import ArticleModal from "./confirmArticleModal";

type tipRowProp = {
  tip: TipItem;
  confirm: boolean;
  confirmData: (tipId: string) => void;
};
export const TipRow = (props: tipDataRowProp) => {
  const {tip, confirm } = props;
  
  const [openModal, setModalOpen] = useState(false);

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
