/* eslint-disable react/prop-types */

import { useState } from "react";
import { toast } from "react-hot-toast";

import "@/css/score.css";
import { requestUpdate } from "../api/comments";

function Score({ comment }) {
  const [score, setScore] = useState(comment.score);
  const [loadingRequest, setLoadingRequest] = useState(false);
  async function handleScore(e) {
    setLoadingRequest(true);
    const action = e.target.id;
    let newScore;
    if (action.includes("minus")) {
      newScore = score - 1;
      newScore < 0
        ? toast.error("you can't honey", { duration: 1000 })
        : setScore(newScore);
    } else if (action.includes("plus")) {
      newScore = score + 1;
      setScore(newScore);
    }
    newScore > 0 && requestUpdate(comment._id, { score: newScore });
    setLoadingRequest(false);
  }

  /* Petición  */ // -> separar todas las peticiones de los componentes

  return (
    <div
      className={`card-comment__score flex flex-col ${
        loadingRequest && "loading"
      }`}
    >
      <span
        onClick={handleScore}
        
        className="icon-score icon-plus"
      ></span>
      <p className="value-score">{score}</p>
      <span
        onClick={handleScore}
        
        className="icon-score icon-minus"
      ></span>
    </div>
  );
}

export default Score;

/* 
Solo vamos a aumentar o decrementar el score, no voy a controlar si ya le dimos, ya que tendría
que cambiar la lógica de la BD y poner quien le ha dado me gusta.
lo que voy hacer es guardar un estado `loading` para que el usuario no haga peticiones muy seguidas
a la base de datos.
*/
