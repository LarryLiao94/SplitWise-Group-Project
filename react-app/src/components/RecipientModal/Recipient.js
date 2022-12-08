// import React, {useRef, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { addExpenseThunk } from "../../store/expense";
// import { getFriends } from "../../store/friend";
// import "./Recipient.css";
// import "./index";
// import { useEffect } from "react";
// import { useHistory } from "react-router-dom";
// // import Friends from '../Friends'

// function Recipient({ onClose }) {
//   const dispatch = useDispatch();
//   const history = useHistory();
//   const [recipient, setRecipient] = useState('');
//   const [errors, setErrors] = useState([]);

//   const friendState = useSelector((state) => state.friends);
//   const allFriends = Object.values(friendState);

//   useEffect(() => {
//     const myFriends = async () => {
//       await dispatch(getFriends());
//     };
//     myFriends();
//   }, []);

//   return (
//     <select
//     value={recipient}
//     onChange={(e) => setRecipient(e.target.value)}
//     className="add-recipient-dropdown"
//     required
//      >
//     <option value="" disabled>
//       Select from friends
//     </option>
//     {allFriends?.map((friend) => {
//       return (
//         <option key={friend.id} value={friend}>
//           {friend}
//         </option>
//       );
//     })}
//   </select> 
//     );
//   };


// export default Recipient;
