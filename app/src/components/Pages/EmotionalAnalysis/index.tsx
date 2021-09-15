import React from 'react';
import Chatbot from 'react-chatbot-kit';
import PageLayout from '../../../shared/UIElements/PageLayout';
import config from './chatbot/config';
import MessageParser from './chatbot/MessageParser';
import ActionProvider from './chatbot/ActionProvider';
import './chatbot/Avatar.css';
const EmotionalAnalysis = (props: any) => {
  return (
    <PageLayout title='Emotional Analysis'>
      <Chatbot
        config={config}
        messageParser={MessageParser}
        actionProvider={ActionProvider}
      />
    </PageLayout>
  );
};
export default EmotionalAnalysis;
