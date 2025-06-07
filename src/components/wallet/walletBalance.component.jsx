import Modal from "react-modal";
import { useState } from "react";
import { useSnackbar } from "notistack";

Modal.setAppElement("#root");

const WalletBalance = ({ balance, setBalance }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [income, setIncome] = useState("");

  const handelIncome = (e) => {
    e.preventDefault();
    const amount = parseInt(income, 10);
    if (!amount && amount <= 0) {
      alert("Please enter the valid income amount");
      return;
    }
    const newBalance = balance + amount;
    setBalance(newBalance);
    setIncome("");
    setIsOpen(false);
  };

  return (
    <div>
      <h1>Expense Tracker</h1>
      <h2>Wallet Ballance: {balance}</h2>
      <button onClick={() => setIsOpen(true)}>+ AddIncome</button>
      <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)}>
        <h3>Add income</h3>
        <form onSubmit={handelIncome}>
          <input
            step="1"
            min="1"
            type="number"
            placeholder="Income Amount"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
          />
          <button type="submit">Add Balance</button>
        </form>
        <button onClick={() => setIsOpen(false)}>close</button>
      </Modal>
    </div>
  );
};
export default WalletBalance;
