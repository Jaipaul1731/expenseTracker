import React from "react";
import { useState } from "react";
import ExpenseItem from "./expensesItem.component";
import Modal from "react-modal";
import { useSnackbar } from "notistack";

function ExpenseList({ balance, setBalance, expenses, setExpenses }) {
  // handling edit state here
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedPrice, setEditedPrice] = useState("");
  const [editedCategory, setEditedCategory] = useState("");
  const [editedDate, setEditedDate] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  const handleEditClick = (expense) => {
    setEditingExpense(expense);
    setEditedTitle(expense.title);
    setEditedPrice(expense.price.toString());
    setEditedCategory(expense.category);
    setEditedDate(expense.date);
    setIsEditOpen(true);
  };
  const handleEditSubmit = (e) => {
    e.preventDefault();

    const updatedPrice = parseInt(editedPrice, 10);
    if (
      !editedTitle ||
      !editedCategory ||
      !editedDate ||
      isNaN(updatedPrice) ||
      updatedPrice <= 0
    ) {
      enqueueSnackbar("Please fill all fields correctly", {
        variant: "warning",
      });
      return;
    }

    // Adjust wallet balance:
    const priceDifference = updatedPrice - editingExpense.price;
    if (priceDifference > balance) {
      enqueueSnackbar("Not enough balance to update this expense", {
        variant: "warning",
      });
      return;
    }

    const updatedExpense = {
      ...editingExpense,
      title: editedTitle,
      price: updatedPrice,
      category: editedCategory,
      date: editedDate,
    };

    const updatedExpenses = expenses.map((exp) =>
      exp.id === editingExpense.id ? updatedExpense : exp
    );

    setExpenses(updatedExpenses);
    setBalance(balance - priceDifference);
    setIsEditOpen(false);
  };

  const handleDelete = (id) => {
    const updatedExpenses = expenses.filter((expense) => expense.id !== id);
    setExpenses(updatedExpenses);
  };
  return (
    <div>
      <h2>Transactions</h2>
      {expenses.length === 0 ? (
        <p>No transactions!</p>
      ) : (
        <ul>
          {expenses.map((expense) => (
            <ExpenseItem
              key={expense.id}
              expense={expense}
              onEdit={handleEditClick}
              onDelete={handleDelete}
            />
          ))}
        </ul>
      )}
      <Modal isOpen={isEditOpen} onRequestClose={() => setIsEditOpen(false)}>
        <h3>Edit Expense</h3>
        <form onSubmit={handleEditSubmit}>
          <input
            name="title"
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <input
            name="price"
            type="number"
            value={editedPrice}
            onChange={(e) => setEditedPrice(e.target.value)}
            step="1"
            min="1"
          />
          <select
            name="category"
            value={editedCategory}
            onChange={(e) => setEditedCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            <option value="Food">Entertainment</option>
            <option value="Travel">Food</option>
            <option value="Shopping">Travel</option>
            {/* <option value="Health">Health</option> */}
          </select>
          <input
            name="date"
            type="date"
            value={editedDate}
            onChange={(e) => setEditedDate(e.target.value)}
          />
          <button type="submit">Save Changes</button>
        </form>
        <button onClick={() => setIsEditOpen(false)}>Cancel</button>
      </Modal>
    </div>
  );
}

export default ExpenseList;
