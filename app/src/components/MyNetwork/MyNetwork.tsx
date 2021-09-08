import React, { Component } from 'react';
import './MyNetwork.css';
import Talk from 'talkjs';
import { User } from '../api/configuration/models/users';
type userChat = Talk.UserOptions & {
    info?:string;
}
/*eslint-disable*/
const defualtImage ='https://icons.iconarchive.com/icons/icons8/ios7/256/Users-User-Male-2-icon.png';
class MyNetwork extends Component<{user:User, allUsers:User[]}, {currentUser: userChat, allPsycologist:userChat[]}> {
  constructor (props: any) {
    super(props);
    let currentUser: userChat = {
      id: props.user._id,
      name: props.user.first_name + ' ' + props.user.last_name,
      email: props.user.email,
      photoUrl: defualtImage,
      role: 'Member',
      info: 'Product Designer at Facebook',
      welcomeMessage: 'Hey there! How are you? :-)',
    };

    let allPsycologist: userChat[] = props.allUsers.filter((user: User)=> user.role_id === 2).map((user:User) => {
        return {
            id: user._id,
            name: user.first_name + ' ' + user.last_name,
            email: user.email,
            photoUrl: defualtImage,
            role: 'Member',
            info: 'Product Designer at Facebook',
            welcomeMessage: 'Hey there! How are you? :-)',
        };
    })
    

    this.state = {
      currentUser,
      allPsycologist
    };
  }

  handleClick (userId:any) {
    /* Retrieve the two users that will participate in the conversation */
    const { currentUser,allPsycologist} = this.state;
    const user = allPsycologist.find((user: userChat, index:number)=> user.id === userId);
    console.log(userId)
    /* Session initialization code */
    Talk.ready
      .then(() => {
        /* Create the two users that will participate in the conversation */
        const me = new Talk.User(currentUser as userChat);
        const other = new Talk.User(user as userChat);

        /* Create a talk session if this does not exist.
        Remember to replace tthe APP ID with the one on your dashboard */
        // @ts-ignore
        if (!window.talkSession) {
          // @ts-ignore
          window.talkSession = new Talk.Session({
            appId: 't3gBxwEd',
            me: me
          });
        }

        /* Get a conversation ID or create one */
        const conversationId = Talk.oneOnOneId(me, other);
        const conversation =
        // @ts-ignore
         window.talkSession.getOrCreateConversation(conversationId);

        /* Set participants of the conversations */
        conversation.setParticipant(me);
        conversation.setParticipant(other);

        /* Create and mount chatbox in container */
        // @ts-ignore
        this.chatbox = window.talkSession.createChatbox(conversation);
        // @ts-ignore
        this.chatbox.mount(this.container);
      })
      .catch(e => console.error(e));
  }

  render () {
    const { currentUser, allPsycologist } = this.state;

    return (

      <div className="users">
        <div className="current-user-container">
          {currentUser &&
                        <div>
                          <picture className="current-user-picture">
                            <img alt={currentUser.name}
                              src={currentUser.photoUrl || ""} />
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
            {allPsycologist?.map((user:userChat)=>
              <li key={user.id} className="user">
                <picture className="user-picture">
                  <img src={defualtImage} alt={`${user.name}`} />
                </picture>
                <div className="user-info-container">
                  <div className="user-info">
                    <h4>{user.name}</h4>
                    <p>{user.info}</p>
                  </div>
                  <div className="user-action">
                    <button onClick={(userId) => this.handleClick(user.id)}>
                        Message
                    </button>
                  </div>
                </div>
              </li>
            )}
          </ul>

          <div className="chatbox-container" ref={c => {
            // @ts-ignore
            this.container = c;
          }}>
            <div id="talkjs-container" style={{ height: '300px' }}><i></i></div>
          </div>
        </div>
      </div>
    );
  }
}
export default MyNetwork;
