/* eslint-disable */
import { AxiosRequestConfig } from "axios";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import React, { useState, useEffect } from "react";
import { ArticleItem } from "../../Pages/TipsAndArticles/Article";
import { TipItem } from "../../Pages/TipsAndArticles/Tip";
import PageLayout from "../../../shared/UIElements/PageLayout";
import {ConfirmArticleRow} from './ConfirmArticleRow';

const ConfirmTipsAndArticles = () => {
  const { sendRequest } = useHttpClient();
  const [tipsArr, setTips] = useState<TipItem[]>([]);
  const [articlesArr, setArticles] = useState<ArticleItem[]>([]);

  const fetchData = () => {
    fetchTypeData("Tips");
    fetchTypeData("Articles");
  };
  const fetchTypeData = async (type: String) => {
    //here we create the sendRequest
    const params: AxiosRequestConfig = {
      method: "GET",
      url: "/phydata/get" + type,
    };
    // trying to send request, the data is on the respone, await- will run async to wait to the respone
    try {
      const responseFromServer = await sendRequest(params);
      if (type === "Tips") {
        setTips(responseFromServer.data);
      } else {
        setArticles(responseFromServer.data);
      }
    } catch (err) {}
  };

  useEffect(fetchData, []);

  return (
      <PageLayout title="Confirm ">
        <h3>Articles</h3>
          <table className="table table-striped table-hover">
              
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Author</th>
            <th>link</th>
            <th>img</th>
          </tr>
        </thead>
        <tbody>
          {articlesArr.map((article: ArticleItem, index: number) => {
            return (
              !article.confirm &&
            <ConfirmArticleRow
              key={index}
              rowNumber={index}
              title = { article.title}
              author = {article.author}
              link = {article.link}
              img = {article.img}
              confirm = {article.confirm}
              article = {article}
              //deleteUser={deleteUser}
              confirmArticle={confirm}
              //updateUser={onUpdateUser}
            />)})
          }

        </tbody>
       </table>
       {
      // <div className="container text-center tiles col-md-8 col-md-offset-2 section-title">
      //   {tipsArr.map((tip: TipItem) => {
      //     return (
      //       !tip.confirm && (
      //         <TipComponent text={tip.title} content={tip.content} />
      //       )
      //     );
      //   })}
      // </div> */}
    </PageLayout>
  );
};

export default ConfirmTipsAndArticles;
