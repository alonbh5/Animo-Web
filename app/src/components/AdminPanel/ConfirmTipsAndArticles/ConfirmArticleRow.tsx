/* eslint-disable */
import React, { useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { ArticleComponent } from '../../Pages/TipsAndArticles/Articles';
import ArticleModal from './confirmArticleModal';

type ConfirmArticleRowProp = {
  article: ArticleComponent;
  title: String;
  author: string;
  link: string;
  img: string;
  rowNumber: number;
  confirm: boolean;
  confirmArticle: (articleId: string) => void;
};
export const ConfirmArticleRow = (props: ConfirmArticleRowProp) => { 
  const { article, title, author, link, img, rowNumber,confirm } = props;
  const [openModal, setModalOpen] = useState(false);
  return (
      <tr onClick={() => setModalOpen(prev => !prev)}>
        <td>{rowNumber}</td>
        <td>{title}</td>
        <td>{author}</td>
        <td>{link}</td>
        <td><img src={img} alt=''/></td>
        <td><checkbox></checkbox></td>
        {openModal && <ArticleModal article={article}/>}
      </tr>
  );
};
