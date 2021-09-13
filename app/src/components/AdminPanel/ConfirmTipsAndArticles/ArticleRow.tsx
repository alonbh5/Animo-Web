/* eslint-disable */
import React, { useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { ArticleItem } from "../../Pages/TipsAndArticles/Article";
import ArticleModal from "./confirmArticleModal";

type articleRowProp = {
  article: ArticleItem;
  confirm: boolean;
  confirmData: (articleId: string) => void;
};
export const ArticleRow = (props: articleRowProp) => {
  const { article, confirm } = props;

  const [content, setContent] = useState("");
  
  const handleChange = (event) => {
    props.confirmData(article._id);
  };
  console.log(article);
  return (
    <>
      <tr >
        <td >{article.title}</td>
        <td >{article.author}</td>
        <td >
          <a id="link" href={article.link} target="_blank">
            link
          </a>
        </td>
        <td >
          <img src={article.img} style={{ width: "50px" }} alt="" />
        </td>
        <td >
          <a onClick={handleChange}>confirm</a>
        </td>
      </tr>
      
    </>
  );
};
