import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import Calendar from './Calendar';
import styles from './Calendar.module.css';
// import styles from './Calendar.css';
// import DateTime from 'react-DateTime';

function CalendarModal() {
    const [ showModal, setShowModal ] = useState(false);

    return (
        <>
            <button className={styles.calendarModalButton} onClick={() => setShowModal(true)}>Today</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <Calendar className={styles.calendarModal} onClose={() => setShowModal(false)} />
                </Modal>
            )}
        </>
    )
}

export default CalendarModal;