import { csrfFetch } from "./csrf";

const GET_EXPENSE = "expense/GET_EXPENSE";
const ADD_EXPENSE = "expense/ADD_EXPENSE";
const EDIT_EXPENSE = "expense/EDIT_EXPENSE";
const DELETE_EXPENSE = "expense/DELETE_EXPENSE";

const getAllExpenses = (expenses) => ({
  type: GET_EXPENSE,
  expenses,
});

const addExpense = (expense) => ({
  type: ADD_EXPENSE,
  expense,
});

const editExpense = (expense) => ({
  type: EDIT_EXPENSE,
  expense,
});

const deleteExpense = (expense) => ({
  type: DELETE_EXPENSE,
  expense,
});

export const getExpenses = () => async (dispatch) => {
  const res = await csrfFetch("/api/users/expenses");
  const { expenses } = await res.json();

  if (res.ok) {
    const data = {};
    for (let key in expenses) {
      data[key] = expenses[key];
    }
    dispatch(getAllExpenses(data));
  }
  return res;
};

export const addExpenseThunk = (expense) => async (dispatch) => {
  const res = await csrfFetch("/api/expense/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(expense),
  });
  if (res.ok) {
    const newExpense = await res.json();
    dispatch(addExpense(newExpense));
  }
};

export const editExpenseThunk = (expense) => async (dispatch) => {
  const { id } = expense;
  const res = await csrfFetch(`/api/expense/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(expense),
  });
  if (res.ok) {
    let editedExpense = await res.json();
    dispatch(editExpense(editedExpense));
  }
  return res;
};

export const deleteExpenseThunk = (id) => async (dispatch) => {
  const res = await csrfFetch(`/api/expense/${id}`, {
    method: "DELETE",
  });
  if (res.ok) {
    dispatch(deleteExpense(id));
  }
};

const initialState = {};

const expensesReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case GET_EXPENSE:
      newState = { ...state, ...action.expenses };
      return newState;

    case ADD_EXPENSE:
      newState = { ...state, [action.expense.id]: action.expense };
      return newState;

    case EDIT_EXPENSE:
      newState = { ...state, [action.expense.id]: action.expense };
      return newState;

    case DELETE_EXPENSE:
      delete newState[action.expense.id];

    default:
      return state;
  }
};

export default expensesReducer;
