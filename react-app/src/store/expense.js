import { csrfFetch } from "./csrf";

const GET_EXPENSE = "expense/GET_EXPENSE";

const getAllExpenses = (expenses) => ({
  type: GET_EXPENSE,
  expenses,
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

const initialState = {};
const expensesReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case GET_EXPENSE:
      newState = { ...state, ...action.expenses };
      return newState;

    default:
      return state;
  }
};

export default expensesReducer;
