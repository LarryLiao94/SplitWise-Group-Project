import "./Dashboard.css";
import { NavLink, Link, useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Profile from "./ProfileButton";
import AddFriendModal from "../AddFriendModal";
import AddExpenseModal from "../AddExpenseModal";
import SettleUpModal from "../SettleUpModal";
import Search from '../Search';
import { getFriends } from "../../store/friend";
import { useEffect, useState, useMemo } from "react";
import { getBalanceThunk } from "../../store/balance";
// import * as friendActions from '../../store/friend'

function Dashboard() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [ search, setSearch ] = useState('')

  useEffect(() => {
    const myFriends = async () => {
      await dispatch(getFriends());
    };
    myFriends();
  }, []);

  useEffect(() => {
    const allBalance = async () => {
      await dispatch(getBalanceThunk());
    };
    allBalance();
  }, []);

  const loggedSession = useSelector((state) => state.session.user);

  const friendState = useSelector((state) => state.friends);
  // const friendIdState = useSelector((state) => state.friendId);
  const oneFriends = Object.values(friendState);
  let twoFriends = oneFriends[0]?.friends;
  let allFriends;
  if(twoFriends){
    allFriends = Object.values(twoFriends);
  }

  let idTwoFriends = oneFriends[0]?.friendId;
  let idFriends;
  if(idTwoFriends){
    idFriends = Object.values(idTwoFriends)
  }

  const balanceState = useSelector((state) => state.balances);
  // const allBalances = balanceState.balance;
  // console.log(allBalances, "HERE")

   const filtered = useMemo(() => {
    return allFriends?.filter(friend => {
      return friend.toLowerCase().includes(search.toLowerCase())
    })
  }, [allFriends, search])

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

      <div className='dash-container'>
      <div className="dashboard-div">
        <div className="dash-left-side column">
          <Link className="dash-left-side-tabs" to="/dashboard">
            <img
              className="dashboard-title-img"
              src="https://plates.splitwise.com/images/splitwise-logo-bordered.png"
            />
            Dashboard
          </Link>

          <Link className="dash-left-side-tabs" to="/transactions">
            <i className="fa-sharp fa-solid fa-flag"></i>
            Recent activity
          </Link>

          {/* <div className="dash-search-bar">
            <Search friends={getFriends}/>
          </div> */}
          
          <div className='dash-friend-filter'>

            <div className='search-header'>
              <i className="fa-solid fa-magnifying-glass"></i>
              <input
                className='search-input'
                placeholder="Filter by name"
                type='search'
                value={search}
                onChange={e => setSearch(e.target.value)}
                />
            </div>

          <Link className="dash-all-expenses" to="/expenses">
            <i className="fa-solid fa-list"></i>
            All expenses
          </Link>

            <div>
            <div className="dash-groups">
              <div className="dash-groups-title">GROUPS</div>
              <Link className="dash-add-link" to="/groups/new">
                <i className="fa-sharp fa-solid fa-plus"></i>
                add
              </Link>
            </div>

            <div className="dash-friends">
              <div className="dash-friends-title">FRIENDS</div>
              <Link className="dash-add-link">
                <i className="fa-sharp fa-solid fa-plus"></i>

                <AddFriendModal />
              </Link>
            </div>

            <div className="dash-friends-list-container">
            {filtered?.map((friend, index) => {
              const idOfFriend = idFriends[index]
              return (
                <Link className="friends-div" to={`/friends/${idOfFriend}`}>
                    <i className="fa-solid fa-user"></i>
                    <li className="friends" key={friend.id}>
                      {friend}
                     </li>
                </Link>
               );
              })}
            </div>
          </div>

            <div className="invite-friends-div">
              <div className="invite-friends">Invite friends</div>
              <input
                className="invite-friends-input"
                placeholder="Enter an email address"
              ></input>
              <button className="send-invite">Send invite</button>
            </div>
          </div>
        </div>

        <div className="dash-main column">
          <div className="dash-main-header">
            <div className="dash-main-header-upper">
              <div className="dashboard-title">Dashboard</div>
              <div className="dash-buttons">
                <AddExpenseModal />

                <SettleUpModal />
              </div>
            </div>

            <div className="dash-main-header-balances">

              <div className="dash-total-balance-div">total balance 
                <div className='dash-total-balance'>
                  {balanceState.balance}
                </div>
              </div>

              <div className="dash-you-owe-div">you owe
                <div className='dash-you-owe'>
                  {balanceState.owe}
                </div>
              </div>

              <div className="dash-you-are-owed-div">you are owed
                <div className='dash-you-are-owed'> 
                  {balanceState.owed}
                </div>
              </div>

            </div>
          </div>
          <div className="dash-main-body">
            <div className="dash-owe">
              <div className="dash-main-left">YOU OWE</div>
              <div className="dash-main-right">YOU ARE OWED</div>
            </div>
          </div>
        </div>

        <div className="dash-right-side column">
          <div className="dash-right-split-text">SPLIT THE DINNER BILL</div>
          <img
            className="knife-fork"
            src="https://assets.splitwise.com/assets/fat_rabbit/sidebar/plates-01a8a1ced1d926765746e2638c42d5d829416fb14326e1a1be5cd34440d4ba76.png"
          />
          <div className="plates-download-text">
            Check out Plates, our free iOS app to quickly and easily split
            dinner bills with friends.
          </div>
          <div className="plates-download-button">
            <a className='plates-text' href='https://apps.apple.com/us/app/plates-by-splitwise/id669801762'>
                <p className='plates-text-secondary'>
                  Download Plates
                </p>
            </a>
          </div>
          </div>
      </div>
    </div>
    </>
  );
}

export default Dashboard;
