import React, {useRef, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addExpenseThunk } from "../../store/expense";
import { getFriends } from "../../store/friend";
import "./Recipient.css";
import RecipientModal from ".";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { getBalanceThunk } from "../../store/balance"
// import Friends from '../Friends'

function Recipient({ onClose }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [recipient, setRecipient] = useState('');
  const [errors, setErrors] = useState([]);
  const [ search, setSearch ] = useState('')

  useEffect(() => {
    const myFriends = async () => {
      await dispatch(getFriends());
    };
    myFriends();
  }, []);

  useEffect(() => {
    const allBalance = async () => {
      await dispatch(getBalanceThunk());
    };
    allBalance();
  }, []);

  const handleSelection = (e) => {
    e.preventDefault();
    // console.log('HERE')
    // setRecipient(e.target.value)
    // onClose()
  }

  const loggedSession = useSelector((state) => state.session.user);

  const friendState = useSelector((state) => state.friends);
  // const friendIdState = useSelector((state) => state.friendId);
  const oneFriends = Object.values(friendState);
  let twoFriends = oneFriends[0]?.friends;
  let allFriends;
  if(twoFriends){
    allFriends = Object.values(twoFriends);
  }

  let idTwoFriends = oneFriends[0]?.friendId;
  let idFriends;
  if(idTwoFriends){
    idFriends = Object.values(idTwoFriends)
  }

  const balanceState = useSelector((state) => state.balances);

  const filtered = useMemo(() => {
    return allFriends?.filter(friend => {
      return friend.toLowerCase().includes(search.toLowerCase())
    })
  }, [allFriends, search])

  return (
    <select
    value={recipient}
    onChange={(e) => setRecipient(e.target.value)}
    className="add-recipient-dropdown"
    required
    >

    <option value=''>
      Select
    </option>
  
    {

    allFriends?.map((friend) => {
      // console.log(friend.id, 'HEREDA')
      return (
        <option className='recipient-selection' key={friend.id} value={friend} onClick={handleSelection}>
          {friend}
        </option>
      );
    })

    }
   
   </select> 
    );
  };


export default Recipient;
