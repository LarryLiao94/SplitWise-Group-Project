import { csrfFetch } from "./csrf";

const GET_EXPENSE = "expense/GET_EXPENSE";
const ADD_EXPENSE = "expense/ADD_EXPENSE";

const getAllExpenses = (expenses) => ({
  type: GET_EXPENSE,
  expenses,
});

const addExpense = (expense) => ({
  type: ADD_EXPENSE,
  expense,
});

export const getExpenses = () => async (dispatch) => {
  const res = await csrfFetch("/api/expense/");
  const { expenses } = await res.json();

  if (res.ok) {
    const data = {};
    expenses.forEach((expense) => (data[expense.id] = expense));
    dispatch(getAllExpenses(data));
  }
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

    default:
      return state;
  }
};

export default expensesReducer;
