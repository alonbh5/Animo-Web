/* eslint-disable */
import React, { useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { ArticleComponent } from '../../Pages/TipsAndArticles/Articles';

type ConfirmArticleRowProp = {
  article: ArticleComponent;
    title: String;
  author: string;
  link: string;
  img: string;
  rowNumber: number;
  confirm: boolean;
  confirmArticle: (articleId: string) => void;
  //updateUser: (article: article) => void;
};



export const ConfirmArticleRow = (props: ConfirmArticleRowProp) => { 
  const { article, title, author, link, img, rowNumber,confirm } = props;
  const [openModal, setModalOpen] = useState(false);

//   const clickDeleteUser = () => {
//     confirmAlert({
//       title: "Delete User",
//       message: `Are you sure to delete user ${
//         user.first_name + " " + user.last_name
//       }?`,
//       buttons: [
//         {
//           label: "Yes",
//           onClick: () => deleteUser(user._id!),
//         },
//         {
//           label: "No",
//           onClick: () => close(),
//         },
//       ],
//     });
//   };

//   const clickConfirmUser = () => {
//     confirmAlert({
//       title: "Confirm User",
//       message: `Are you sure to confirm user ${
//         user.first_name + " " + user.last_name
//       }?`,
//       buttons: [
//         {
//           label: "Yes",
//           onClick: () => confirmUser(user._id!),
//         },
//         {
//           label: "No",
//           onClick: () => close(),
//         },
//       ],
//     });
//   };

//   const date = user.created_at
//     ? new Date(user.created_at).toLocaleDateString()
//     : undefined;
  return (
    <>
      {/* <EditUserModal
        user={user}
        onUpdate={props.updateUser}
        isOpen={openModal}
        closeModal={() => setModalOpen(false)}
      /> */}
      <tr onClick = {EditUserModal(article)}>
        <td>{rowNumber}</td>
        <td>{title}</td>
        <td>{author}</td>
        <td>{link}</td>
        <td><img src={img} alt=''/></td>
        <td><checkbox></checkbox></td>
      </tr>
    </>
  );
};
