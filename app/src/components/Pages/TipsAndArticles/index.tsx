/* eslint-disable */
import React, { useContext, useState, useEffect } from "react";
import { AxiosRequestConfig } from "axios";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import { Role, RoleEnum } from "../../api/configuration/models/role";
import { AddArticle } from "./AddArticle";
import { AddTip } from "./AddTip";
import { ArticleComponent } from "./Articles";
import { TipComponent } from "./Tips";
import AuthContext from "../../../shared/context/auth-context";
import { User } from "../../api/configuration/models/users";

enum PageState {
  Tips = "Tips",
  Article = "Article",
  AddTips = "AddTips",
  AddArticles = "AddArticles",
}

//article interfaces
//we created an interface of tip like we have in the server
interface ArticleItem {
  confirm: boolean;
  _id: string;
  data_type: string;
  link: string;
  author: string;
  title: string;
  img: string;
}

// the respone from the server - the date
interface ArticlesResponse {
  message: string;
  data: ArticleItem[];
}
//tips interfaces
//we created an interface of tip like we have in the server
interface TipItem {
  confirm: boolean;
  _id: string;
  data_type: string;
  content: string;
  title: string;
}

// the respone from the server - the date
interface TipsResponse {
  message: string;
  data: TipItem[];
}

const TipsAndArticles = (props: any) => {
  // we send the sendRequest to the server
  const { sendRequest } = useHttpClient();
  // state: in tips we have the values from set tips, the useState function initialize the tips to an empty arr of ArticalItem interface.
  const [articlesArr, setArticles] = useState<ArticleItem[]>([]);
  const [tipsArr, setTips] = useState<TipItem[]>([]); ///
  const [showType, setType] = useState(PageState.Tips);
  const [getArticleInput, setGetInput] = useState(false);
  const auth = useContext(AuthContext);
  const user = auth.user as User;
  const role = auth.userRole as Role;
  // //#1 this func recieve the data from the server type of ArticlesResponse interface
  // const onRequsetreturn = (res: ArticlesResponse) => {
  //   console.log(res.data)
  //   //state: we set the tips from the data
  //   setArticles(res.data)
  // }

  const fetchData = () => {
    fetchTypeData("Tips");
    fetchTypeData("Articles");
  };
  const validateRole = () => {
    if (
      role.role_type === RoleEnum.Admin ||
      role.role_type === RoleEnum.Psychologist
    )
      return true;
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

  // this will call the fetchData each time we open this page
  useEffect(fetchData, []);

  return (
    <div id="team" className="text-center">
      <div className="container">
        <div className="col-md-8 col-md-offset-2 section-title">
          <h2>Tips And Articles</h2>
          <button
            className="btn btn-primary"
            style={{ width: "120px" }}
            onClick={() => setType(PageState.Article)}
          >
            Articles
          </button>
          <button
            className="btn btn-primary"
            style={{ width: "120px", marginLeft: "20px" }}
            onClick={() => setType(PageState.Tips)}
          >
            Tips
          </button>
          {validateRole() && (
            <>
              <button
                className="btn btn-primary"
                style={{ width: "120px", marginLeft: "20px" }}
                onClick={() => setType(PageState.AddArticles)}
              >
                Add article
              </button>
              <button
                className="btn btn-primary"
                style={{ width: "120px", marginLeft: "20px" }}
                onClick={() => setType(PageState.AddTips)}
              >
                Add tip
              </button>
            </>
          )}

          {showType === PageState.Article && (
            <div className="tiles">
              {
                // 'tips' from the usestate line(52) for each tip create a tip compenent and send it the title and the url
                articlesArr.map((article: ArticleItem) => {
                  return (
                    article.confirm && (
                      <ArticleComponent
                        text={article.title}
                        url={article.link}
                        author={article.author}
                        img={article.img}
                      />
                    )
                  );
                })
              }
            </div>
          )}

          {showType === PageState.Tips && (
            <div className="container text-center tiles col-md-8 col-md-offset-2 section-title">
              {tipsArr.map((tip: TipItem) => {
                return (
                  tip.confirm && (
                    <TipComponent text={tip.title} content={tip.content} />
                  )
                );
              })}
            </div>
          )}

          {showType === PageState.AddArticles && <AddArticle />}

          {showType === PageState.AddTips && <AddTip />}
        </div>
      </div>
    </div>
  );
};
export default TipsAndArticles;
