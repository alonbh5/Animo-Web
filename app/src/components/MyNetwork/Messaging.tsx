import React, { Component } from 'react';
import Talk from 'talkjs';
import { User } from '../api/configuration/models/users';
import { avatarImage } from '../utils';

type userChat = Talk.UserOptions & {
    info?:string;
}

class Messaging extends Component<{user:User}, {currentUser: userChat}> {
  constructor (props: any) {
    super(props);
    this.inbox = undefined;
    const currentUser: userChat = {
      id: props.user._id,
      name: props.user.first_name + ' ' + props.user.last_name,
      email: props.user.email,
      photoUrl: avatarImage,
      role: 'Member',
      info: props.user.aboutMe,
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
        if (!window.talkSession) {
          window.talkSession = new Talk.Session({
            appId: 't3gBxwEd',
            me: me
          });
        }
        this.inbox = window.talkSession.createInbox();
        this.inbox.mount(this.container);
      })
      .catch(e => console.error(e));
  }

  render () {
    return (
      <div id="team" className="text-center">
        <div className="container">
          <div style={{
            height: '500px'
          }}
          className="inbox-container"
          ref={c => {
            this.container = c;
          }}>Loading...</div>
        </div>
      </div>
    );
  }
}

export default Messaging;
