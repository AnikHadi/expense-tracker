import React from "react";
import { useSelector } from "react-redux";
import Transaction from "./Transaction";

const TransactionList = () => {
  const { transactions, isLoading, isError, error } = useSelector(
    (state) => state.transactions
  );

  // show
  let contain = null;
  if (isLoading) contain = <p>Loading...</p>;
  if (!isLoading && isError) contain = <p className="error">{error}</p>;
  if (!isLoading && !isError && transactions.length === 0) {
    contain = <p>No Transaction Found!</p>;
  }
  if (!isLoading && !isError && transactions.length > 0) {
    contain = transactions.map((t) => (
      <Transaction transaction={t} key={t.id} />
    ));
  }

  return (
    <>
      {isError && <p className="error">{error}</p>}
      <p className="second_heading">Your Transactions:</p>
      <div className="conatiner_of_list_of_transactions">
        <ul>{contain}</ul>
      </div>
    </>
  );
};

export default TransactionList;
