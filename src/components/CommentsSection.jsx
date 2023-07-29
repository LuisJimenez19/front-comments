/* eslint-disable react/prop-types */
"use client";
import { useEffect, useState } from "react";
import FormNewComment from "./FormNewComment";
import CardComment from "./CardComment";

import ModalDelete from "./ModalDelete";
import { useMainConext } from "../hooks/useContext";
import { Toaster } from "react-hot-toast";

import { BASE_URL_API } from "../config";

function CommentsSection({ initialComments = [] }) {
  const [comments, setComments] = useState(initialComments);
  const [error, setError] = useState(false);

  const { showModal } = useMainConext();

  async function getComments() {
    try {
      const res = await fetch(`${BASE_URL_API}/comments`);
      const data = await res.json();
      console.log(data.comments);

      const initialComments = data.comments.filter(
        (comment) => !comment.replyingTo
      );

      setComments(initialComments);
    } catch (error) {
      console.log(error);
      setError(true);
      setComments([]);
    }
  }
  useEffect(() => {
    getComments();
  }, []);
  if (error && comments.length === 0) {
    return (
      <>
        <h1>No hay comentarios</h1>
        <p>Revise su conexión al servidor</p>
      </>
    );
  }
  return (
    <>
      <main className="container">
        {comments.map((comment, index) => {
          const delay = `${index / 10}s`;
          return (
            <CardComment
              getComments={getComments}
              key={comment._id}
              comment={comment}
              delay={delay}
            />
          );
        })}

        <FormNewComment className={`principal `} getComments={getComments} />
      </main>
      {showModal ? <ModalDelete getComments={getComments} /> : null}
      <Toaster />
    </>
  );
}

export default CommentsSection;
