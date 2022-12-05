import { csrfFetch } from "./csrf";

const GET_TRANSACTION = 'transactions/GET_TRANSACTION';

const getTransactions = (transactions) => ({
  type: GET_TRANSACTION,
  transactions
})

export const getAllTransactions = () => async (dispatch) => {
  const res = await csrfFetch("/api/transactions/");
  const { transactions } = await res.json();

  if (res.ok) {
    const data = {};
    transactions.forEach((transaction) => (data[transaction.id] = transaction));
    dispatch(getTransactions(data))
  }
}

const initialState = {};
const transactionReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case GET_TRANSACTION:
      newState = { ...state, ...action.transactions };
      return newState;

    default:
      return state;
  }
};

export default transactionReducer;