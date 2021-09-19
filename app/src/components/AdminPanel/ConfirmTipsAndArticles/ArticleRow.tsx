/* eslint-disable */
import React, { useState } from "react";
import { ArticleItem } from "../../Pages/TipsAndArticles/Article";

type articleRowProp = {
  article: ArticleItem;
  confirmData: (articleId: string) => void;
};

export const ArticleRow = (props: articleRowProp) => {
  const { article} = props;
  const handleChange = (event: any) => {
    props.confirmData(article._id);
  };
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
