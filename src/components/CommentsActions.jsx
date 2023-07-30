/* eslint-disable react/prop-types */

import { CURREND_ID } from "../config";

import { useMainConext } from "../hooks/useContext";

import "@/css/comment-actions.css";

/* Images */
import iconReply from "../../public/images/icon-reply.svg";
import iconDelete from "../../public/images/icon-delete.svg";
import iconEdit from "../../public/images/icon-edit.svg";

function CommentsActions({
  user,
  commentId,
  handleReply,
  setIsEditable,
  commentParent,
}) {
  const { handleShowModal } = useMainConext();
  function handleEdit() {
    setIsEditable((old) => !old);
  }

  return (
    <>
      <div className="flex container-actions">
        {user._id === CURREND_ID ? (
          <>
            <span
              onClick={() => {
                handleShowModal(commentId, commentParent);
              }}
              className="flex flex-center action action-delete"
            >
              <img src={iconDelete} alt="icon-delet" />
              delete
            </span>
            <span
              onClick={handleEdit}
              className="flex flex-center action action-edit"
            >
              <img src={iconEdit} alt="icon-edit" />
              edit
            </span>
          </>
        ) : (
          <span
            className="action flex flex-center action-reply"
            onClick={() => {
              handleReply({
                commentId: commentId,
                userName: user.name,
                userId: user._id,
              });
            }}
          >
            <img src={iconReply} alt="icon-reply" />
            reply
          </span>
        )}
      </div>
    </>
  );
}

export default CommentsActions;
