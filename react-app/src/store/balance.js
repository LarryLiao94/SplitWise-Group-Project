import { csrfFetch } from "./csrf";

const GET_BALANCE = "balance/GET_BALANCE";

const getBalance = (balance) => ({
  type: GET_BALANCE,
  balance,
});

export const getBalanceThunk = () => async (dispatch) => {
  const res = await csrfFetch(`/api/users/balance`);

  const { balance, owe, owed } = await res.json();

  if (res.ok) {
    const data = {};
    data["owe"] = owe;
    data["owed"] = owed;
    data["balance"] = balance;
    dispatch(getBalance(data));
  }
  return res;
};

const initialState = {};

const balanceReducer = (state = initialState, action) => {
  let newState = { ...state };

  switch (action.type) {
    case GET_BALANCE:
      return { ...state, ...action.balance };
    default:
      return newState;
  }
};

export default balanceReducer;
