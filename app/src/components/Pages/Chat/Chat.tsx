import { ChatEngine } from 'react-chat-engine';
import ChatFeed from './ChatFeed';
import LoginForm from './LoginForm';
import './Chat.css';

const Chat = () => {
  const storedData = JSON.parse(localStorage.getItem('chatData'));

  if (!storedData || new Date(storedData.expiration) < new Date()) {
    return <LoginForm/>;
  }

  return (
    <div className="chat-container">
      <ChatEngine
        height="90vh"
        projectID="69cc354e-1763-4e7c-ac5b-8d3ec209e09e"
        userName={storedData.username}
        userSecret={storedData.password}
        renderChatFeed={(chatAppProps:any) => <ChatFeed {...chatAppProps}/>}
      />
    </div>
  );
};

export default Chat;
