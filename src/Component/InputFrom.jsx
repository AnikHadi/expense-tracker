import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createTransaction,
  editInactive,
  editTransaction,
} from "../features/transaction/transactionSlice";

const InputFrom = () => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [amount, setAmount] = useState("");
  const [editMode, setEditMode] = useState(false);

  const dispatch = useDispatch();
  const { editing, isLoading, isError } = useSelector(
    (state) => state.transactions
  );

  // listen for edit mode active
  useEffect(() => {
    const { id, name, amount, type } = editing || {};
    if (id) {
      setEditMode(true);
      setName(name);
      setAmount(amount);
      setType(type);
    } else {
      setEditMode(false);
      reset();
    }
  }, [editing]);

  const reset = () => {
    setName("");
    setAmount("");
    setType("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createTransaction({
        name,
        type,
        amount: Number(amount),
      })
    );
    reset();
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(
      editTransaction({
        id: editing.id,
        data: {
          name,
          type,
          amount: Number(amount),
        },
      })
    );
    reset();
    setEditMode(false);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    reset();
    dispatch(editInactive());
  };

  return (
    <div className="form">
      <h3>Add new transaction</h3>

      <form onSubmit={editMode ? handleUpdate : handleSubmit}>
        <div className="form-group">
          <label htmlFor="transaction_name">Name</label>
          <input
            type="text"
            name="transaction_name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Purpose"
            required
          />
        </div>

        <div className="form-group radio">
          <label htmlFor="transaction_type">Type</label>
          <div className="radio_group">
            <input
              type="radio"
              value="income"
              name="type"
              checked={type === "income"}
              onChange={(e) => setType("income")}
              required
            />
            {/* checked */}
            <label htmlFor="transaction_type">Income</label>
          </div>
          <div className="radio_group">
            <input
              type="radio"
              value="expense"
              name="type"
              checked={type === "expense"}
              onChange={(e) => setType("expense")}
              placeholder="Expense"
            />
            <label htmlFor="transaction_type">Expense</label>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="transaction_amount">Amount</label>
          <input
            type="number"
            placeholder="Enter you Amount"
            name="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>

        <button disabled={isLoading} type="submit" className="btn">
          {editMode ? "Update Transaction" : "Add Transaction"}
        </button>

        {!isLoading && isError && (
          <p className="error">There was an error occured</p>
        )}
      </form>
      {editMode && (
        <button onClick={handleCancelEdit} className="btn cancel_edit">
          Cancel Edit
        </button>
      )}
    </div>
  );
};

export default InputFrom;
