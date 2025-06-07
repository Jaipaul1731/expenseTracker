import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f7f"];

function PieCharts({ expenses }) {
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
      {/* <h2>Expense Summary</h2> */}
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
            label={({
              cx,
              cy,
              midAngle,
              innerRadius,
              outerRadius,
              percent,
              index,
            }) => {
              const RADIAN = Math.PI / 180;
              const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
              const x = cx + radius * Math.cos(-midAngle * RADIAN);
              const y = cy + radius * Math.sin(-midAngle * RADIAN);

              return percent > 0.05 ? (
                <text
                  x={x}
                  y={y}
                  fill="white"
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontSize={14}
                >
                  {(percent * 100).toFixed(0)}%
                </text>
              ) : null;
            }}
            labelLine={false} // disable lines pointing outside
          >
            {pieData.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>

          <Tooltip />
          {/* <Legend /> */}
        </PieChart>
      )}
    </div>
  );
}

export default PieCharts;
