import Modal from "react-modal";
import { useState } from "react";
import { useSnackbar } from "notistack";
import "./expensesform.style.css";

const AddExpenseForm = ({ balance, setBalance, expenses, setExpenses }) => {
  const [isExpenseOpen, setIsExpenseOpen] = useState(false);
  const [expenseTitle, setExpenseTitle] = useState("");
  const [expenseCategory, setExpenseCategory] = useState("");
  const [expensePrice, setExpensePrice] = useState("");
  const [expenseDate, setExpenseDate] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  const handleAddExpense = (e) => {
    e.preventDefault();
    const price = parseInt(expensePrice, 10);

    if (
      !expenseTitle ||
      !expenseCategory ||
      !expenseDate ||
      isNaN(price) ||
      price <= 0 ||
      expensePrice.includes(".")
    ) {
      enqueueSnackbar(
        "Please fill out all fields correctly (no decimals or negatives).",
        { variant: "warning" }
      );
      return;
    }

    if (price > balance) {
      enqueueSnackbar("Not enough balance to add this expense.", {
        variant: "warning",
      });
      return;
    }

    const newBalance = balance - price;
    setBalance(newBalance);

    // 2. Add expense to list
    const newExpense = {
      id: Date.now(),
      title: expenseTitle,
      price: price,
      category: expenseCategory,
      date: expenseDate,
    };

    const updatedExpenses = [...expenses, newExpense];
    setExpenses(updatedExpenses);
    // localStorage.setItem("expenses", JSON.stringify(updatedExpenses));

    // Clear the form
    setExpenseTitle("");
    setExpensePrice("");
    setExpenseCategory("");
    setExpenseDate("");
    setIsExpenseOpen(false);

    enqueueSnackbar("Expense added!.", { variant: "success" });
  };
  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.price, 0);
  return (
    <div className="expenses_form">
      <h2 className="heading">
        Expenses: <span className="expenses">₹ {totalExpenses}</span>
      </h2>
      <button
        className="add_expense_button"
        type="button"
        onClick={() => setIsExpenseOpen(true)}
      >
        + Add Expense
      </button>
      <Modal
        isOpen={isExpenseOpen}
        onRequestClose={() => setIsExpenseOpen(false)}
      >
        <form onSubmit={handleAddExpense}>
          <input
            name="title"
            type="text"
            placeholder="Title"
            value={expenseTitle}
            required
            onChange={(e) => setExpenseTitle(e.target.value)}
          />
          <input
            name="price"
            type="number"
            placeholder="Expense Amount"
            value={expensePrice}
            min="1"
            step="1"
            required
            onChange={(e) => setExpensePrice(e.target.value)}
          />
          <select
            name="category"
            value={expenseCategory}
            onChange={(e) => setExpenseCategory(e.target.value)}
            required
          >
            <option value="">Select Category</option>
            <option value="Food">Food</option>
            <option value="Travel">Travel</option>
            <option value="Shopping">Shopping</option>
            <option value="Health">Health</option>
          </select>
          <input
            name="date"
            type="date"
            value={expenseDate}
            required
            onChange={(e) => setExpenseDate(e.target.value)}
          />
          <button type="submit">Add Expense</button>
        </form>
        <button onClick={() => setIsExpenseOpen(false)}>Cancel</button>
      </Modal>
    </div>
  );
};

export default AddExpenseForm;
