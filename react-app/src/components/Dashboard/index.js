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
            {/* <i className="fa-solid fa-caret-down"></i> */}
        </div>
      </div>

    <div className='dashboard-div'> 
      <div className='dash-left-side column'>
        <Link className='dash-left-side-tabs' to='/dashboard'>
        <img className='dashboard-title-img' src='https://plates.splitwise.com/images/splitwise-logo-bordered.png'/>
          Dashboard
        </Link>

        <Link className='dash-left-side-tabs' to='/activity'>
        <i className="fa-sharp fa-solid fa-flag"></i>
          Recent activity
        </Link>
      <div className='dash-search-bar'>
        <i className="fa-solid fa-magnifying-glass"></i>
        <input type='text' placeholder='Filter by name' />
      </div>
      <Link className='dash-all-expenses' to='/all'>
      <i className="fa-solid fa-list"></i>
        All expenses
      </Link>

        <div>
        <div className='dash-groups'>
          <div className='dash-groups-title'>
            GROUPS
          </div>
          <Link className='dash-add-link' to='/groups/new'>
          <i className="fa-sharp fa-solid fa-plus"></i>
            add
          </Link>
        </div>

        <div className='dash-friends'>
          <div className='dash-friends-title'>
            FRIENDS
          </div>
          <Link className='dash-add-link'>
          <i className="fa-sharp fa-solid fa-plus"></i>
            add
          </Link>
        </div>

        <div className='invite-friends-div'>
          <div className='invite-friends'>
            Invite friends
          </div>
          <input className='invite-friends-input' placeholder='Enter an email address'>
          </input>
          <button className='send-invite'>
            Send invite
          </button>
        </div>

        </div>
      </div>

      <div className='dash-main column'>
        <div className='dash-main-header'>
          <div className='dash-main-header-upper'>
            <div className='dashboard-title'>
              Dashboard
            </div>
            <div className='dash-buttons'>
              <button className='dash-add-expense-button'>
                Add an expense
              </button>
              <button className='dash-settle-up-button'>
                Settle up
              </button>
            </div>
          </div>
          <div className='dash-main-header-balances'>
            <div className='dash-total-balance'>
              total balance
            </div>
            <div className='dash-you-owe'>
              you owe
            </div>
            <div className='dash-you-are-owed'>
              you are owed
            </div>
          </div>
        </div>
        <div className='dash-main-body'>
          <div className='dash-owe'>

          <div className='dash-main-left'>
              YOU OWE
          </div>
          <div className='dash-main-right'>
              YOU ARE OWED
          </div>

          </div>
        </div>
      </div>

      <div className='dash-right-side column'> 
          <div className='dash-right-split-text'>
            SPLIT THE DINNER BILL
          </div>
          <img className='knife-fork' src='https://assets.splitwise.com/assets/fat_rabbit/sidebar/plates-01a8a1ced1d926765746e2638c42d5d829416fb14326e1a1be5cd34440d4ba76.png'/>
          <div className='plates-download-text'>
            Check out Plates, our free iOS app to quickly and easily split dinner bills with friends.
          </div>
          <button className='plates-download-button'>
            Download Plates
          </button>
      </div>

      </div>

    </>
  )
}


export default Dashboard
