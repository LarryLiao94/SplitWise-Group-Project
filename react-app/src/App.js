import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import Groups from "./components/Groups";
// import Friends from "./components/Friends";
import LandingPage from "./components/LandingPage";
import Dashboard from "./components/Dashboard";
import ExpensesPage from "./components/Expenses";
import TransactionsPage from "./components/Transactions";
import { authenticate } from "./store/session";
import FriendDetails from "./components/FriendDetails";

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      {/* <NavBar /> */}
      <Switch>
        <Route path="/" exact={true}>
          <LandingPage />
        </Route>
        <Route path="/dashboard" exact={true}>
          <Dashboard />
        </Route>
        <Route path="/login" exact={true}>
          <LoginForm />
        </Route>
        <Route path="/sign-up" exact={true}>
          <SignUpForm />
        </Route>
        <Route path="/groups/new" exact={true}>
          <Groups />
        </Route>
        <Route path="/expenses" exact={true} component={ExpensesPage} />
        <Route path="/transactions" exact={true}>
          <TransactionsPage />
        </Route>
        {/* <Route path='friends' exact={true}>
          <
        </Route> */}
        <ProtectedRoute path="/users" exact={true}>
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId" exact={true}>
          <User />
        </ProtectedRoute>
        {/* <ProtectedRoute path="/friends" exact={true}>
          <Friends />
        </ProtectedRoute> */}
        <ProtectedRoute path="/friends/:id" exact={true}>
          <FriendDetails />
        </ProtectedRoute>
        {/* <Route path='/' exact={true} >
          <h1>My Home Page</h1>
        </Route> */}
      </Switch>
      {/* <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
      <LandingPage /> */}
    </BrowserRouter>
  );
}

export default App;
