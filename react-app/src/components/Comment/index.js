import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  addCommentThunk,
  editCommentThunk,
  getAllCommentsThunk,
} from "../../store/comment";
export default function CommentForm({ expense }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    let payload = {
      id: expense,
      expenseId: expense,
      comment,
    };

    try {
      dispatch(addCommentThunk(payload));
      setComment("");

      //   dispatch(getAllreviews(expenseId));
      //   history.go(`/expenses`);
    } catch (res) {
      const data = await res.json();

      const err = [data.message];
      if (data && data.message) setErrors(err);
    }
  };

  return (
    <div id="review-form-container">
      <div id="form-container">
        <form className="comment-form" onSubmit={handleSubmit}>
          {errors && (
            <ul>
              {errors.map((error, idx) => (
                <li className="errors" key={idx}>
                  {error}
                </li>
              ))}
            </ul>
          )}

          <textarea
            className="add-comment-area"
            value={comment}
            placeholder="Add a comment"
            pattern="^(?!\s*$).+"
            onChange={(e) => setComment(e.target.value)}
            required
          />

          <button className="comment-submit" type="submit">
            Post
          </button>
        </form>
      </div>
    </div>
  );
}
