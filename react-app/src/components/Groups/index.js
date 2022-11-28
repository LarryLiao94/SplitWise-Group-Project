import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import './Groups.css'


const Groups = () => {
  const [ errors, setErrors ] = useState([]);
  const [ groupName, setGroupName ] = useState('')
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const updateGroupName = (e) => {
    setGroupName(e.target.value);
  }

  return (
    <form className='new-group-form'>
      <img height="200" width="200" className="group-splitwise-logo" src="https://assets.splitwise.com/assets/core/logo-square-65a6124237868b1d2ce2f5db2ab0b7c777e2348b797626816400534116ae22d7.svg"></img>
      <div>
      <h2 className='start-group-text'>
        START A NEW GROUP
      </h2>
      <div className='new-group-text'>
        My group shall be called...
      </div>
        <div>
         <input
          className='group-name-input'
          type="text"
          name="name"
          placeholder="1600 Pennsylvania Ave"
          onChange={updateGroupName}
          value={groupName}
          />
        </div>

      <button className='group-submit-button' type="submit">Save</button>

      {/* <div className='group-tos'>
        By signing up, you accept the Splitwise Terms of Service.
      </div> */}
      </div>

      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      </form>
  )
}

export default Groups