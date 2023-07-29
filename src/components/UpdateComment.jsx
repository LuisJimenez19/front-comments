/* eslint-disable react/prop-types */
"use client";
import { useState } from "react";
import { BASE_URL_API } from "../config";
import { toast } from "react-hot-toast";
import axios from "axios";

function UpdateComment({
  comment,

  userReplying,
  isEditable,
  getComments,
  setIsEditable,
  isUpdated,
}) {
  const valueInitial = userReplying.name
    ? `@${userReplying.name.trim()} ${comment.content.trim()}`
    : comment.content;

  const [contentComment, setContentComment] = useState(valueInitial);
  const [loading, setLoading] = useState(false);

  /* Actualizar comentario */
  function handleChangeComment(e) {
    const value = e.target.value;

    if (userReplying.name && !value.startsWith(`@${userReplying.name}`)) {
      //no borra el usuario mencionado
      setContentComment(`@${userReplying.name}`);
    } else {
      setContentComment(value);
    }
  }

  async function handleUpdate(e) {
    e.preventDefault();
    if (contentComment.length <= 2) {
      toast.error("Invalid comment");
      setIsEditable(false);
    } else if (contentComment == valueInitial) {
      toast("There are no changes", {
        position: "bottom-right",
        duration: 1000,
      });
    } else {
      let content = contentComment.trim();
      if (userReplying.name) {
        content = contentComment.replace(`@${userReplying.name}`, "");
      }
      requestUpdate(comment._id, content);
    }
  }
  /* Hace la petición a la base de datos */
  async function requestUpdate(commentId, content) {
    setLoading(true);
    try {
      const res = await axios.patch(`${BASE_URL_API}/comments/${commentId}`, {
        content,
      });
      if (res.status === 200) {
        getComments();
        isUpdated && isUpdated.setContentToUpdated(content); // para que haga de nuevo la petición
        toast.success("Updated comment");
        setIsEditable(false);
      } else {
        toast.error("Could not update");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error");
    }
    setLoading(false);
  }

  return (
    <form onSubmit={handleUpdate} className="container-update-comment">
      <textarea
        onChange={handleChangeComment}
        className={`new-comment update-comment ${isEditable && "active"}`}
        name="content"
        placeholder="Add a comment..."
        value={contentComment}
        maxLength={240}
      ></textarea>
      <button
        className={`btn-update btn-submit ${isEditable && "active"}
        ${valueInitial === contentComment ? "disabled" : loading && "loading"}
      `}
      >
        update
      </button>
    </form>
  );
}

export default UpdateComment;
