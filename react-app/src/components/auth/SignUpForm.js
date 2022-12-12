import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";
import { login } from "../../store/session";
import { NavLink } from "react-router-dom";
import './Signup.css'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  // const [ showSecondary, setShowSecondary ] = useState(false)
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  // const revealSecondary = () => {
  //   if ( showSecondary ) return;
  //   setShowSecondary(true);
  // }

  // useEffect(() => {
  //   if (!showSecondary) return;
  //   const closeSecondary = () => setShowSecondary(false)
  //   document.addEventListener('click', closeSecondary)

  //   return () => 
  //   document.removeEventListener('click', closeSecondary)
  // }, [showSecondary])

  const reset = () => {
    setEmail("");
    setPassword("");
  };

  // const demoUser = async (e) => {
  //   e.preventDefault();
  //   await dispatch(login("demo@aa.io", "password"))
  //     .then(() => {
  //       reset();
  //     })
  //     .catch(async (res) => {
  //       const data = await res.json();
  //       if (data && data.errors) {
  //         setErrors(Object.values(data.errors));
  //       }
  //     });
  // };

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(
        signUp(username, firstName, lastName, phoneNumber, email, password)
      );
      if (data) {
        setErrors(data);
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value.trim());
  };

  const updateFirstName = (e) => {
    setFirstName(e.target.value.trim());
  };

  const updateLastName = (e) => {
    setLastName(e.target.value.trim());
  };

  const updatePhoneNumber = (e) => {
    setPhoneNumber(e.target.value.trim())
    
  };

  const updateEmail = (e) => {

    setEmail(e.target.value.trim());
  };

  const updatePassword = (e) => {
    setPassword(e.target.value.trim());
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value.trim());
  };

  if (user) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <form className='signup-form' onSubmit={onSignUp}>
       <NavLink className='signup-index' to='/'>
      <img height="200" width="200" className="signup-splitwise-logo" src="https://assets.splitwise.com/assets/core/logo-square-65a6124237868b1d2ce2f5db2ab0b7c777e2348b797626816400534116ae22d7.svg"></img>
      </NavLink>
      <div>
      <h2 className='introduce-text'>
        INTRODUCE YOURSELF
      </h2>
      <div className='signup-username-text'>
        Hi there! My username will be 
      </div>
        <div>
         <input
          className='signup-username-input'
          type="text"
          name="userName"
          onChange={updateUsername}
          // onInput={revealSecondary()}
          required
          value={username}
          />
        </div>

      <div className='signup-firstname-text'>
        My first name
      </div>
        <div>
         <input
          className='signup-firstname-input'
          type="text"
          name="firstName"
          onChange={updateFirstName}
          // onInput={revealSecondary()}
          value={firstName}
          />
        </div>

      <div className='signup-lastname-text'>
        and last name
      </div>
        <div>
         <input
          className='signup-lastname-input'
          type="text"
          name="lastName"
          onChange={updateLastName}
          // onInput={revealSecondary()}
          value={lastName}
          required
          />
        </div>

      <div className='signup-number-text'>
        This is my phone number:
      </div>
        <div>
         <input
          className='signup-number-input'
          type="text"
          name="phoneNumber"
          onChange={updatePhoneNumber}
          // onInput={revealSecondary()}
          value={phoneNumber}
          required
          />
        </div>

      <div className='secondary-fields'>
      <div className='signup-email-div'>
         Here's my 
        <strong className='signup-email'>
          email address:
        </strong>
        <br/>
        <input
          className='signup-email-input'
          type="text"
          name="email"
          onChange={updateEmail}
          value={email}
          required
          />
      </div>

      <div className='signup-password-div'>
          Here's my
        <strong className='signup-password'>
          password:
        </strong>
        <br/>
        <input
          className='signup-password-input'
          type="password"
          name="password"
          onChange={updatePassword}
          value={password}
          required
          />
      </div>

      <div className='signup-repeatpassword-div'>
          Here's my
        <strong className='signup-repeatpassword'>
          password again:
        </strong>
        <br/>
        <input
          className='signup-repeatpassword-input'
          type="password"
          name="repeatpassword"
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
          />
      </div>

      {/* <input type='hidden' /> */}
      </div>

      <button className='signup-submit-button' type="submit">Sign me up!</button>

      <div className='signup-tos'>
        By signing up, you accept the Splitwise Terms of Service.
      </div>
      </div>
   
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>


      {/* <div>
        <label>User Name</label>
        <input
          type="text"
          name="username"
          onChange={updateUsername}
          value={username}
        />
      </div>
      <div>
        <label>First Name</label>
        <input
          type="text"
          name="firstName"
          onChange={updateFirstName}
          value={firstName}
        />
      </div>
      <div>
        <label>Last Name</label>
        <input
          type="text"
          name="lastName"
          onChange={updateLastName}
          value={lastName}
        />
      </div>
      <div>
        <label>Phone Number</label>
        <input
          type="text"
          name="phoneNumber"
          onChange={updatePhoneNumber}
          value={phoneNumber}
        />
      </div>
      <div>
        <label>Email</label>
        <input
          type="text"
          name="email"
          onChange={updateEmail}
          value={email}
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          name="password"
          onChange={updatePassword}
          value={password}
        />
      </div>
      <div>
        <label>Repeat Password</label>
        <input
          type="password"
          name="repeat_password"
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
        />
      </div> */}
      {/* <button className='signup-submit-button' type="submit">Sign me up!</button> */}
    </form>
  );
};

export default SignUpForm;
