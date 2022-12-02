import "./Expense.css";
import { NavLink, Link, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getExpenses } from "../../store/expense";

function ExpensesPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getExpenses());
  }, [dispatch]);

  const expensesObj = useSelector((state) => state.expenses);
  console.log(expensesObj);
  const expenses = Object.values(expensesObj);
  console.log(expenses);
  return (
    <>
      <div className="expense-container">
        <h1>Hello From Expenses</h1>
        {expenses.map((expense) => (
          <div>{expense.description}</div>
        ))}
      </div>
    </>
  );
}

export default ExpensesPage;
