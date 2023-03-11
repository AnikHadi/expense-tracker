import React from "react";
import { useDispatch } from "react-redux";
import deleteBtn from "../../assets/images/delete.svg";
import editBtn from "../../assets/images/edit.svg";
import {
  editActive,
  removeTransaction,
} from "../../features/transaction/transactionSlice";
import numberWithCommas from "../../utils/numbersWithCommas";

const Transaction = ({ transaction }) => {
  const { id, name, amount, type } = transaction;
  const dispatch = useDispatch();

  const handleEdit = () => {
    dispatch(editActive(transaction));
  };
  return (
    <li className={`transaction ${type}`}>
      <p>{name}</p>
      <div className="right">
        <p>৳ {numberWithCommas(amount)}</p>
        <button onClick={handleEdit} className="link">
          <img className="icon" src={editBtn} alt="" />
        </button>
        <button
          onClick={() => dispatch(removeTransaction(id))}
          className="link"
        >
          <img className="icon" src={deleteBtn} alt="" />
        </button>
      </div>
    </li>
  );
};

export default Transaction;
