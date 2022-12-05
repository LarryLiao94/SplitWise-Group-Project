import React, { useState, useEffect } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import { Link, NavLink, useHistory} from 'react-router-dom';
import './Expense.css'

function Profile({ user }) {

  const history = useHistory();
  const dispatch = useDispatch();
  const [ showMenu, setShowMenu ] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => setShowMenu(false)

    document.addEventListener('click', closeMenu);

    return () => 
    document.removeEventListener('click', closeMenu)
    
  }, [showMenu])

  const logOut = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout())
    history.push('/')
  }

  return (
    <div className='profile'>
      <div className='profileButton' onClick={openMenu}>
        <div className='user-name'>
          { user.firstName + "  " + user.lastName }
        <i className="fa-solid fa-caret-down"></i>
        </div>
      </div>
      { showMenu && (
        <div className='dropDownMenu'>
          <div className='user-account'>
            <Link to={'/account/settings'} className='dropdown-links'> 
              Your account
            </Link>

            <div className='dropdown-links' onClick={logOut}>
            Log out  
            </div>
          </div>
        </div>
      )}
   </div> 
  )
}

export default Profile