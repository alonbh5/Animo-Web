// @ts-ignore
import { ChatEngine } from 'react-chat-engine';
import './Chat.css';
import ChatFeed from './ChatFeed';
import LoginForm from './LoginForm';

const Chat = () => {
  if (!localStorage.getItem('chatUsername')) {
    return <LoginForm/>;
  }
  return (
    <div className="chat-container">
      <ChatEngine
        height="90vh"
        projectID="69cc354e-1763-4e7c-ac5b-8d3ec209e09e"
        userName={localStorage.getItem('chatUsername')}
        userSecret={localStorage.getItem('chatPassword')}
        renderChatFeed={(chatAppProps:any) => <ChatFeed {...chatAppProps}/>}
      />
    </div>
  );
};
export default Chat;
