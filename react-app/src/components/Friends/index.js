import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { getFriends } from "../../store/friend";
import "./Friends.css";
import "./script.js"

const Friends = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const myFriends = async () => {
      await dispatch(getFriends());
      // console.log('dispatching')
    };
    myFriends();
  }, [dispatch]);

  // const loggedSession = useSelector((state) => (state.session.user));

  // const friendState = useSelector((state) => state.friends);
  // const allFriends = Object.values(friendState);
  // console.log(allFriends);

  return (
    <>
      <div class="container">
        <header class="header">
            <input type="text" id="filter" placeholder="Search" />
        </header>
        <ul id="result" class="user-list">
            <li></li>
        </ul>
      </div>
        <script src="script.js"></script>
    </>
  );
};

export default Friends;
