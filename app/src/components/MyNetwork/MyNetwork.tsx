import React, { Component } from 'react';
import axios, { AxiosRequestConfig } from 'axios';
import Talk from 'talkjs';
import { User } from '../api/configuration/models/users';
import { avatarImage } from '../utils';
import './MyNetwork.css';

type userChat = Talk.UserOptions & {
    info?: string;
    online?: boolean;
    phoneNumber?: string;
}

class MyNetwork extends Component<{user:User, isOpen: boolean},
 {currentUser: userChat, allPsycologist?:userChat[]}> {
  constructor (props: any) {
    super(props);
    const currentUser: userChat = {
      id: props.user._id,
      name: props.user.first_name + ' ' + props.user.last_name,
      email: props.user.email,
      photoUrl: props.user.imageUrl || avatarImage,
      role: 'Member',
      welcomeMessage: 'Hey there! How are you? :-)'
    };

    this.fetchUsers();

    this.state = {
      currentUser,
      isOpen: false
    };
  }

   fetchUsers = async () => {
     let psyco;
     const params: AxiosRequestConfig = {
       baseURL: process.env.REACT_APP_BACKEND_URL,
       method: 'GET',
       url: '/users/sos'
     };

     try {
       const response = await axios.request(params);
       psyco = response.data.data.psycUsers as User[];
     } catch (err) {
       psyco = undefined;
     }

     const allPsycologist: userChat[] | undefined =
     psyco?.sort((x:User) => !x.online ? 1 : -1).map((user:User, index:number) => {
       return {
         id: user._id,
         name: user.first_name + ' ' + user.last_name,
         email: user.email,
         photoUrl: user.imageUrl || avatarImage,
         role: 'Member',
         info: user.aboutMe,
         online: user.online,
         phoneNumber: user.phone,
         welcomeMessage: 'Hey there! How are you? :-)'
       };
     });

     this.setState({
       allPsycologist
     });
   };

   handleClick (userId:any) {
     /* Retrieve the two users that will participate in the conversation */
     this.setState({ isOpen: true });
     const { currentUser, allPsycologist } = this.state;
     const user = allPsycologist?.find((user: userChat, index:number) => user.id === userId);

     /* Session initialization code */
     Talk.ready
       .then(() => {
         /* Create the two users that will participate in the conversation */
         const me = new Talk.User(currentUser as Talk.UserOptions);
         const other = new Talk.User(user as Talk.UserOptions);

         /* Create a talk session if this does not exist.
        Remember to replace tthe APP ID with the one on your dashboard */
         if (!window.talkSession) {
           window.talkSession = new Talk.Session({
             appId: 't3gBxwEd',
             me: me
           });
         }

         /* Get a conversation ID or create one */
         const conversationId = Talk.oneOnOneId(me, other);
         const conversation =
         window.talkSession.getOrCreateConversation(conversationId);

         /* Set participants of the conversations */
         conversation.setParticipant(me);
         conversation.setParticipant(other);

         /* Create and mount chatbox in container */
         this.chatbox = window.talkSession.createChatbox(conversation);
         this.chatbox.mount(this.container);
       })
       .catch(e => console.error(e));
   }

   render () {
     const { currentUser, allPsycologist, isOpen } = this.state;

     return (
       <div className="users">
         <div className="current-user-container">
           {currentUser &&
                        <div>
                          <picture className="current-user-picture">
                            <img alt={currentUser.name}
                              src={currentUser.photoUrl || avatarImage} />
                          </picture>
                          <div className="current-user-info">
                            <h3>{currentUser.name}</h3>
                            <p>{currentUser.info}</p>
                          </div>
                        </div>
           }
         </div>
         <div className="users-container">
           <ul>
             {allPsycologist?.map((user:userChat) =>
               <li key={user.id} className="user">
                 <picture className="user-picture">
                   <img src={user.photoUrl || avatarImage} alt={`${user.name}`} />
                 </picture>
                 <div className="user-info-container">
                   <div className="user-info">
                     <h4>{user.name}</h4>
                     <h5>{user.phoneNumber}</h5>
                     <p>{user.info}</p>
                   </div>
                   <div className="user-action">
                     <div>
                       <div>
                         <button onClick={(userId) => this.handleClick(user.id)}>
                        Message
                         </button></div>
                       <div
                         className={user.online ? 'status text-success' : 'status text-danger'}>
                          &bull;</div>{user.online ? 'Online' : 'Offline'}
                     </div>
                   </div>
                 </div>
               </li>
             )}
           </ul>

           {isOpen && <div className="chatbox-container" ref={c => {
             this.container = c;
           }}>
             <div id="talkjs-container" style={{ height: '300px' }}><i></i></div>
           </div>}
         </div>
       </div>
     );
   }
}
export default MyNetwork;
