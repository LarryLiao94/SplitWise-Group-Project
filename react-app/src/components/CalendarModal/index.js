import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import Calendar from './Calendar';
import './Calendar.css';
// import DateTime from 'react-DateTime';

function CalendarModal() {
    const [ showModal, setShowModal ] = useState(false);

    return (
        <>
            <button className='calendar-modal-button' onClick={() => setShowModal(true)}>Today</button>
            {showModal && (
                <Modal className='calendar-modal' onClose={() => setShowModal(false)}>
                    <Calendar onClose={() => setShowModal(false)} />
                </Modal>
            )}
        </>
    )
}

export default CalendarModal;