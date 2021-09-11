import React, { Component } from 'react';
import Talk from 'talkjs';
import { User } from '../api/configuration/models/users';
type userChat = Talk.UserOptions & {
    info?:string;
}
/*eslint-disable*/
const defualtImage ='https://icons.iconarchive.com/icons/icons8/ios7/256/Users-User-Male-2-icon.png';

class Messaging extends Component<{user:User}, {currentUser: userChat}> {
  constructor (props: any) {
    super(props);
    // @ts-ignore
    this.inbox = undefined;
    const currentUser: userChat = {
      id: props.user._id,
      name: props.user.first_name + ' ' + props.user.last_name,
      email: props.user.email,
      photoUrl: defualtImage,
      role: 'Member',
      info: 'Product Designer at Facebook',
      welcomeMessage: 'Hey there! How are you? :-)'
    };

    this.state = {
      currentUser
    };
  }

  componentDidMount () {
    Talk.ready
      .then(() => {
        const me = new Talk.User(this.state.currentUser as userChat);
        // @ts-ignore
        if (!window.talkSession) {
          // @ts-ignore
          window.talkSession = new Talk.Session({
            appId: 't3gBxwEd',
            me: me
          });
        }
        // @ts-ignore
        this.inbox = window.talkSession.createInbox();
        // @ts-ignore
        this.inbox.mount(this.container);
      })
      .catch(e => console.error(e));
  }

  render () {
    return (
      <div id="team" className="text-center">
        <div className="container">
          <div style={{
            height: '500px',
          }}
          className="inbox-container"
          ref={c => { // @ts-ignore
            this.container = c;
          }}>Loading...</div>
        </div>
      </div>
    );
  }
}

export default Messaging;
