/* eslint-disable */
// @ts-ignore
import  Chatbot from "react-chatbot-kit";

import config from '../chatbot/config';
import MessageParser from '../chatbot/MessageParser';
import ActionProvider from '../chatbot/ActionProvider';

import React from 'react';

const EmotionalAnalysis = (props: any) => {
  return (
    <div id="team" className="text-center">
      <div className="container">
        <div className="col-md-8 col-md-offset-2 section-title">
          <h2>Emotional Analysis</h2>
          <Chatbot
            config={config}
            messageParser={MessageParser}
            actionProvider={ActionProvider}
          />
        </div>
      </div>
    </div>
  );
};
export default EmotionalAnalysis;
