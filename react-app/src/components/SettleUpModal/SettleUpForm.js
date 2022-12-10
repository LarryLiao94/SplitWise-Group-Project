import React, { useState, useEffect, useMemo } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import CalendarModal from "../CalendarModal";
import ImageModal from "../ImageModal";
import RecipientModal from "../RecipientModal"
import { getFriends } from "../../store/friend";
import { addExpenseThunk } from "../../store/expense";
import { getTotalBalanceThunk } from "../../store/friendTotal";
import { useHistory } from "react-router-dom";
import './SettleUp.css'
import './index'

function SettleUpForm({ onClose }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [search, setSearch] = useState("");
  const [credential, setCredential] = useState('');
  const [amount, setAmount] = useState(0);
  const [image, setImage] = useState('')
  const [group, setGroup] = useState('')
  const [errors, setErrors] = useState([]);
  const [ showModal, setShowModal ] = useState(true);

  const [recipient, setRecipient] = useState('');

  // const friendState = useSelector((state) => state.friends);

  // const oneFriends = Object.values(friendState);
  // let twoFriends = oneFriends[0]?.friends;
  // let allFriends;
  // if(twoFriends){
  //   allFriends = Object.values(twoFriends);
  // }

  // let idTwoFriends = oneFriends[0]?.friendId;
  // let idFriends;
  // if(idTwoFriends){
  //   idFriends = Object.values(idTwoFriends)
  // }

  // const sessionUser = useSelector(state => state.session.user);
  // const friendTotalBalanceState = useSelector(
  //   (state) => state.friendTotal.friendTotal
  // ); 
  useEffect(() => {
    const myFriends = async () => {
      await dispatch(getFriends());
    };
    myFriends();
  }, [dispatch]);

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

  const filtered = useMemo(() => {
    return allFriends?.filter((friend) => {
      return friend.toLowerCase().includes(search.toLowerCase());
    });
  }, [allFriends, search]);

  // console.log(friendTotalBalanceState, 'HERERERE')

  const handleSubmit = async (e) => {
    e.preventDefault();

    let payload = {
      recipientName: credential,
      description: `You paid ${credential}`,
      balance: -(amount),
    };

    try {
      dispatch(addExpenseThunk(payload));
      history.go("/dashboard");
    } catch (res) {
      setErrors([]);
      const data = await res.json();

      if (data && data.errors) setErrors(data.errors);
    }
  }

  return (
    <form className='settle-up-form' onSubmit={handleSubmit}>
        {/* <ul>
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul> */}
        <div className='settle-up-header'>
          <p className='settle-up-title'>
          Settle up
          </p>
          <i onClick={onClose} className="fa-regular fa-x settle-up-x"></i>
          {/* <button className='close-modal' onClick={() => setShowModal(false)}>
          </button> */}
        </div>

        {/* <div className='settle-up-transaction-div'>
          <div>
            <img className='settle-up-payer-profile' alt='payer'/>
          </div>
            <img className='settle-up-arrow' src='https://assets.splitwise.com/assets/fat_rabbit/settle-up-arrow-83553d33b6848bbdfa3499d7e217748aab1f75ff2073ec5ac67cba5246e12459.png' height='15' width='30'/>
            <div>
              <img className='settle-up-recipient-profile' alt='recipient'/>
            </div>
        </div> */}

        <div className='settle-up-transaction-secondary'>
          <button className='settle-up-payer'>
            You
          </button>
          <div>paid</div>
          <button className='settle-up-recipient'>
            {/* <RecipientModal /> */}
            {
            
            <select
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            className="add-recipient-dropdown"
            required
          >
            <option value="" disabled>
              Select recipient
            </option>
            {filtered?.map((friend, index) => {
              // console.log(friend, "fREHIARS");
              const idOfFriend = idFriends[index];
              return (
                <option className='recipient-selection' key={idOfFriend} value={friend}>
                  {friend}
                </option>
              );
            })}
           </select>
            }
          </button>
        </div>
        <div className="settle-up-amount-div">
              <p className="settle-up-dollar">$</p>
              <input
                className="settle-up-amount"
                type="number"
                min="1"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>

       
        {/* <div className='settle-up-amount-div'>
          <p className='settle-up-dollar'>
            $
          </p>
          <input className='settle-up-amount' placeholder='0.00'/>
        </div> */}
    

        <div className='settle-up-buttons'>
          <button className='settle-up-date'><CalendarModal /></button>
          <button className='settle-up-image'><ImageModal /></button>
          <button className='settle-up-group'>No group</button>
        </div>

        <div className='settle-up-footer'>
          <button onClick={onClose}className='settle-up-cancel'>
            Cancel
          </button>
          <button className='settle-up-save' type='submit'>
            Save
          </button>
      </div>
    </form>
  )

}

export default SettleUpForm;