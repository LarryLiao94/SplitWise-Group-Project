import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCommentsThunk,
  deleteCommentThunk,
  editCommentThunk,
} from "../../store/comment";
import "./Comments.css";
import EditCommentModal from "../EditCommentModal";
import { getTotalBalanceThunk } from "../../store/friendTotal";
import { getFriends } from "../../store/friend";
import { getBalanceThunk } from "../../store/balance";
import { getExpenses } from "../../store/expense";
import CommentForm from './index';

export default function GetExpenseComments({ expenseId }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCommentsThunk(expenseId));
  }, [dispatch, expenseId]);
  const commentsObj = useSelector((state) => state.comments);

  const comments = Object.values(commentsObj);
  useEffect(() => {
    dispatch(getExpenses());
  }, []);
  
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

  // useEffect(() => {
  //   const friendDetails = async () => {
  //     await dispatch(getFriendIdThunk(Number(id)))
  //   };
  //   friendDetails()
  // }, []);

  // useEffect(() => {
  //   const totalBalance = async () => {
  //     await dispatch(getTotalBalanceThunk(Number(id)))
  //   };
  //   totalBalance()
  // }, []);

  const expensesObj = useSelector((state) => state.expenses);

  const expenses = Object.values(expensesObj);

  const loggedSession = useSelector((state) => state.session.user);

  const friendState = useSelector((state) => state.friends);

  const allFriends = Object.values(friendState);

  const balanceState = useSelector((state) => state.balances);

  const expenseState = useSelector((state) => state.expenses);

  const friendInfoState = useSelector((state) => state.friend);

  const friendTotalBalanceState = useSelector((state) => state.friendTotal.friendTotal);



  return (
    <div className='comments-container'>
      <div className='comments-transaction-balances'>
        {/* Transactions between friends */}
      </div>

      <div className='comments-div'>
        <div className='comments-header'>

          <i className="fa-solid fa-comment"></i> 
          <span className='notes-and-comments'>
            NOTES AND COMMENTS 
          </span>
        </div>

      <div id="comments">
        {comments.map((comment) => {
          {
            return comment.expenseId === expenseId ? (
              <div id="comment-container" key={comment.id}>
                <div id="comment" key={comment.id}>
                  {comment.comment}
                </div>
                <div>
                  <EditCommentModal comment={comment} />
                <i className="fa-light fa-x" onClick={async (e) => {
                  e.preventDefault();
                  await dispatch(deleteCommentThunk(comment));
                }}></i>
                </div>
                {/* <button
                  onClick={async (e) => {
                    e.preventDefault();
                    await dispatch(deleteCommentThunk(comment));
                  }}
                >
                  delete comment
                </button> */}
              </div>
            ) : (
              <></>
            );
          }
        })}
      </div>
        {/* <div>
          <CommentForm />
        </div> */}
      </div>
    </div>
  );
}
