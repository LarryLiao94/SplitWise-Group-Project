import "./Transactions.css";
import { NavLink, Link, useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useMemo } from "react";
import Profile from "./ProfileButton";
import AddFriendModal from "../AddFriendModal";
import AddExpenseModal from "../AddExpenseModal";
import SettleUpModal from "../SettleUpModal";
import { getFriends } from "../../store/friend";
import { getBalanceThunk } from "../../store/balance";
import { getAllTransactions } from "../../store/transactions";

function TransactionsPage() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(getAllTransactions());
  }, []);

  const transactionObj = useSelector((state) => state.transactions);


  const transactions = Object.values(transactionObj);

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
  // const allBalances = balanceState.balance;
  
  

  const expenseState = useSelector((state) => state.expenses);

  useEffect(() => {
    const myFriends = async () => {
      await dispatch(getFriends());
    };
    myFriends();
  }, []);

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
              <div className="dashboard-title">Recent activity</div>
            </div>
          </div>
          <div className="dash-main-body">
            <div className="transactions-container">
              {Object.keys(transactionObj).map(function (key, index) {
                return (
                  <>
                    {transactionObj[key].transactionType == "friend" ? (
                      <div
                        className="transaction"
                        key={transactionObj[key].transactionId}
                      >
                         <div className="default-image-link">
                          <img
                            className="transaction-default-image"
                            src="https://s3.amazonaws.com/splitwise/uploads/category/icon/square_v2/uncategorized/general@2x.png"
                            height="40"
                            width="40"
                          />
                         </div>
                        <div className="transaction-info">
                          <div className="transaction-description">
                            {transactionObj[key].transactionType == "friend"
                              ? transactionObj[key].type == "owner"
                                ? `You added ${transactionObj[key].recipientName}`
                                : `${transactionObj[key].recipientName} added you`
                              : transactionObj[key].type == "owner"
                              ? `You added ${transactionObj[key].description}`
                              : `${transactionObj[key].ownerName} added ${transactionObj[key].description}`}
                          </div>
                          {transactionObj[key].type == "owner" ? (
                            <div className="transaction-balance-owe">
                              {transactionObj[key].transactionType == "expense"
                                ? transactionObj[key].type == "owner"
                                  ? `You get back $${
                                      transactionObj[key].balance / 2
                                    }`
                                  : `You owe $${
                                      transactionObj[key].balance / 2
                                    }`
                                : ``}
                            </div>
                          ) : (
                            <div className="transaction-balance-paid">
                              {transactionObj[key].transactionType == "expense"
                                ? transactionObj[key].type == "owner"
                                  ? `You get back $${
                                      transactionObj[key].balance / 2
                                    }`
                                  : `You owe $${
                                      transactionObj[key].balance / 2
                                    }`
                                : ``}
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <NavLink
                        className="transaction"
                        key={transactionObj[key].transactionId}
                        to="/expenses"
                      >
                         <div className="default-image-link">
                          <img
                            className="transaction-default-image"
                            src="https://s3.amazonaws.com/splitwise/uploads/category/icon/square_v2/uncategorized/general@2x.png"
                            height="40"
                            width="40"
                          />
                         </div>
                        <div className="transaction-info">
                          <div className="transaction-description">
                            {transactionObj[key].transactionType == "friend"
                              ? transactionObj[key].type == "owner"
                                ? `You added ${transactionObj[key].recipientName}`
                                : `${transactionObj[key].recipientName} added you`
                              : transactionObj[key].type == "owner"
                              ? `You added ${transactionObj[key].description}`
                              : `${transactionObj[key].ownerName} added ${transactionObj[key].description}`}
                          </div>
                          {transactionObj[key].type == "owner" ? (
                            <div className="transaction-balance-owe">
                              {transactionObj[key].transactionType == "expense"
                                ? transactionObj[key].type == "owner"
                                  ? `You get back $${
                                      transactionObj[key].balance / 2
                                    }`
                                  : `You owe $${
                                      transactionObj[key].balance / 2
                                    }`
                                : ``}
                            </div>
                          ) : (
                            <div className="transaction-balance-paid">
                              {transactionObj[key].transactionType == "expense"
                                ? transactionObj[key].type == "owner"
                                  ? `You get back $${
                                      transactionObj[key].balance / 2
                                    }`
                                  : `You owe $${
                                      transactionObj[key].balance / 2
                                    }`
                                : ``}
                            </div>
                          )}
                        </div>
                       </NavLink>
                    )}
                  </>
                );
              })}
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
          <button className="plates-download-button">Download Plates</button>
        </div>
      </div>
    </>
  );
  //   return (
  //     <>
  //       <div className="transactions-container">
  //         <h1>Hello From Transactions</h1>
  //         {transactions.map((transaction) => (
  //           <div>{transaction.description}</div>
  //         ))}
  //       </div>
  //     </>
  //   );
}

export default TransactionsPage;
