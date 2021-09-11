import React from 'react';
// @ts-ignore
import Chatbot from 'react-chatbot-kit';
import PageLayout from '../../../shared/FormElements/PageLayout';
import config from './chatbot/config';
import MessageParser from './chatbot/MessageParser';
import ActionProvider from './chatbot/ActionProvider';

const EmotionalAnalysis = (props: any) => {
  return (
    <PageLayout title={'Emotional Analysis'}>
      <Chatbot
        config={config}
        messageParser={MessageParser}
        actionProvider={ActionProvider}
      />
    </PageLayout>
  );
};
export default EmotionalAnalysis;
