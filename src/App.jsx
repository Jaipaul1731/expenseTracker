import { useState, useEffect } from "react";
import WalletBalance from "./components/wallet/walletBalance.component";
import AddExpenseForm from "./components/AddexpenseForm/addExpenseform.component";
import ExpenseList from "./components/expenseList/expenseList.component";
import PieCharts from "./components/charts/piechart.component";

import "./App.css";
import BarChartMain from "./components/charts/barChart.component";

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
    <div className="app-container">
      <header>
        <h1>Expense Tracker</h1>
      </header>
      <div className="inner-container">
        <WalletBalance balance={balance} setBalance={setBalance} />
        <AddExpenseForm
          balance={balance}
          setBalance={setBalance}
          expenses={expenses}
          setExpenses={setExpenses}
        />
        <PieCharts expenses={expenses} />
      </div>

      <ExpenseList
        balance={balance}
        setBalance={setBalance}
        expenses={expenses}
        setExpenses={setExpenses}
      />

      <BarChartMain expenses={expenses} />
    </div>
  );
}

export default App;
