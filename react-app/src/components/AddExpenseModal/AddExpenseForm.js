import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import "./AddExpense.css";
import "./index";
// import * as Modal from '../src/context/Modal.js'

function AddExpenseForm({ onClose }) {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);
  const [image, setImage] = useState("");
  const [group, setGroup] = useState("");
  const [errors, setErrors] = useState([]);

  const [showModal, setShowModal] = useState(true);

  const sessionUser = useSelector((state) => state.session.user);

  const splitAmount = () => {
    return;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setErrors([]);

    return dispatch(
      sessionActions.login({ credential, description, amount, image, group })
    ).catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) setErrors(data.errors);
    });
  };

  // const closeModal = (e) => {
  //   e.preventDefault();

  //   return (
  //     setShowModal(false)
  //   )
  // }

  return (
    <form className="add-expense-form" onSubmit={handleSubmit}>
      {/* <ul>
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul> */}
      <div className="add-expense-header">
        <p className="add-expense-title">Add an expense</p>

        <div onClick={onClose}>
          <i className="fa-regular fa-x add-friends-x"></i>
        </div>

        {/* <button className='close-modal' onClick={() => setShowModal(false)}>
        </button> */}
      </div>

      <div className="add-expense-credential-div">
        <div className="with-text">With</div>
        <strong className="you-text">you</strong>
        <div className="and-text">and:</div>
        <div className="add-expense-search">
          <input
            className="add-expense-credential-input"
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            placeholder="Enter names or email addresses"
            required
          />
        </div>
      </div>

      <div className="add-expense-main">
        <div className="add-expense-details-div">
          <a className="default-image-link">
            <img
              className="default-image"
              src="https://s3.amazonaws.com/splitwise/uploads/category/icon/square_v2/uncategorized/general@2x.png"
              height="75"
              width="75"
            />
          </a>

          <div className="add-expense-input-div">
            <input
              className="add-expense-description"
              placeholder="Enter a description"
            />
            <div className="add-expense-amount-div">
              <p className="add-expense-dollar">$</p>
              <input className="add-expense-amount" placeholder="0.00" />
            </div>
          </div>
        </div>

        <div className="add-expense-split-div">
          <div className="paid-by-text"> Paid by </div>
          <div className="add-expense-owner">you</div>
          <div className="and-split-text"> and split </div>
          <div className="add-expense-distribution-text">equally</div>
          {/* <div className>.</div> */}
        </div>
        <div className="add-expense-distribution">
          ({`${splitAmount}/person`})
        </div>

        <div className="add-expense-buttons">
          <button className="add-expense-date">November 28, 2022</button>
          <button className="add-expense-image">Add image/notes</button>
          <button className="add-expense-group">No group</button>
        </div>
      </div>

      <div className="add-expense-footer">
        <button className="add-expense-cancel">Cancel</button>
        <button className="add-expense-save" type="submit">
          Save
        </button>
      </div>
    </form>
  );
}

export default AddExpenseForm;
