import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getExpenses } from "../../store/expense";
import { getBalanceThunk } from "../../store/balance";
import { getTotalBalanceThunk } from "../../store/friendTotal";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import RemoveFriendForm from "./RemoveFriend";
import "./FriendDetails.css";

function FriendTabs() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const [toggleState, setToggleState] = useState(1);
  const expenseState = useSelector((state) => state.expenses);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  const friendTotalBalanceState = useSelector(
    (state) => state.friendTotal.friendTotal
  );

  useEffect(() => {
    const totalBalance = async () => {
      await dispatch(getTotalBalanceThunk(Number(id)));
      
    };
    totalBalance();
  }, [dispatch, id, expenseState ]);


  return (
    <div className="tab-container">
      <div className="tabs-div">
        <button
          className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(1)}
        >
          <i className="fa-solid fa-bars"></i>
        </button>
        <button
          className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(2)}
        >
          <i className="fa-regular fa-calendar-days"></i>
        </button>
        <button
          className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(3)}
        >
          <i className="fa-solid fa-chart-column"></i>
        </button>
        <button
          className={toggleState === 4 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(4)}
        >
          <i className="fa-solid fa-gear"></i>
        </button>
      </div>

      <div className="content-tabs">
        <div
          className={toggleState === 1 ? "content  active-content" : "content"}
        >
          <h2 className="your-total-balance-text">YOUR TOTAL BALANCE</h2>
          {
            friendTotalBalanceState > 0 
            ?
            <div className="your-total-balance">
            {/* <div className="tab-you-owe-text">you owe</div> */}
            <div className="balance-total-positive">${friendTotalBalanceState}</div>
            {/* <div className="balance-total-positive">$0</div> */}
          </div>
            :
            <div className="your-total-balance">
              <div className="tab-you-owe-text">you owe</div>
              <div className="balance-total">${friendTotalBalanceState}</div>
            </div>
          }
        </div>

        <div
          className={toggleState === 2 ? "content  active-content" : "content"}
        >
          <h2 className="upcoming-expenses-text">UPCOMING EXPENSES</h2>
          <div className="upcoming-expenses-text-secondary">
           Feature coming soon
          </div>
        </div>

        <div
          className={toggleState === 3 ? "content  active-content" : "content"}
        >
          <h2 className="trends-this-month-text">TRENDS THIS MONTH - Feature coming soon </h2>
          <div className="trends">
            <div className="you-paid-for">
              <strong className="trend-text">Total you paid for</strong>
              {<div className="trend-balance">$0</div>}
            </div>
            <div className="total-share-text">
              <strong className="trend-text">Your total share</strong>
              {<div className="trend-balance-share">$0</div>}
            </div>
            <div className="payments-made-text">
              <strong className="trend-text">Payments made</strong>
              {<div className="trend-balance">$0</div>}
            </div>
            <div className="payments-received-text">
              <strong className="trend-text">Payments received</strong>
              {<div className="trend-balance">$0</div>}
            </div>
            <div className="total-change-text">
              <strong className="trend-text">Total change in balance</strong>
              {<div className="trend-balance">$0</div>}
            </div>
          </div>
        </div>

        <div
          className={toggleState === 4 ? "content  active-content" : "content"}
        >
          <h2 className="upcoming-expenses-text">FRIEND SETTINGS</h2>
          <Link to={`/friends/${id}/edit`}>
            <button className="remove-friend-text-secondary">
              Remove this friend
            </button>
            {/* <RemoveFriendForm /> */}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default FriendTabs;
