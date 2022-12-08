import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Profile from "./ProfileButton";
import './FriendDetails.css'

const RemoveFriendForm = () => {
  const { id } = useParams();
  const loggedSession = useSelector((state) => state.session.user);

  // const friend = useSelector(state => state.friend)
  return (
<>
    <div className="dash-navbar">
      <div className="dash-logo-div">
        <Link className="dash-link" to="/dashboard">
          <img
            className="dash-logo"
            src="https://assets.splitwise.com/assets/core/logo-wordmark-horizontal-white-short-c309b91b96261a8a993563bdadcf22a89f00ebb260f4f04fd814c2249a6e05d4.svg"
          />
        </Link>
      </div>

      <div className="profileButton-div">
        <img
          className="profile-picture"
          src="https://s3.amazonaws.com/splitwise/uploads/user/default_avatars/avatar-teal32-50px.png"
          alt="profile-picture"
        />
        <Profile user={loggedSession} />
        {/* <i className="fa-solid fa-caret-down"></i> */}
      </div>
    </div>

    <div className='remove-friend-container'>
      <h3 className='remove-friend-title'>
        Edit friend info
      </h3>
      {/* {friend.email} */}
      <span className='remove-friend-text'>
      Some of your expenses with this person also involve other third parties. 
      <span className='remove-friend-text-bold'>
        As a result, deleting this friend will not delete those expenses, and they will still be visible from the "All expenses" screen. 
      </span>
        However, this friend should be removed from your list of friends successfully.
      </span>
      <div className='remove-friend-buttons'>
      <button className='remove-friend-cancel'>
        Cancel
      </button>
      <button className='remove-friend-delete'>
        Delete this friend
      </button>
      </div>
    </div>
    </>
  )
}

export default RemoveFriendForm;