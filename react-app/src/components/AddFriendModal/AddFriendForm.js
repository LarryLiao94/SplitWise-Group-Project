import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import * as friendActions from "../../store/friend"
import { useDispatch, useSelector } from "react-redux";
// import { allFriends } from '../Dashboard'
import './AddFriend.css'
import './index'
import { useHistory } from "react-router-dom";

function AddFriendForm({ onClose }) {
    const dispatch = useDispatch();
    const history = useHistory()
    const [credential, setCredential] = useState('');
    const [description, setDescription] = useState('');
    const [errors, setErrors] = useState([]);
    
    // const [ showModal, setShowModal ] = useState(true);

    const sessionUser = useSelector(state => state.session.user);
    const friendState = useSelector((state) => state.friends);
    const allFriends = Object.values(friendState);
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        //session actions required for friend
        const friend = {
          email: credential,
          description
        }

        return dispatch(friendActions.addFriendThunk(friend)).catch(
          async (res) => {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors);
          }
        );

        // try {
        //   const newFriend = await dispatch(friendActions.addFriendThunk({ friend }))

        //   allFriends.push(Object.values(newFriend))

        //   history.push('/dashboard')

        // } catch (res) {
        
        //   const data = await res.json();
        //   if (data && data.errors) setErrors(data.errors);
        // }
    }


      return (
        <form className='add-friend-form' onSubmit={handleSubmit}>
          {/* <ul>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul> */}
          <div className='add-friends-header'>

            <img height='25' width='25' className='add-friend-img' src='https://assets.splitwise.com/assets/core/logo-square-65a6124237868b1d2ce2f5db2ab0b7c777e2348b797626816400534116ae22d7.svg' />
            <p className='invite-friends-text'>
              Invite friends
            </p>

            <button className='close-modal' onClick={onClose}>
              <i onClick={onClose}className="fa-regular fa-x"></i>
            </button>

          </div>
          <div className='add-friend-credential'>
            <strong className='add-friend-credential-text'>
              To:
            </strong>
            <input className='add-friend-credential-input'
              type="text"
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
              placeholder='Enter names or email addresses'
              required
            />
          </div>
          <div className='add-friend-description-div'>
            <input className='add-friend-description' type='text' value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Include an optional message" />
          </div>
          <div className='add-friend-submit-div'>
            <button className='add-friend-submit-button' type="submit">Send invites and add friends</button>
          </div>
        </form>
      );
}

export default AddFriendForm;
