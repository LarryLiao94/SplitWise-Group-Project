import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCommentsThunk } from "../../store/comment";
import './Comments.css'

export default function GetExpenseComments({ expenseId }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCommentsThunk(expenseId));
    // getAllSpots();
  }, [dispatch, expenseId]);
  const commentsObj = useSelector((state) => state.comments);
  const comments = Object.values(commentsObj);

  return (
    <div>
      <h3>Comments</h3>
      <div id="comments">
        {comments.map((comment) => (
          // {if (comment.expenseId === expenseId)}
          <div id="comment-container" key={comment.id}>
            <div id="comment" key={comment.id}>
              {comment.comment}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
