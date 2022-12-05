import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import session from "./session";
import friendsReducer from "./friend";
import expensesReducer from "./expense";
import balanceReducer from "./balance";
import transactionReducer from "./transactions";
import commentsReducer from "./comment";

const rootReducer = combineReducers({
  session,
  friends: friendsReducer,
  expenses: expensesReducer,
  balances: balanceReducer,
  transactions: transactionReducer,
  comments: commentsReducer,
});

let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
