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
  const { expenseId } = expense;

  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    let payload = {
      id: expenseId,
      expenseId: expenseId,
      comment,
    };

    try {
      dispatch(addCommentThunk(payload));

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
        <form onSubmit={handleSubmit}>
          <p>NOTES AND COMMENTS</p>
          {errors && (
            <ul>
              {errors.map((error, idx) => (
                <li className="errors" key={idx}>
                  {error}
                </li>
              ))}
            </ul>
          )}
          <label>
            Review
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            />
          </label>

          <input type="submit" />
        </form>
      </div>
    </div>
  );
}
