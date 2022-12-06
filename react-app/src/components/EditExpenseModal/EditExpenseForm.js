import React, { useState } from "react";
// import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import CalendarModal from "../CalendarModal";
import ImageModal from "../ImageModal";
import { getFriends } from "../../store/friend";
import "../AddExpenseModal/AddExpense.css";
import "./index";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
// import * as Modal from '../src/context/Modal.js'
import { editExpenseThunk } from "../../store/expense";
import { getExpenses } from "../../store/expense";

//larry push

function EditExpenseForm({ expense, onClose }) {
  console.log(expense.recipientName);
  const dispatch = useDispatch();
  const history = useHistory();
  const [description, setDescription] = useState(expense.title);
  const [amount, setAmount] = useState(expense.balance);
  const [image, setImage] = useState("");
  const [group, setGroup] = useState("");
  const [errors, setErrors] = useState([]);
  // const [ searchDropDown, setSearchDropdown ] = useState('');
  // const [recipientId, setRecipientId] = useState(0)

  // const [searchInput, setSearchInput] = useState('')
  const friendState = useSelector((state) => state.friends);
  const allFriends = Object.values(friendState);

  // const handleSearch = (e) => {
  //   e.preventDefault();
  //   setSearchInput(e.target.value);
  // }

  // if (searchInput.length > 0) {
  //   allFriends.filter((friend) => {
  //     return friend.match(searchInput);
  //   });
  // }

  useEffect(() => {
    const myFriends = async () => {
      await dispatch(getFriends());
    };
    myFriends();
  }, []);

  const sessionUser = useSelector((state) => state.session.user);

  const splitAmount = () => {
    return;
  };

  //   useEffect(() => {
  //     dispatch(getExpenses());
  //   }, [dispatch]);

  const handleSubmit = async (e) => {
    // e.preventDefault();

    // let payload = {
    //   recipientId: credential,
    //   description,
    //   balance: amount,
    // };

    // try {
    //   const newExpense = dispatch(addExpenseThunk(payload))
    //   return history.push(`/expenses/${newExpense.id}`)

    // } catch (res) {
    //   setErrors([]);
    //   const data = await res.json();

    //   if (data && data.errors) setErrors(data.errors);
    // }

    e.preventDefault();

    let payload = {
      id: expense.expenseId,
      description,
      balance: amount,
    };

    // return dispatch(editExpenseThunk(payload)).catch(async (res) => {
    //   const data = await res.json();
    //   if (data && data.errors) setErrors(data.errors);
    // });

    try {
      dispatch(editExpenseThunk(payload));
      history.go("/expenses");
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
        <p className="add-expense-title">Edit an expense</p>

        <div onClick={onClose}>
          <i onClick={onClose} className="fa-regular fa-x add-friends-x"></i>
        </div>
      </div>

      <div className="add-expense-credential-div">
        <div className="with-text">With</div>
        <strong className="you-text">you</strong>
        <div className="and-text">and:</div>

        <div className="add-expense-search">
          {/* <input
          className='add-expense-credential-input'
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          placeholder='Enter names or email addresses'
          required /> */}
          {/* <input
            type='text'
            className="add-expense-credential-input"
            value={searchInput}
            onChange={handleSearch}
            placeholder="Enter names or email addresses"
            required
          />
          <table>
            <tr>
              <th>Friend</th>
            </tr>
            {allFriends.map((friend) => {
              <div>
                <tr>
                  <td>{friend}</td>
                </tr>
              </div>
            })}
          </table> */}
          {/*
          <select
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            className="add-expense-dropdown"
            required
          >
            <option value="" disabled>
              Select from friends
            </option>
            {allFriends?.map((friend) => {
              return (
                <option key={friend.id} value={friend}>
                  {friend}
                </option>
              );
            })}
          </select> */}
          <div className="recipientName">{expense.recipientName}</div>
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
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <div className="add-expense-amount-div">
              <p className="add-expense-dollar">$</p>
              <input
                className="add-expense-amount"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
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
          ({`$${amount / 2}/person`})
        </div>

        <div className="add-expense-buttons">
          <button className="add-expense-date">
            <CalendarModal />
          </button>
          <button className="add-expense-image">
            <ImageModal />
          </button>
          <button className="add-expense-group">No group</button>
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

export default EditExpenseForm;
