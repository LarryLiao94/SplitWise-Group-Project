import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

function AddFriendForm() {
    const dispatch = useDispatch();
    const [credential, setCredential] = useState('');
    const [description, setDescription] = useState('');
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    const sessionUser = useSelector(state => state.session.user);


    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        //session actions required for friend
        return dispatch(sessionActions.login({ credential, password })).catch(
          async (res) => {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors);
          }
        );
      };

      return (
        <form onSubmit={handleSubmit}>
          <ul>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
          <label>
            Username or Email
            <input
              type="text"
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
              required
            />
          </label>
          <label>
            <input type='text' value={description} onChange={(e) => setDescription(e.target.value)} placeholder="send a message" />
          </label>
          <button type="submit">Add Friend</button>
        </form>
      );
}

export default AddFriendForm;
