import { useState, useEffect } from "react";
import WalletBalance from "./components/wallet/walletBalance.component";
import AddExpenseForm from "./components/AddexpenseForm/addExpenseform.component";
import ExpenseList from "./components/expenseList/expenseList.component";
import Charts from "./components/charts/piechart.component";
import "./App.css";

function App() {
  const [balance, setBalance] = useState(() => {
    const saved = localStorage.getItem("balance");
    return saved ? parseInt(saved, 10) : 5000;
  });
  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem("expenses");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("balance", balance.toString());
  }, [balance]);

  // Save expenses
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);
  return (
    <div>
      <WalletBalance balance={balance} setBalance={setBalance} />
      <AddExpenseForm
        balance={balance}
        setBalance={setBalance}
        expenses={expenses}
        setExpenses={setExpenses}
      />
      <ExpenseList
        balance={balance}
        setBalance={setBalance}
        expenses={expenses}
        setExpenses={setExpenses}
      />
      <Charts expenses={expenses} />
    </div>
  );
}

export default App;
