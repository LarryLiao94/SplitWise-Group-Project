import { csrfFetch } from "./csrf";

const GET_COMMENT = "comment/GET_COMMENT";
const ADD_COMMENT = "comment/ADD_COMMENT";
const EDIT_COMMENT = "comment/EDIT_COMMENT";
const DELETE_COMMENT = "comments/DELETE_COMMENT";

const getAllComments = (comments) => ({
  type: GET_COMMENT,
  comments,
});

const addComment = (comment) => ({
  type: ADD_COMMENT,
  comment,
});

const editComment = (comment) => ({
  type: EDIT_COMMENT,
  comment,
});

const deleteComment = (comment) => ({
  type: DELETE_COMMENT,
  comment,
});

export const getAllCommentsThunk = (id) => async (dispatch) => {
  const res = await csrfFetch(`/api/expense/${id}/comments`);
  const { comments } = await res.json();

  if (res.ok) {
    const data = {};
    comments.forEach((comment) => (data[comment.id] = comment));
    dispatch(getAllComments(data));
  }
};

export const addCommentThunk = (comment) => async (dispatch) => {
  const { id } = comment;
  const res = await csrfFetch(`/api/expense/${id}/comments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(comment),
  });
  if (res.ok) {
    const newComment = await res.json();
    dispatch(addComment(newComment));
  }
};

export const editCommentThunk = (comment) => async (dispatch) => {
  const { id } = comment;
  const res = await csrfFetch(`/api/comments/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(comment),
  });
  if (res.ok) {
    const editedComment = await res.json();
    dispatch(editComment(editedComment));
  }
};

export const deleteCommentThunk = (comment) => async (dispatch) => {
  const res = await csrfFetch(`/api/comments/${comment.id}`, {
    method: "DELETE",
  });

  if (res.ok) {
    dispatch(deleteComment(comment));
    return res;
  }
};

const inititalState = {};
const commentsReducer = (state = inititalState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case GET_COMMENT:
      newState = { ...state, ...action.comments };
      return newState;

    case ADD_COMMENT:
      newState = { ...state, [action.comment.id]: action.comment };
      return newState;

    case EDIT_COMMENT:
      newState = { ...state, [action.comment.id]: action.comment };
      return newState;

    case DELETE_COMMENT:
      delete newState[action.comment.id];
      return newState;

    default:
      return state;
  }
};

export default commentsReducer;
