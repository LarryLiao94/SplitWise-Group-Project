import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { getFriends } from '../../store/friend'
import './Friends.css'

const Friends = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    const myFriends = async () => {
      await dispatch(getFriends())
      console.log('dispatching')
    }
    myFriends()
  }, [])

  // const loggedSession = useSelector((state) => (state.session.user)); 
 
  const friendState = useSelector((state) => state.friends);
  const allFriends = Object.values(friendState);
 
  return (
    <div className='dash-friends-list'>
    <ul className='friends-list'>
    {
      allFriends?.map((friend) => {
        <li className='friends' key={friend.id}>
          {friend}
        </li>
        {
          
        }
      })
    }
    </ul>
  </div> 
  )
}

export default Friends