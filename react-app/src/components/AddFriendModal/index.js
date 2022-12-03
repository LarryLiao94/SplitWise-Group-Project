import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import AddFriendForm from './AddFriendForm';
import './AddFriend.css'

function AddFriendModal() {
    const [ showModal, setShowModal ] = useState(false);

    return (
        <>
            <button className='dash-add-friend-modal' onClick={() => setShowModal(true)}>add</button>
            {showModal && (
                <Modal className='add-friend-modal' onClose={() => setShowModal(false)}>
                    <AddFriendForm onClose={() => setShowModal(false)}/>
                </Modal>
            )}
        </>
    )
}

export default AddFriendModal;