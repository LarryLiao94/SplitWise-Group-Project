import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCommentsThunk,
  deleteCommentThunk,
  editCommentThunk,
} from "../../store/comment";
import "./Comments.css";
import EditCommentModal from "../EditCommentModal";

export default function GetExpenseComments({ expenseId }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCommentsThunk(expenseId));
  }, [dispatch, expenseId]);
  const commentsObj = useSelector((state) => state.comments);

  const comments = Object.values(commentsObj);

  return (
    <div>
      <h3>Comments</h3>
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
                </div>
                <button
                  onClick={async (e) => {
                    e.preventDefault();
                    await dispatch(deleteCommentThunk(comment));
                  }}
                >
                  delete comment
                </button>
              </div>
            ) : (
              <></>
            );
          }
        })}
      </div>
    </div>
  );
}
