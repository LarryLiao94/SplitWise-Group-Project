import React, { useState, useEffect } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import styles from './Calendar.module.css';
// import styles from './Calendar.css';
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
    <form className={styles.calendarForm} onSubmit={handleSubmit}>
       {/* <ul>
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul> */}
      <div className={styles.calendarHeader}>
        <p className={styles.calendarTitle}>
          Choose date
        </p>
   
          <div onClick={onClose}>
           <i className= "fa-regular fa-x calendar-x"></i>
          </div>
  
      </div>

      <div className='styles.calendarMain'>
        <div data-toggle='true' data-date='' data-date-format='yyyy-mm-dd'>
             
        </div>       
      </div>
    {/* 
     <div className={styles.calendarMonthYearDiv}>
        <i className="fa-solid fa-arrow-left"></i>
          <div className={styles.calendarMonthYear}>
          <div className={styles.dateContainer}>
          <div>
            <label>Date:</label>
            <input
              className={styles.eventInfo}
              type="date-local"
              required
              min={new Date().toISOString().slice(0, 16)}
              value={date}
              onChange={(e) => setDate(e.target.value)}
            ></input>
          </div>
          </div>
        <i className="fa-solid fa-arrow-right"></i>
     </div>
      </div>  */}


      
    </form>
  )
}


export default Calendar;