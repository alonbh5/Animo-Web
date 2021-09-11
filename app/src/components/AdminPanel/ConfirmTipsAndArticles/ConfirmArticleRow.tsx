/* eslint-disable */
import React, { useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { ArticleItem } from '../../Pages/TipsAndArticles/Article';
import ArticleModal from './confirmArticleModal';

type ConfirmArticleRowProp = {
  article: ArticleItem;
  rowNumber: number;
  confirm: boolean;
  confirmData: (articleId: string) => void;
};
export const ConfirmArticleRow = (props: ConfirmArticleRowProp) => { 
  const { article, title, author, link, img, rowNumber,confirm } = props;
  const [openModal, setModalOpen] = useState(false);
  
  const handleChange = (event) => {
    props.confirmData(article._id)
  }
  
  return (
    <>
    <tr onClick={() => setModalOpen(prev => !prev)}>
        <td>{rowNumber}</td>
        <td>{title}</td>
        <td>{author}</td>
        <td>{link}</td>
        <td><img src={img} alt=''/></td>
        <td><a onClick = {handleChange}>confirm</a></td>
      </tr>
        {openModal && <ArticleModal article={article}/>}
        </>
  );
};
