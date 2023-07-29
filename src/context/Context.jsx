/* eslint-disable react/prop-types */

import axios from "axios";
import { createContext, useState } from "react";
import { BASE_URL_API } from "../config";

// eslint-disable-next-line react-refresh/only-export-components
export const context = createContext();

function Context({ children }) {
  const [showModal, setShowModal] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState("");
  const [commentToDeleteIsReply, setCommentToDeleteisReply] = useState(false);

  async function handleDelete() {
    let success;
    if (commentToDelete && commentToDeleteIsReply) {
      const res = await axios.patch(
        `${BASE_URL_API}/replies/${commentToDelete}`,
        {
          commentParentId: commentToDeleteIsReply,
        }
      );
      success = res.status === 200 ? true : false;
    } else if (commentToDelete) {
      try {
        const res = await axios.delete(
          `${BASE_URL_API}/comments/${commentToDelete}`
        );
        console.log(res);
        setCommentToDelete("");
        success = res.status === 200 ? true : false;
      } catch (error) {
        console.log(error);
      }
    }
    return success;
  }

  function handleShowModal(commentId = "", commentParent = false) {
    setShowModal(!showModal);
    commentId ? setCommentToDelete(commentId) : setCommentToDelete("");
    commentParent
      ? setCommentToDeleteisReply(commentParent)
      : setCommentToDeleteisReply(false);
  }

  return (
    <context.Provider
      value={{
        showModal,
        handleShowModal,
        handleDelete,
        commentToDelete,
      }}
    >
      {children}
    </context.Provider>
  );
}

export default Context;
