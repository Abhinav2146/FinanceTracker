import React from "react";
import moment from "moment";
import TransactionInfoCard from "../cards/TransactionInfoCard";

const IncomeTransactions = ({ transactions }) => {
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Incomes</h5>
      </div>
      <div className="mt-6">
        {transactions?.slice(0, 5)?.map((income) => (
          <TransactionInfoCard
            key={income._id}
            title={income.source}
            icon={income.icon}
            date={moment(income.date).format("Do MMM YYYY")}
            amount={income.amount}
            type="income"
            hideDeleteBtn
          />
        ))}
      </div>
    </div>
  );
};

export default IncomeTransactions;
