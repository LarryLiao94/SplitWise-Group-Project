import "./Transactions.css";
import { NavLink, Link, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllTransactions } from "../../store/transactions";

function TransactionsPage() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getAllTransactions());
  }, [dispatch]);

  const transactionObj = useSelector((state) => state.transactions);
  const transactions = Object.values(transactionObj);
  return (
    <>
      <div className="transactions-container">
        <h1>Hello From Transactions</h1>
        {transactions.map((transaction) => (
          <div>{transaction.description}</div>
        ))}
      </div>
    </>
  );
}

export default TransactionsPage;
