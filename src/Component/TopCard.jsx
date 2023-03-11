import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactions } from "../features/transaction/transactionSlice";
import numberWithCommas from "../utils/numbersWithCommas";

const TopCard = () => {
  const dispatch = useDispatch();
  const { transactions } = useSelector((state) => state.transactions);
  const currentBalance = transactions.reduce((total, transaction) => {
    if (transaction.type === "income") {
      return total + transaction.amount;
    } else {
      return total - transaction.amount;
    }
  }, 0);

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  return (
    <div className="top_card">
      <p>Your Current Balance</p>
      <h3>
        <span>৳ </span>
        <span>{numberWithCommas(currentBalance)}</span>
      </h3>
    </div>
  );
};

export default TopCard;
