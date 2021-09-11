/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useRoles } from '../../../shared/hooks/roles-hook';
import validator from 'validator';
import Input from '../../../shared/FormElements/Input';
import 'react-simple-hook-modal/dist/styles.css';
import { Article } from '../../Pages/TipsAndArticles/Articles';
import {
  Modal,
  ModalTransition
} from 'react-simple-hook-modal';

type EditUserModalProps = {
  article: typeof ArticleProps;
  onUpdate: (article: typeof ArticleComponent) => void;
  isOpen: boolean;
  closeModal: () => void;

}
export const EditUserModal = (props: EditUserModalProps) => {
  const { article } = props;
  

//   const _onClickUpdate = (event: any) => {
//     event.preventDefault();
//     props.onUpdate({
//       ...user,
//       first_name: firstName,
//       last_name: lastName,
//       age: age,
//       email: email,
//       role_id: role,
//       gender: gender
//     });
//     props.closeModal();
//   };

  

//   const handleChange = (e: any) => {
//     const { name, value } = e.target;
//     setState((prevState) => ({ ...prevState, [name]: value }));
//     !isChange && setIsChange(true);
//   };

//   useEffect(() => {
//     if (email && !validator.isEmail(email) && !validator.isEmpty(email)) {
//       setErrorEmail('Please enter a valid email address');
//     } else {
//       setErrorEmail('');
//     }
//   }, [email, age]);

//   useEffect(() => {
//     if (age && !validator.isNumeric(String(age))) {
//       setErrorAge('Age must be a number');
//     } else if (Number(age) > 120 || Number(age) < 1) {
//       setErrorAge('Age must be higher then 1 and less then 120');
//     } else {
//       setErrorAge('');
//     }
//   }, [age]);

//   const _onClose = () => {
//     setIsChange(false);
//     setState({
//       firstName: user.first_name,
//       lastName: user.last_name,
//       age: user.age,
//       email: user.email,
//       gender: user.gender,
//       role: user.role_id
//     });
//     props.closeModal();
//   };
  return (
    <>
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
    </>
  );
};
