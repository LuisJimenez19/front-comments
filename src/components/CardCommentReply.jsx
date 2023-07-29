/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
"use client";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import CardComment from "./CardComment";

import "@/css/comment-reply.css";
import { BASE_URL_API } from "../config";

function CardCommentReply({ replyId, getComments, commentParent }) {
  const [comment, setComment] = useState({});

  const [contentToUpdated, setContentToUpdated] = useState(""); // si cambia hace de nuevo la petición

  const [loading, setLoading] = useState(true);
  const getReplies = useCallback(async () => {
    try {

      console.log({replyId})
      const res = await axios(`${BASE_URL_API}/comments/${replyId}`);
      console.log(res.data);
      if (res.data.comments) {
        setComment(res.data.comments);
        setContentToUpdated(res.data.comments.content.trim());
      }

      setLoading(false);
    } catch (error) {
      console.log("Error fetching data:", error);
      setLoading(false);
      return null;
    }
    // para que se actualice los comentarios anidados
  }, [replyId, contentToUpdated]);

  useEffect(() => {
    getReplies();
  }, [getReplies]);

  return (
    <>
      {!loading && (
        <CardComment
          commentParent={commentParent}
          getComments={getComments}
          comment={comment}
          isUpdated={{ contentToUpdated, setContentToUpdated }}
        />
      )}
    </>
  );
}

export default CardCommentReply;
