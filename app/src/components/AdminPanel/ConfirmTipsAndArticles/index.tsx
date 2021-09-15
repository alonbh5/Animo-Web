/* eslint-disable */
import { AxiosRequestConfig } from "axios";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import React, { useState, useEffect } from "react";
import { ArticleItem } from "../../Pages/TipsAndArticles/Article";
import { TipItem } from "../../Pages/TipsAndArticles/Tip";
import PageLayout from "../../../shared/UIElements/PageLayout";
import {ArticleRow} from './ArticleRow';
import {TipRow} from './TipRow';

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
  
  const confirmData = async (dataId: string) => {
    const params: AxiosRequestConfig = {
      method: 'PATCH',
      url: `/phydata/confirmData/${dataId}`,
    };
    await sendRequest(params);
    fetchData();
    console.log("after fetch");
  };
  
  return (
      <PageLayout title="Confirm ">
        <h3>Articles</h3>
          <table className="table table-striped table-hover confirm">
              
        <thead>
          <tr>
            <th style = {{width: 'fit-content'}}>Title</th>
            <th>Author</th>
            <th>link</th>
            <th>img</th>
            <th>confirm</th>

          </tr>
        </thead>
        <tbody>
          
          { articlesArr.map((article: ArticleItem, index: number) => {
            return (
              !article.confirm &&
            <ArticleRow
              key={index}
              confirmData = {confirmData}
              article = {article}
            />)})
          }

        </tbody>
       </table>
       {
     
    }
    <h3>Tip</h3>
          <table style = {{tableLayout: 'fixed' }} className="table table-striped table-hover">
              
        <thead>
          <tr>
            <th style = {{width: 'fit-content'}}>Title</th>
            <th>Author</th>
            <th style = {{width: '500px'}}>content</th>
            <th>confirm</th>

          </tr>
        </thead>
        <tbody>
          {tipsArr.map((tip: TipItem, index: number) => {
            return (
              !tip.confirm  && 
            <TipRow
              key={index}
              confirmData = {confirmData}
              tip = {tip}
            />)})
          }

        </tbody>
       </table> 
    </PageLayout>
  );
};

export default ConfirmTipsAndArticles;
