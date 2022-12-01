import React, { useState, useEffect } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import './Calendar.css';
import './index';


function Calendar({ onClose }) {
  const dispatch = useDispatch();
  const [repeats, setRepeats] = useState('');
  const [reminder, setReminder] = useState('')
  const [date, setDate] = useState('')
  // const [month, setMonth] = useState('')
  // const [year, setYear] = useState('');
  const [errors, setErrors] = useState([])

  const [ showModal, setShowModal ] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setErrors([]);
    
    return dispatch(sessionActions.login({ repeats, reminder, date })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  return (
    <form className='calendar-form' onSubmit={handleSubmit}>
       {/* <ul>
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul> */}
      <div className='calendar-header'>
        <p className='calendar-title'>
          Choose date
        </p>
   
          <div onClick={onClose}>
           <i className="fa-regular fa-x calendar-x"></i>
          </div>
  
      </div>

      <div className='calendar-month-year-div'>
        <i className="fa-solid fa-arrow-left"></i>
          <div className="calendar-month-year">
          <div className="date-container">
          <div>
            <label>Date:</label>
            <input
              className="event-info"
              type="datetime-local"
              required
              min={new Date().toISOString().slice(0, 16)}
              value={date}
              onChange={(e) => setDate(e.target.value)}
            ></input>
          </div>
          </div>
        <i className="fa-solid fa-arrow-right"></i>

     </div>
      </div>

      
    </form>
  )
}


export default Calendar;