/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useRoles } from '../../../shared/hooks/roles-hook';
import validator from 'validator';
import Input from '../../../shared/FormElements/Input';
import 'react-simple-hook-modal/dist/styles.css';
import { ArticleItem } from "../../Pages/TipsAndArticles/Article";

import {
  Modal,
  ModalTransition
} from 'react-simple-hook-modal';

type ArticleModalProps = {
  article: typeof ArticleItem;


}
export const ArticleModal = (props: ArticleModalProps) => {
  const { article } = props;
  
  return (
      <Modal
        id="any-unique-identifier"
        isOpen={props.isOpen}
        transition={ModalTransition.BOTTOM_UP}
      >
        <div>
          <div className='header'>
            <h2>Confirm article</h2 ></div>
            
          <div className='table-edit'>
          <h3>{article.title}</h3>
          <h4>{article.author}</h4>
              <p>{article.content}</p>
          </div>
        </div>
      </Modal>
  
  );
};

export default ArticleModal;
