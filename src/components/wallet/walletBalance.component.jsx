import Modal from "react-modal";
import { useState } from "react";
import { useSnackbar } from "notistack";
import "./walletBalance.style.css";

Modal.setAppElement("#root");

const WalletBalance = ({ balance, setBalance }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [income, setIncome] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  const handelIncome = (e) => {
    e.preventDefault();
    const amount = parseInt(income, 10);
    if (!amount && amount <= 0) {
      enqueueSnackbar("Please enter the valid income amount.", {
        variant: "warning",
      });
      return;
    }
    const newBalance = balance + amount;
    setBalance(newBalance);
    setIncome("");
    setIsOpen(false);
  };

  return (
    <div className="wallet_balance">
      <h2 className="heading">
        Wallet Ballance: <span className="balance">₹ {balance}</span>
      </h2>
      <button
        type="button"
        className="wallet_button"
        onClick={() => setIsOpen(true)}
      >
        + AddIncome
      </button>
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
