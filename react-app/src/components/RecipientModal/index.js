import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import Recipient from './Recipient';
import './Recipient.css'

function RecipientModal() {
    const [ showModal, setShowModal ] = useState(false);

    return (
        <>
            <button className='dash-add-recipient-modal' onClick={() => setShowModal(true)}>Choose a recipient</button>
            {showModal && (
                <Modal className='add-recipient-modal' onClose={() => setShowModal(false)}>
                    <Recipient onClose={() => setShowModal(false)} />
                </Modal>
            )}
        </>
    )
}

export default RecipientModal;