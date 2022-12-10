import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, NavLink, Link} from 'react-router-dom';
import { login } from '../../store/session';
import './LoginForm.css'

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const handleGuestLogin = (e) => {
    e.preventDefault();

    return (
      setEmail('demo@aa.io'),
      setPassword('password')
    )
  }

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <form className='login-form' onSubmit={onLogin}>
    
    <div className='login-form-header'>
      <div className='logo'>
          <Link className='home-link' to='/'>
          <img className='landing-logo' src='https://plates.splitwise.com/images/splitwise-logo-bordered.png'/>
          </Link>
          <h3 className='landing-logo-text'>Splitwise</h3>
      </div>
      <nav className='landing-nav'>
        <ul className='landing-nav-list'>
            <li>
                <NavLink to='/login' exact={true} className='active login'>
                    Log in
                </NavLink>
            </li>

            <li>
                <button className='active signup'> 
                 <NavLink to='/sign-up' exact={true} className='active signup'>
                    Sign up
                    </NavLink>
                </button>
            </li>
        </ul>
      </nav>
    </div>

      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div className='login-form-div'>
      <div className='login-form-main'>
        <p className='login-title'>
          Log in
        </p>
        <label className='email-address-label' htmlFor='email'>Email address</label>
        <div className='email-div'>
        <input
          className='email-input'
          name='email'
          type='text'
          value={email}
          onChange={updateEmail}
        />
      </div>
        <label className='password-label' htmlFor='password'>Password</label>
      <div className='password-div'>
        <input
          className='password-input'
          name='password'
          type='password'
          value={password}
          onChange={updatePassword}
        />
      </div>
        <button className='submit-button' type='submit'>Log in</button>
      
        <button onClick={handleGuestLogin}type='submit' className='gsi-button'>
        <h2 className='gsi-button-text'> 
          Continue as Guest
        </h2> 
        </button>
       </div>
      </div>

    </form>
  );
};

export default LoginForm;
