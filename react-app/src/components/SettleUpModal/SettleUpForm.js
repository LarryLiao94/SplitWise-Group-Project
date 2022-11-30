import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import './SettleUp.css'
import './index'

function SettleUpForm() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState('');
  const [amount, setAmount] = useState(0);
  const [image, setImage] = useState('')
  const [group, setGroup] = useState('')
  const [errors, setErrors] = useState([]);

  const [ showModal, setShowModal ] = useState(true);

  const sessionUser = useSelector(state => state.session.user);

  const handleSubmit = (e) => {
    e.preventDefault();

    setErrors([]);
    
    return dispatch(sessionActions.login({ credential, amount, image, group })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  return (
    <form className='settle-up-form' onSubmit={handleSubmit}>
        {/* <ul>
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul> */}
        <div className='settle-up-header'>
          <p className='settle-up-title'>
          Settle up
          </p>
          <i className="fa-regular fa-x settle-up-x"></i>
          {/* <button className='close-modal' onClick={() => setShowModal(false)}>
          </button> */}
        </div>

        <div className='settle-up-transaction-div'>
          <div>
            <img className='settle-up-payer-profile' alt='payer'/>
          </div>
            <img className='settle-up-arrow' src='https://assets.splitwise.com/assets/fat_rabbit/settle-up-arrow-83553d33b6848bbdfa3499d7e217748aab1f75ff2073ec5ac67cba5246e12459.png' height='15' width='30'/>
            <div>
              <img className='settle-up-recipient-profile' alt='recipient'/>
            </div>
        </div>

        <div className='settle-up-transaction-secondary'>
          <button className='settle-up-payer'>
            You
          </button>
          <div>paid</div>
          <button className='settle-up-recipient'>
            Recipient
          </button>
        </div>

       
        <div className='settle-up-amount-div'>
          <p className='settle-up-dollar'>
            $
          </p>
          <input className='settle-up-amount' placeholder='0.00'/>
        </div>
    

        <div className='settle-up-buttons'>
          <button className='settle-up-date'>November 28, 2022</button>
          <button className='settle-up-image'>Add image/notes</button>
          <button className='settle-up-group'>No group</button>
        </div>

        <div className='settle-up-footer'>
          <button className='settle-up-cancel'>
            Cancel
          </button>
          <button className='settle-up-save' type='submit'>
            Save
          </button>
      </div>
    </form>
  )
}

export default SettleUpForm;