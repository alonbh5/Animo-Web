/* eslint-disable */

import { AxiosRequestConfig } from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { ArticleComponent } from '../TipsAndArticalsComponents/Articals';

//article interfaces
//we created an interface of tip like we have in the server
interface ArticleItem {
  confirm: boolean
  "_id": string
  "data_type": string
  "link": string
  "author": string
  "title": string
  "img": string
}

// the respone from the server - the date
interface ArticlesResponse {
  message: string
  data: ArticleItem[]
}
//tips interfaces
//we created an interface of tip like we have in the server
interface TipItem {
  confirm: boolean
  "_id": string
  "data_type": string
  "content": string
  "title": string
 
}

// the respone from the server - the date
interface TipsResponse {
  message: string
  data: TipItem[]
}


export const TipsAndArticles = (props: any) => {
  // we send the sendRequest to the server
  const { sendRequest } = useHttpClient();
  // state: in tips we have the values from set tips, the useState function initialize the tips to an empty arr of ArticalItem interface.
  const [articlesArr, setArticles] = useState<ArticleItem[]>([]);
  const [tipsArr, setTips] = useState<TipItem[]>([]);  ///
  // //#1 this func recieve the data from the server type of ArticlesResponse interface
  // const onRequsetreturn = (res: ArticlesResponse) => {
  //   console.log(res.data)
  //   //state: we set the tips from the data
  //   setArticles(res.data)
  // }

  const fetchData = () => {
    fetchTypeData('Tips');
    fetchTypeData('Articles');

  };
  const fetchTypeData = async (type: String) => {

    //here we create the sendRequest
    const params: AxiosRequestConfig = {
      method: 'GET',
      url: '/phydata/get'+type,

    };
    // we send the request with the params, and #1 we call the onRequsetreturn function
    try{ 
      const response = await sendRequest(params);
      if(type === 'Tips') {
        setTips(response.data)
      } else {
        setArticles(response.data)
      }
    } catch(err) {
    }
  };
  
  // this will call the fetchData each time we open this page
  useEffect(fetchData, [])


  return (
    <div id='team' className='text-center'>
      <div className='container'>
        <div className='col-md-8 col-md-offset-2 section-title'>
          <h2>Tips And Articles</h2>
        </div>
      </div>

      <h1>Articles</h1>
      <br></br>
      <div className='cols'>

        {
          // 'tips' from the usestate line(52) for each tip create a tip compenent and send it the title and the url
          articlesArr.map((article: ArticleItem) => <ArticleComponent text={article.title} url={article.link} author={article.author} img={article.img} />)
        }

      </div>
      <br></br>
      <br></br>
      <h1>Tips</h1>
      <div className="cols">

        <ul className="cols" >
          {
            // 'tips' from the usestate line(52) for each tip create a tip compenent and send it the title and the url
            //tips.map((tip: ArticalItem) => <TipComponent text={tip.title} url={tip.link} author={tip.author} img={tip.img}/>)
          }

        </ul>

      </div>
    </div>


  )
}
