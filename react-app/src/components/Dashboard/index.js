import './Dashboard.css'
import { NavLink, Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Profile from './ProfileButton';


function Dashboard() {

  const loggedSession = useSelector((state) => (state.session.user)); 

  return(
    <>
      <div className='dash-navbar'>
        <div className='dash-logo-div'>
            <Link className='dash-link' to='/dashboard'>
            <img className='dash-logo' src='https://assets.splitwise.com/assets/core/logo-wordmark-horizontal-white-short-c309b91b96261a8a993563bdadcf22a89f00ebb260f4f04fd814c2249a6e05d4.svg'/>
            </Link>
        </div>

        <div className='profileButton-div'>
            <img className='profile-picture' src='https://s3.amazonaws.com/splitwise/uploads/user/default_avatars/avatar-teal32-50px.png' alt='profile-picture'/>
            <Profile user={loggedSession} />
        </div>
      </div>

      <div>
        <Link>
          Dashboard
        </Link>
        <Link>
          Recent Activity
        </Link>
      </div>
      <div className='dashboard-main'>
        Dashboard
      </div>
    </>
  )
}


export default Dashboard
