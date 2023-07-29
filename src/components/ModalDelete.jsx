import "@/css/modal-delete.css";
import { useMainConext } from "../hooks/useContext";
import { toast } from "react-hot-toast";
import { useState } from "react";

// eslint-disable-next-line react/prop-types
function ModalDelete({ getComments }) {
  const { handleShowModal, handleDelete } = useMainConext();
  const [loading, setLoading] = useState(false);

  function handleCancel() {
    handleShowModal();
  }
  async function handleOnDelete() {
    if (!loading) {
      setLoading(true);
      const res = await handleDelete();

      if (res) {
        getComments();
        toast.success("Comment deleted");
        return handleShowModal();
      } else {
        alert("ocurrio un error");
      }
      setLoading(false);
    }
  }

  return (
    <div className="modal-bg">
      <div className="card-modal flex flex-col flex-center">
        <h2 className="modal__title">Delete comment</h2>
        <p className="modal__text">
          Are yor sure you want to delete this comment? Whis will remove the
          comment and can´t be undone.
        </p>
        <footer className="modal__btns">
          <button
            onClick={handleOnDelete}
            className={`btn btn-action btn-delete ${loading && "loading"}`}
          >
            yes, delete
          </button>
          <button
            onClick={handleCancel}
            className={`btn btn-action btn-cancel ${loading && "loading"}`}
          >
            no, cancel
          </button>
        </footer>
      </div>
    </div>
  );
}

export default ModalDelete;
