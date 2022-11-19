import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import AddFriendForm from './AddFriendForm';

function AddFriendModal() {
    const [ showModal, setShowModal ] = useState(false);

    return (
        <>
            <button onClick={() => setShowModal(true)}>Add Friend</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <AddFriendForm />
                </Modal>
            )}
        </>
    )
}

export default AddFriendModal;