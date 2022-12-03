import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import Calendar from './Calendar';
// import styles from './Calendar.module.css';
import './Calendar.css'
// import DateTime from 'react-DateTime';

function CalendarModal() {
    const [ showModal, setShowModal ] = useState(false);

    return (
        <>
            <button className="calendarModalButton" onClick={() => setShowModal(true)}>Today</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <Calendar className="calendarModal" onClose={() => setShowModal(false)} />
                </Modal>
            )}
        </>
    )
}

export default CalendarModal;