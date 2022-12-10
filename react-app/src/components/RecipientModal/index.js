import React, { useState , useEffect } from 'react';
import { Modal } from '../../context/Modal';
import Recipient from './Recipient';
import { useDispatch, useSelector } from "react-redux";
import { getFriends } from "../../store/friend";
import './Recipient.css'

function RecipientModal() {
    const dispatch = useDispatch();
    const [ showModal, setShowModal ] = useState(false);
    const [ recipient, setRecipient ] = useState('')


  useEffect(() => {
    const myFriends = async () => {
      await dispatch(getFriends());
    };
    myFriends();
  }, []);


    const friendState = useSelector((state) => state.friends);
    // const friendIdState = useSelector((state) => state.friendId);
    const oneFriends = Object.values(friendState);
    let twoFriends = oneFriends[0]?.friends;
    let allFriends;
    if(twoFriends){
      allFriends = Object.values(twoFriends);
    }

    return (
        <>
            {/* <button className='dash-add-recipient-modal' onClick={() => setShowModal(true)}> */}
              <button className='dash-add-recipient-modal' >
              {
                 <select
                 value={recipient}
                 onChange={(e) => setRecipient(e.target.value)}
                 className="add-recipient-dropdown"
                 required
                 >
                <option value=''>
                  Select a recipient
                </option>

                 {
                <>
                
                  {
                  allFriends?.map((friend) => {
                    return (
                      <option className='recipient-selection' key={friend.id} value={friend}>
                      {friend}
                      </option>
                      );
                    })
                    
                  }
                </>
                }
                
                
                </select> 
              }   
            </button>
            {showModal && (
                <Modal className='add-recipient-modal' onClose={() => setShowModal(false)}>
                    <Recipient onClose={() => setShowModal(false)} />
                </Modal>
            )}
        </>
    )
}

export default RecipientModal;