import React, { useState, useEffect } from "react";
import * as sessionActions from "../../store/session";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import styles from './Calendar.module.css';
import './Calendar.css'
import './index';


function Calendar({ onClose }) {
  const dispatch = useDispatch();
  const [repeats, setRepeats] = useState('');
  const [reminder, setReminder] = useState('')
  const [day, setDay] = useState('')
  // const [month, setMonth] = useState('')
  // const [year, setYear] = useState('');
  const [errors, setErrors] = useState([])
  const [ showModal, setShowModal ] = useState(false);

  const date = new Date();

  const runCalendar = () => {
    date.setDate(1);

    const days = document.querySelector('.day');

    const lastDay = new Date(
      date.getFullYear(),
      date.getMonth() + 1, 0
    ).getDate();
    
    const dayBeforeLast = new Date(
      date.getFullYear(),
      date.getMonth() + 0
    ).getDate();

    const firstDay = date.getDay();

    const lastDayIdx = new Date(
      date.getFullYear(),
      date.getMonth() + 1
    ).getDate();

    const nextDay = 7 - lastDayIdx - 1;

    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    document.querySelector('.month').innerHTML = months[date.getMonth()];
    document.querySelector('.year').innerHTML = date.getFullYear()

    let daystr = '';

    for (let x = firstDay; x > 0; x--) {
      daystr += `<div className="prev-date">${dayBeforeLast -x + 1}</div>`
    }

    for (let i = 1; i <= lastDay; i++) {
      if (i === new Date().getDate() && date.getMonth()=== new Date().getMonth()) {
        daystr += `<div className='today'>${i}</div>`
      } else {
        daystr += `<div>${i}</div>`
      }
    }

    for (let j = 1; j < nextDay; j++) {
      daystr += `<div class="next-date">${j}</div>`;
      days.innerHTML = daystr;
    }

    document.querySelector(".prev").addEventListener("click", () => {
      date.setMonth(date.getMonth() - 1);
      runCalendar();
    });

    document.querySelector(".next").addEventListener("click", () => {
      date.setMonth(date.getMonth() + 1);
      runCalendar();
    });
    runCalendar();
  }
      
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
    <form className='calendarForm'onSubmit={handleSubmit}>
       {/* <ul>
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul> */}
      <div className='calendarHeader'>
        <p className='calendarTitle'>
          Choose date
        </p>
   
          <div onClick={onClose}>
           <i className= "fa-regular fa-x calendar-x"></i>
          </div>
      </div>

      <div className='calendarMain'>
        <div data-toggle='true' data-date='' data-date-format='yyyy-mm-dd'>
          <div className='dropdownMenu'>
              <div className='datePicker'>
                <table className='dates' width='225' cellspacing='1' cellpadding='1'>
                  
                  <thead>

                    <tr className='month-year'>

                      <th className='prev'>
                      <i className="fa-solid fa-arrow-left"></i>
                      </th>

                      <th className='date' colspan='5'>
                        <td className='month'></td>
                        <td className='year'></td>
                      </th>

                      <th className='next'>
                      <i className="fa-solid fa-arrow-right"></i>
                      </th>
                    </tr>

                    <tr className='dow'>
                      <th className='dayOfWeek'>Su</th>
                      <th className='dayOfWeek'>Mo</th>
                      <th className='dayOfWeek'>Tu</th>
                      <th className='dayOfWeek'>We</th>
                      <th className='dayOfWeek'>Th</th>
                      <th className='dayOfWeek'>Fr</th>
                      <th className='dayOfWeek'>Sa</th>
                    </tr>
                  </thead>

                  <tbody className='table-body'>
                    <tr>
                      <td className='day'>1</td>
                      <td className='day'>2</td>
                      <td className='day'>3</td>
                      <td className='day'>4</td>
                      <td className='day'>5</td>
                      <td className='day'>6</td>
                      <td className='day'>7</td>
                    </tr>
                    <tr>
                      <td className='day'>8</td>
                      <td className='day'>9</td>
                      <td className='day'>10</td>
                      <td className='day'>11</td>
                      <td className='day'>12</td>
                      <td className='day'>13</td>
                      <td className='day'>14</td>
                    </tr>
                    <tr>
                      <td className='day'>15</td>
                      <td className='day'>16</td>
                      <td className='day'>17</td>
                      <td className='day'>18</td>
                      <td className='day'>19</td>
                      <td className='day'>20</td>
                      <td className='day'>21</td>
                    </tr>
                    <tr>
                      <td className='day'>22</td>
                      <td className='day'>23</td>
                      <td className='day'>24</td>
                      <td className='day'>25</td>
                      <td className='day'>26</td>
                      <td className='day'>27</td>
                      <td className='day'>28</td>
                    </tr>
                    <tr>
                      <td className='day'>29</td>
                      <td className='day'>30</td>
                      <td className='day'>31</td>
                    </tr>
                  </tbody>

                  <tfoot className='table-foot'>
                    <div className='repeats'>
                      Repeats:
                      <select className='repeat options'
                      value={repeats}
                      onChange={(e) => setRepeats(e.target.value)}>
                         <option value='soon'>
                          Feature coming soon
                        </option>
                        <option value='once'>
                          Just this once
                        </option>
                        <option value='weekly'>
                          Weekly
                        </option>
                        <option value='fortnite'>
                          Fortnightly
                        </option>
                        <option value='monthly'>
                          Monthly
                        </option>
                        <option value='yearly'>
                          Yearly
                        </option>
                      </select>
                    </div>

                    <div className='reminders'>
                      Reminder:
                      <select className='reminder options'
                      value={reminder}
                      onChange={(e) => setReminder(e.target.value)}>
                        <option value='soon'>
                          Feature coming soon
                        </option>
                        <option value='no-reminder'>
                          No reminder
                        </option>
                        <option value='day-of'>
                          On the day of 
                        </option>
                        <option value='1-day'>
                          1 day early
                        </option>
                        <option value='3-days'>
                          3 days early
                        </option>
                        <option value='5-days'>
                          5 days early
                        </option>
                        <option value='1-week'>
                          1 week early
                        </option>
                        <option value='2-weeks'>
                          2 weeks early
                        </option>
                      </select>
                    </div>
                  </tfoot>

                </table>
              </div>
          </div>


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