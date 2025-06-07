import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f7f"];

function Charts({ expenses }) {
  // Group expenses by category and sum
  const categoryMap = {};
  expenses.forEach((exp) => {
    if (!categoryMap[exp.category]) {
      categoryMap[exp.category] = 0;
    }
    categoryMap[exp.category] += exp.price;
  });

  const pieData = Object.entries(categoryMap).map(([category, value]) => ({
    name: category,
    value,
  }));

  return (
    <div>
      <h2>Expense Summary</h2>
      {pieData.length === 0 ? (
        <p>No expenses to show.</p>
      ) : (
        <PieChart width={500} height={500}>
          <Pie
            data={pieData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={120}
            labelLine={true}
            label={({ name, percent }) =>
              percent > 0.05 ? `${name}: ${(percent * 100).toFixed(0)}%` : ""
            }
          >
            {pieData.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      )}
      <h2>Expense Trends</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          layout="vertical"
          data={pieData}
          margin={{ top: 20, right: 30, left: 100, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis type="category" dataKey="name" />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Charts;
