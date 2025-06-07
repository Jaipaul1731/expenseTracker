const ExpenseItem = ({ expense, onDelete, onEdit }) => {
  return (
    <li key={expense.id}>
      <strong>{expense.title}</strong> — ₹{expense.price}
      <br />
      {expense.category} | {expense.date}
      <button onClick={() => onEdit(expense)}>Edit</button>
      <button onClick={() => onDelete(expense.id)}>Delete</button>
    </li>
  );
};
export default ExpenseItem;
