/* eslint-disable */
import { AxiosRequestConfig } from "axios";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import React, { useState, useEffect } from "react";
import { ArticleComponent } from "../../Pages/TipsAndArticles/Articles";
import { TipComponent } from "../../Pages/TipsAndArticles/Tips";
import PageLayout from "../../../shared/UIElements/PageLayout";
import {ConfirmArticleRow} from './ConfirmArticleRow';
interface ArticleItem {
  confirm: boolean;
  _id: string;
  data_type: string;
  link: string;
  author: string;
  title: string;
  img: string;
}

interface TipItem {
  confirm: boolean;
  _id: string;
  data_type: string;
  content: string;
  title: string;
}

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
       {/*<div className="tiles">
      //   {
      //     // 'tips' from the usestate line(52) for each tip create a tip compenent and send it the title and the url
      //     articlesArr.map((article: ArticleItem) => {
      //       return (
      //         !article.confirm && (
      //           <ArticleComponent
      //             text={article.title}
      //             url={article.link}
      //             author={article.author}
      //             img={article.img}
      //           />
      //         )
      //       );
      //     })
      //   }
      // </div>
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
