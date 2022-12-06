import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import EditExpenseForm from "./EditExpenseForm";
import "../AddExpenseModal/AddExpense.css";

function EditExpenseModal({ expense }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        className="dash-add-expense-modal"
        onClick={() => setShowModal(true)}
      >
        Edit expense
      </button>
      {showModal && (
        <Modal
          className="add-expense-modal"
          onClose={() => setShowModal(false)}
        >
          <EditExpenseForm
            expense={expense}
            onClose={() => setShowModal(false)}
          />
        </Modal>
      )}
    </>
  );
}

export default EditExpenseModal;
