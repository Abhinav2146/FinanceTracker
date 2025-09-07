import React from "react";
const COLORS = ["#2563EB", "#22C55E", "#EF4444"];
import CustomPieChart from "../charts/CustomPieChart";
import { addThousandsSeparator } from "../../utils/helper";

const FinanceOverview = ({ totalBalance, totalIncome, totalExpense }) => {
  const balanceData = [
    { name: "Total Balance", amount: totalBalance },
    { name: "Total Income", amount: totalIncome },
    { name: "Total Expense", amount: totalExpense },
  ];

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg mb-2">Financial Overview</h5>
      </div>

      <CustomPieChart
        data={balanceData}
        label="Total Balance"
        totalAmount={`₹${addThousandsSeparator(totalBalance)}`}
        colors={COLORS}
        showTextAnchor
      />
    </div>
  );
};

export default FinanceOverview;
