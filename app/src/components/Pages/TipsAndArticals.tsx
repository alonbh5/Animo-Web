/* eslint-disable */

import { AxiosRequestConfig } from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { useHttpClient } from '../../shared/hooks/http-hook';

//we created an interface of tip like we have in the server
interface TipItem {
  confirm: boolean
  "_id": string
  "data_type": string
  "link": string
  "author": string
  "title": string
}

// the respone from the server - the date
interface TipsResponse {
  message: string
  data: TipItem[]
}


// we created this object and this will be the props for the html tag
interface TipProps {
  text: string
  url: string
}
// this is kind of HTML tag, I can create its props, here we decied how to display the tag/component we created. this is one Tip component
// export const TipComponent = ({text, url}: TipProps) => {
  // const text = TipsProps.text
  //const url = TipsProps.url
export const TipComponent = ({text, url}: TipProps) => {

  return (
    <li>
      <div>
        {text}
        <link href = {url}> url </link>
      
      </div>
    </li>

  )
}



export const TipsAndArticals = (props: any) => {
  // we send the sendRequest to the server
  const { sendRequest } = useHttpClient();
  // state: in tips we have the values from set tips, the useState function initialize the tips to an empty arr of TipItem interface.
  const [tips, setTips] = useState<TipItem[]>([]);

    //#1 this func recieve the data from the server type of TipsResponse interface
  const onRequsetreturn = (res: TipsResponse) => {
    console.log(res.data)
    //state: we set the tips from the data.
    setTips(res.data);
  }

  const handleSubmit = () => {
    //here we create the sendRequest
    const params: AxiosRequestConfig = {
      method: 'GET',
      url: '/phydata/getTips',

    };
    // we send the request with the params, and #1 we call the onRequsetreturn function
    sendRequest(params).then(onRequsetreturn);

  };
  // this will call the handleSubmit each time we open this page
  useEffect(handleSubmit, [])


  return (
    <div id='team' className='text-center'>
      <div className='container'>
        <div className='col-md-8 col-md-offset-2 section-title'>
          <h2>Tips And Articals</h2>
        </div>
      </div>

      <h1>Articals</h1>
      <br></br>
      <br></br>
      <div className="flex-container" >
        <div className="grid-item">
          <img src="https://www.evolutionpsychologycenter.ca/wp-content/uploads/2018/05/bigstock-210204367.jpg" alt='...' className='team-img' />
          <br></br>
          <br></br>
          <a id="link" href="https://www.talkspace.com/blog/fear-of-change-why-life-adjustments-are-difficult" target="_blank"> fear of change why life adjustments are difficult </a>
        </div>

        <div className="grid-item" >
          <img src="https://www.optimistdaily.com/wp-content/uploads/Good-Life.jpg" alt='...' className='team-img' />
          <br></br>
          <br></br>
          <a id="link" href="https://www.bakadesuyo.com/2021/07/awesome/" target="_blank">"The Lazy Way To An Awesome Life: 4 Secrets Backed By Research" </a>
        </div>

        <div className="grid-item">
          <img src="https://f6h8q2y9.stackpathcdn.com/wp-content/uploads/2015/03/Happy-group-of-friends-family.jpg" alt='...' className='team-img' />
          <br></br>
          <br></br>
          <a id="link" href="https://www.bakadesuyo.com/2021/03/happier-without-really-trying/" target="_blank">"How to Be Happier Without Really Trying" </a>
        </div>
        <div >
          <img src="https://safestart.com/wp-content/uploads/2019/12/HabitNotes-780x480.jpg" alt='...' className='team-img' />
          <br></br>
          <br></br>
          <a id="link" href="https://www.bakadesuyo.com/2021/06/how-to-quit-bad-habits-2/" target="_blank">"This Is How To Quit Bad Habits Without Willpower: 4 Secrets From Neuro..." </a>
        </div>
        <div className="grid-item" >
          <img src=" https://www.wetheyoung.in/wp-content/uploads/2020/02/fomo.jpg" alt='...' className='team-img' />
          <br></br>
          <br></br>
          <a id="link" href="https://time.com/4358140/overcome-fomo/" target="_blank">"fear of missing out" </a>
        </div>

        <div className="grid-item" >
          <img src=" https://www.bakadesuyo.com/wp-content/uploads/2021/06/life-awesome.jpeg" alt='...' className='team-img' />
          <br></br>
          <br></br>
          <a id="link" href="https://www.bakadesuyo.com/2021/06/life-awesome/" target="_blank">"This Is The Most Fun Way To Make Your Life Awesome" </a>
        </div>

      </div>
      <br></br>
      <br></br>
      <h1>Tips</h1>
      <div>
        
        <ul>
          {
            // 'tips' from the usestate line(52) for each tip create a tip compenent and send it the title and the url
            tips.map((tip: TipItem) => <TipComponent text={tip.title} url={tip.link} />)
          }

        </ul>

      </div>
    </div>


  )
}
