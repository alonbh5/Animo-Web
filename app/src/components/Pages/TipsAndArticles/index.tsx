import React, { useContext, useState, useEffect } from 'react';
import { AxiosRequestConfig } from 'axios';
import { useHttpClient } from '../../../shared/hooks/http-hook';
import { Role, RoleEnum } from '../../api/configuration/models/role';
import { AddArticle } from './AddArticle';
import { AddTip } from './AddTip';
import { Article, ArticleItem } from './Article';
import { Tip, TipItem } from './Tip';
import AuthContext from '../../../shared/context/auth-context';
import PageLayout from '../../../shared/UIElements/PageLayout';

const PageState = {
  Tips: 'Tips',
  Article: 'Article',
  AddTips: 'AddTips',
  AddArticles: 'AddArticles'
};

// we created an interface of tip like we have in the server
const TipsAndArticles = (props: any) => {
  // we send the sendRequest to the server
  const { sendRequest } = useHttpClient();
  const [articlesArr, setArticles] = useState<ArticleItem[]>([]);
  const [tipsArr, setTips] = useState<TipItem[]>([]);
  const [showType, setType] = useState(PageState.Tips);
  const auth = useContext(AuthContext);
  const role = auth.userRole as Role;

  const fetchData = () => {
    fetchTypeData('Tips');
    fetchTypeData('Articles');
  };

  const UserHasAddPermissions = () => {
    return role.role_type === RoleEnum.Admin ||
  role.role_type === RoleEnum.Psychologist;
  };

  const fetchTypeData = async (type: String) => {
    // here we create the sendRequest
    const params: AxiosRequestConfig = {
      method: 'GET',
      url: '/phydata/get' + type
    };
    try {
      const responseFromServer = await sendRequest(params);
      if (type === 'Tips') {
        setTips(responseFromServer.data);
      } else {
        setArticles(responseFromServer.data);
      }
    } catch (err) {}
  };
  useEffect(fetchData, []);

  return (
    <PageLayout title="Tips And Articles" cols={true} >
      <button
        className="btn btn-primary"
        style={{ width: '120px' }}
        onClick={() => setType(PageState.Article)}
      >
        Articles
      </button>
      <button
        className="btn btn-primary"
        style={{ width: '120px', marginLeft: '20px' }}
        onClick={() => setType(PageState.Tips)}
      >
        Tips
      </button>
      {UserHasAddPermissions() && (
        <>
          <button
            className="btn btn-primary"
            style={{ width: '120px', marginLeft: '20px' }}
            onClick={() => setType(PageState.AddArticles)}
          >
            Add article
          </button>
          <button
            className="btn btn-primary"
            style={{ width: '120px', marginLeft: '20px' }}
            onClick={() => setType(PageState.AddTips)}
          >
            Add tip
          </button>
        </>
      )}
      {showType === PageState.Article && (
        <div className="tiles">
          {
            articlesArr.map((article: ArticleItem) => {
              return (
                article.confirm && (
                  <Article
                    text={article.title}
                    link={article.link}
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
                <Tip text={tip.title} content={tip.content} />
              )
            );
          })}
        </div>
      )}
      {showType === PageState.AddArticles && <AddArticle />}
      {showType === PageState.AddTips && <AddTip />}
    </PageLayout>
  );
};

export default TipsAndArticles;
