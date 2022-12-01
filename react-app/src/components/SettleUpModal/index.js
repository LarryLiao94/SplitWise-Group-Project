import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SettleUpForm from './SettleUpForm';
import './SettleUp.css'

function SettleUpModal() {
  const [ showModal, setShowModal ] = useState(false);

  return (
      <>
          <button className='dash-settle-up-modal' onClick={() => setShowModal(true)}>Settle up</button>
          {showModal && (
              <Modal className='settle-up-modal' onClose={() => setShowModal(false)}>
                  <SettleUpForm onClose={() => setShowModal(false)}/>
              </Modal>
          )}
      </>
  )
}

export default SettleUpModal;