import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import AddExpenseForm from './AddExpenseForm';
import './AddExpense.css'

function AddExpenseModal() {
    const [ showModal, setShowModal ] = useState(false);

    return (
        <>
            <button className='dash-add-expense-modal' onClick={() => setShowModal(true)}>Add an expense</button>
            {showModal && (
                <Modal className='add-expense-modal' onClose={() => setShowModal(false)}>
                    <AddExpenseForm />
                </Modal>
            )}
        </>
    )
}

export default AddExpenseModal;