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

    <div className='dashboard-div'> 
      <div className='dash-left-side column'>


      <Link>
        Dashboard
      </Link>

      <Link>
        Recent Activity
      </Link>
    
      <div className='dash-search-bar'>
        <input type='text' placeholder='Filter by name' />
      </div>
      <div className='dash-all-expenses'>
        All expenses
      </div>

        <div>
        <div className='dash-groups'>
          <div className='dash-groups-title'>
            GROUPS
          </div>
          <Link className='dash-add-link'>
            add
          </Link>
        </div>

        <div className='dash-friends'>
          <div className='dash-friends-title'>
            FRIENDS
          </div>
          <Link className='dash-add-link'>
            add
          </Link>
        </div>

        </div>
      </div>

      <div className='dash-main column'>
        <div className='dash-main-header'>
          <div className='dash-main-header-upper'>
            <div className='dashboard-title'>
              Dashboard
            </div>
            <button className='dash-add-expense-button'>
              Add an expense
            </button>
            <button className='dash-settle-up-button'>
              Settle up
            </button>
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
          <div className='dash-main-right'>
              YOU OWE
          </div>
          <div className='dash-main-left'>
              YOU ARE OWED
          </div>
        </div>
      </div>

      <div className='dash-right-side column'> 
          <div>
            SPLIT THE DINNER BILL
          </div>
      </div>

      </div>

    </>
  )
}


export default Dashboard
