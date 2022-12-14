import React, { useRef, useState, useMemo } from "react";
// import * as sessionActions from "../../store/session";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CalendarModal from "../CalendarModal";
import ImageModal from "../ImageModal";
import { addExpenseThunk } from "../../store/expense";
import { getFriends } from "../../store/friend";
import "./AddExpense.css";
import "./index";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { getExpenses } from "../../store/expense";
import { getBalanceThunk } from "../../store/balance";
// import Friends from '../Friends'
// import * as Modal from '../src/context/Modal.js'

//larry push

function AddExpenseForm({ onClose }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [credential, setCredential] = useState("");
  const [search, setSearch] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState();
  const [image, setImage] = useState("");
  const [group, setGroup] = useState("");
  const [errors, setErrors] = useState([]);
  const [query, setQuery] = useState("");
  // const [ searchDropDown, setSearchDropdown ] = useState('');
  // const [recipientId, setRecipientId] = useState(0)
  // const closeModal = () =>{
  //   return({onClose})
  // }

  // useEffect(() => {
  //   const myFriends = async () => {
  //     await dispatch(getFriends());
  //   };
  //   myFriends();
  // }, [dispatch]);

  const expenseState = useSelector((state) => state.expenses);

  const friendState = useSelector((state) => state.friends);
  const oneFriends = Object.values(friendState);

  let twoFriends = oneFriends[0]?.friends;
  let allFriends;
  if (twoFriends) {
    allFriends = Object.values(twoFriends);
  }

  let idTwoFriends = oneFriends[0]?.friendId;
  let idFriends;
  if (idTwoFriends) {
    idFriends = Object.values(idTwoFriends);
  }

  // const [searchInput, setSearchInput] = useState('')
  // const friendState = useSelector((state) => state.friends);
  // const allFriends = Object.values(friendState);

  const filtered = useMemo(() => {
    return allFriends?.filter((friend) => {
      return friend.toLowerCase().includes(search.toLowerCase());
    });
  }, [allFriends, search]);

  // const handleSearch = (e) => {
  //   e.preventDefault();
  //   setSearchInput(e.target.value);
  // }

  // if (searchInput.length > 0) {
  //   allFriends.filter((friend) => {
  //     return friend.match(searchInput);
  //   });
  // }

  // useEffect(() => {
  //   const myFriends = async () => {
  //     await dispatch(getFriends());
  //   };
  //   myFriends();
  // }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let payload = {
      recipientName: credential,
      description,
      balance: amount,
    };

    try {
      dispatch(addExpenseThunk(payload));
      // history.go("/dashboard");
      onClose();
    } catch (res) {
      setErrors([]);
      const data = await res.json();

      if (data && data.errors) setErrors(data.errors);
    }

    // e.preventDefault();

    // let payload = {
    //   recipientName: credential,
    //   description,
    //   balance: amount,
    // };

    // let res = dispatch(addExpenseThunk(payload)).catch(async (res) => {
    //   const data = await res.json();
    //   if (data && data.errors) setErrors(data.errors);
    // });
    // console.log(res, 'RES')
    // if(!res.catch) {
    //   history.go("/dashboard")
    //   console.log('here')
    //   closeModal()
    // }

    // return dispatch(addExpenseThunk(payload)).catch(async (res) => {
    //     const data = await res.json();
    //     if (data && data.errors) setErrors(data.errors);
    // });
  };
  // useEffect(() => {
  //   const myExpenses = async () => {
  //     await dispatch(getExpenses());
  //   };
  //   myExpenses();
  // }, [dispatch]);

  // useEffect(() => {
  //   const myFriends = async () => {
  //     await dispatch(getFriends());
  //   };
  //   myFriends();
  // }, [dispatch, expenseState]);

  // useEffect(() => {
  //   const allBalance = async () => {
  //     await dispatch(getBalanceThunk());
  //   };
  //   allBalance();
  // }, [dispatch]);

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
          <i onClick={onClose} className="fa-regular fa-x add-friends-x"></i>
        </div>
      </div>

      <div className="add-expense-credential-div">
        <div className="with-text">With</div>
        <strong className="you-text">you</strong>
        <div className="and-text">and:</div>

        <div className="add-expense-search">
          {/* <input
          type='text'
          id='filter'
          className='add-expense-credential-input'
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          placeholder='Enter names or email addresses'
          required />
          <ul id='result' class='user-friends-list'>
            <li></li>
          </ul> */}

          <select
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            className="add-expense-dropdown"
            required
          >
            <option value="" disabled>
              Select from friends
            </option>
            {filtered?.map((friend, index) => {
              // console.log(friend, "fREHIARS");
              const idOfFriend = idFriends[index];
              return (
                <option key={idOfFriend} value={friend}>
                  {friend}
                </option>
              );
            })}
          </select>
          {/* <Friends /> */}
        </div>
      </div>

      <div className="add-expense-main">
        <div className="add-expense-details-div">
          <div className="default-image-link">
            <img
              className="default-image"
              src="https://s3.amazonaws.com/splitwise/uploads/category/icon/square_v2/uncategorized/general@2x.png"
              height="75"
              width="75"
            />
          </div>

          <div className="add-expense-input-div">
            <input
              className="add-expense-description"
              placeholder="Enter a description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              pattern="^(?!\s*$).+"
              required
            />
            <div className="add-expense-amount-div">
              <p className="add-expense-dollar">$</p>
              <input
                className="add-expense-amount"
                type="number"
                min="1"
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
          ({`$${(amount || 0) / 2}/person`})
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

export default AddExpenseForm;
