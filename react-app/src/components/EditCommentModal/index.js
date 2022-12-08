import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import EditCommentForm from "./EditCommentForm";
import "../AddExpenseModal/AddExpense.css";
// import "./EditExpense.css";

function EditCommentModal({ comment }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        className="dash-edit-expense-modal"
        onClick={() => setShowModal(true)}
      >
        Edit comment
      </button>
      {showModal && (
        <Modal
          className="add-expense-modal"
          onClose={() => setShowModal(false)}
        >
          <EditCommentForm
            comment={comment}
            onClose={() => setShowModal(false)}
          />
        </Modal>
      )}
    </>
  );
}

export default EditCommentModal;
