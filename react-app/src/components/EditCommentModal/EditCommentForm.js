import React, { useState } from "react";
// import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { getFriends } from "../../store/friend";
import "../AddExpenseModal/AddExpense.css";
import "./index";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

import { editCommentThunk } from "../../store/comment";
import { NavLink } from "react-router-dom";

//larry push

function EditCommentForm({ comment, onClose }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [comments, setComment] = useState(comment.comment);
  const [errors, setErrors] = useState([]);
  const expense = useSelector((state) => state.expenses[comment.expenseId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let payload = {
      id: comment.id,
      expenseId: comment.expenseId,
      comment: comments,
    };

    try {
      dispatch(editCommentThunk(payload));
      onClose();
    } catch (res) {
      setErrors([]);
      const data = await res.json();

      if (data && data.errors) setErrors(data.errors);
    }
  };

  return (
    <form className="add-expense-form" onSubmit={handleSubmit}>
      {/* <ul>
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul> */}
      <div className="add-expense-header">
        <p className="add-expense-title">Edit comment</p>

        <div onClick={onClose}>
          <i onClick={onClose} className="fa-regular fa-x add-friends-x"></i>
        </div>
      </div>

      <div className="add-expense-credential-div">
        {/* <div className="with-text">With</div>
        <strong className="you-text">you</strong>
        <div className="and-text">and:</div> */}

        <div className="add-expense-search">
          <div className="recipientName">{expense.title}</div>
        </div>
      </div>

      <div className="add-expense-main">
        <div className="add-expense-details-div">
          {/*  <NavLink className="default-image-link">
            <img
              className="default-image"
              src="https://s3.amazonaws.com/splitwise/uploads/category/icon/square_v2/uncategorized/general@2x.png"
              height="75"
              width="75"
            />
           <NavLink */}

          <div className="add-expense-input-div">
            <textarea
              className="add-expense-description"
              placeholder="Enter a description"
              value={comments}
              onChange={(e) => setComment(e.target.value)}
              required
            />
          </div>
        </div>
      </div>

      <div className="add-expense-footer">
        <button onClick={onClose} className="add-expense-cancel">
          Cancel
        </button>
        <button className="add-expense-save" type="submit">
          Save
        </button>
      </div>
    </form>
  );
}

export default EditCommentForm;
