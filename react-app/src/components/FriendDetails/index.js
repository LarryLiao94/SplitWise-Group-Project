import "./FriendDetails.css";
import { useEffect, useState, useMemo } from "react";
import { getExpenses } from "../../store/expense";
import { NavLink, Link, useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Profile from "./ProfileButton";
import AddFriendModal from "../AddFriendModal";
import AddExpenseModal from "../AddExpenseModal";
import SettleUpModal from "../SettleUpModal";
import { getFriends } from "../../store/friend";
import { getBalanceThunk } from "../../store/balance";
import EditExpenseModal from "../EditExpenseModal";
import { deleteExpenseThunk } from "../../store/expense";
import { getFriendIdThunk } from "../../store/friendDetails";
import FriendTabs from "./FriendRightTab";
import { getTotalBalanceThunk } from "../../store/friendTotal";
import GetExpenseComments from "../Comment/Comments";
import CommentForm from "../Comment";

function FriendDetails() {
  const dispatch = useDispatch();
  const [toggleState, setToggleState] = useState(1);
  const [search, setSearch] = useState("");
  const [refresh, setRefresh ] = useState(false)

  const toggleTab = (index) => {
    setToggleState(index);
  };

  const { id } = useParams();

  // console.log(typeof id)

 

  const expenseState = useSelector((state) => state.expenses);


  // const expensesObj = useSelector((state) => state.expenses);

  // const expenses = Object.values(expensesObj);

  const loggedSession = useSelector((state) => state.session.user);

  const friendState = useSelector((state) => state.friends);

  const oneFriends = Object.values(friendState);
  let twoFriends = oneFriends[0]?.friends;
  let allFriends;
  if (twoFriends) {
    allFriends = Object.values(twoFriends);
  }

  let idTwoFriends = oneFriends[0]?.friendId;
  let idFriends;
  if (idTwoFriends) {
    idFriends = Object.values(idTwoFriends);
  }

  const filtered = useMemo(() => {
    return allFriends?.filter((friend) => {
      return friend.toLowerCase().includes(search.toLowerCase());
    });
  }, [allFriends, search]);

  const balanceState = useSelector((state) => state.balances);

  const friendInfoState = useSelector((state) => state.friend);

  const friendTotalBalanceState = useSelector(
    (state) => state.friendTotal.friendTotal
  );
  //   console.log(friendTotalBalanceState, "hereERE");

  // console.log(friendTotalBalanceState)
  // console.log(friendTotalBalanceState)

  const history = useHistory();
  //   const onClick = async (e) => {
  //     e.preventDefault();
  //     await dispatch(deleteExpenseThunk(id));
  //   };

  useEffect(() => {
    dispatch(getExpenses());
  }, [dispatch, id]);

  useEffect(() => {
    const myFriends = async () => {
      await dispatch(getFriends());
    };
    myFriends();
  }, [dispatch, id]);

  useEffect(() => {
    const allBalance = async () => {
      await dispatch(getBalanceThunk());
    };
    allBalance();
  }, [dispatch, id]);

  useEffect(() => {
    const friendDetails = async () => {
      await dispatch(getFriendIdThunk(Number(id)));
    };
    friendDetails();
  }, [dispatch, id, expenseState]);

  useEffect(() => {
    const totalBalance = async () => {
      await dispatch(getTotalBalanceThunk(Number(id)));
      
    };
    totalBalance();
  }, [dispatch, id]);

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
          <div className="dash-friend-filter">
            <div className="search-header">
              <i className="fa-solid fa-magnifying-glass"></i>
              <input
                className="search-input"
                placeholder="Filter by name"
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
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
                  const idOfFriend = idFriends[index];
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
                placeholder="Feature coming soon"
              ></input>
              <button className="send-invite">Send invite</button>
            </div>
          </div>
        </div>

        <div className="dash-main column">
          <div className="dash-main-header">
            <div className="dash-main-header-upper">
              <div className="dashboard-title">All expenses</div>
              <div className="dash-buttons">
                <AddExpenseModal />

                <SettleUpModal />
              </div>
            </div>

            <div className="dash-main-header-balances">
              <div className="dash-total-balance-div">
                total balance
                <div className="dash-total-balance">
                  {friendTotalBalanceState}
                </div>
              </div>

              {/* <div className="dash-you-owe-div">you owe
                <div className='dash-you-owe'>
                  {balanceState.owe}
                </div>
              </div>

              <div className="dash-you-are-owed-div">you are owed
                <div className='dash-you-are-owed'>
                  {balanceState.owed}
                </div>
              </div> */}
            </div>
          </div>
          <div className="dash-expense-main-body">
            <div className="dash-expense-owe">
              {Object.keys(friendInfoState).map(function (key, index) {
                return (
                  <div
                    className="expense-tab-container"
                    key={friendInfoState[key][1].transactionId}
                  >
                    <div className="expense-tabs-div">
                      <button
                        className={
                          toggleState === friendInfoState[key][1].transactionId
                            ? "expense-tabs active-expense-tabs"
                            : "expense-tabs"
                        }
                        onClick={() =>
                          toggleTab(friendInfoState[key][1].transactionId)
                        }
                      >
                        <div
                          className="expenses"
                          key={friendInfoState[key][1].transactionId}
                        >
                          <div className="expense-left">
                            <div className="expense-date">
                              {friendInfoState[key][1].timestamp.slice(0, 11)}
                            </div>
                            <img
                              className="expense-image"
                              src="https://s3.amazonaws.com/splitwise/uploads/category/icon/square_v2/uncategorized/general@2x.png"
                            />
                            <div className="expense-title">
                              {friendInfoState[key][1].description}
                            </div>
                          </div>

                          <div className="expense-right">
                            <div className="expense-who-paid">
                              {friendInfoState[key][1].type == "owner" ? (
                                <div className="expense-transaction-div">
                                  <div className="expense-transaction-text">
                                    You paid
                                  </div>

                                  <div className="expense-you-paid-balance">
                                    ${Math.abs(friendInfoState[key][1].balance)}
                                  </div>
                                </div>
                              ) : (
                                <div className="expense-transaction-div">
                                  <div className="expense-transaction-text">
                                    {friendInfoState[key][1].ownerName} paid
                                  </div>

                                  <div className="expense-you-paid-balance">
                                    ${Math.abs(friendInfoState[key][1].balance)}
                                  </div>
                                </div>
                              )}
                            </div>

                            <div className="expense-needs-to-pay">
                              {friendInfoState[key][1].type == "owner" ? (
                                <div className="expense-transaction-div">
                                  <div className="expense-transaction-text">
                                    You lent{" "}
                                    {friendInfoState[key][1].recipientName}
                                  </div>

                                  <div className="expense-you-lent-balance">
                                    ${Math.abs(friendInfoState[key][1].balance / 2)}
                                  </div>
                                </div>
                              ) : (
                                <div className="expense-transaction-div">
                                  <div className="expense-transaction-text">
                                    {friendInfoState[key][1].ownerName} lent you
                                  </div>

                                  <div className="expense-owner-lent-balance">
                                    ${Math.abs(friendInfoState[key][1].balance / 2)}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </button>
                    </div>

                    <div className="expense-content-tabs">
                      <div
                        className={
                          toggleState === friendInfoState[key][1].transactionId
                            ? "expense-content active-expense-content"
                            : "expense-content"
                        }
                      >
                        <div className="expense-dropdown-header">
                          <div className='expense-dropdown-header-left'>
                          
                          <img
                            className="expense-dropdown-image"
                            src="https://s3.amazonaws.com/splitwise/uploads/category/icon/square_v2/uncategorized/general@2x.png"
                          />

                          <div className="expense-dropdown-header-info">
                            <div className="expense-dropdown-title">
                              {friendInfoState[key][1].description}
                            </div>

                            <div className="expense-dropdown-balance">
                              ${Math.abs(friendInfoState[key][1].balance)}
                            </div>

                            <div className="expense-dropdown-secondary-text">
                              Added by {friendInfoState[key][1].ownerName} on{" "}
                              {friendInfoState[key][1].timestamp.slice(0, 11)}
                            </div>
                            {friendInfoState[key][1].type == "owner" && (
                              <EditExpenseModal expense={expenseState[key]} />
                            )}
                          </div>
                          </div>

                        <div className="delete-expense">
                          {friendInfoState[key][1].type == "owner" && (
                            <i
                              className="fa-duotone fa-x"
                              onClick={async (e) => {
                                e.preventDefault();

                                // history.go(
                                //   `/friends/${friendInfoState[key][1].recipientId}`
                                // );
                                // console.log('hERE',friendInfoState[key][1] )
                                await dispatch(
                                  deleteExpenseThunk(
                                    friendInfoState[key][1]?.transactionId
                                  )
                                );
                              }}
                            ></i>
                          )}
                        </div>
                        </div>

                        <div key={friendInfoState[key][1].recipientId}>
                          <GetExpenseComments
                            expenseId={friendInfoState[key][1].transactionId}
                          />
                        </div>
                        <div>
                          <CommentForm
                            expense={friendInfoState[key][1].transactionId}
                          />
                        </div>
                        {/* <div className="delete-expense">
                          {friendInfoState[key][1].type == "owner" && (
                            <i
                              className="fa-duotone fa-x"
                              onClick={async (e) => {
                                e.preventDefault();

                                history.go(
                                  `/friends/${friendInfoState[key][1].recipientId}`
                                );
                                await dispatch(
                                  deleteExpenseThunk(
                                    friendInfoState[key][1].transactionId
                                  )
                                );
                              }}
                            ></i>
                          )}
                        </div> */}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="dash-right-side column">
          <FriendTabs />
        </div>
      </div>
    </>
  );
}

export default FriendDetails;
