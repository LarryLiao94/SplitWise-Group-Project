import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import "./Image.css";
import "./index";

function Image({ onClose }) {
  const dispatch = useDispatch();
  const history = useHistory()

  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState([]); 

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setErrors([])
    
  //   return(e)
  //   // return dispatch(sessionActions.login({ image, description })).catch(
  //   //   async (res) => {
  //   //     const data = await res.json();
  //   //     if (data && data.errors) setErrors(data.errors);
  //   //   }
  //   // );
  // }

  return (
    <form className='add-image-form'>
      
      <div className='image-header'>
        <p className='add-image-title'>
          Add image/notes
        </p>
  
        <div onClick={onClose}>
          <i className= "fa-regular fa-x calendar-x"></i>
        </div>
      </div>

      <div className='add-image'>
        <p className='add-image-text'>
          Attach an image or PDF:
        </p>
        <button className='choose-file'>
          Choose File
        </button>
      </div>

      <div className='add-image-description-div'>
        <input className='add-image-description' type='text' value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Add notes" />
      </div>
      
      <div className='add-image-submit-div'>
        <button className='add-image-submit-button' type="submit">Done</button>
      </div>
    </form>
  )
}

export default Image;