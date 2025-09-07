const Income = require("../models/Income");
const Expense = require("../models/Expense");
const { Types } = require("mongoose");

exports.getDashboardData = async (req, res) => {
  try {
    const userId = req.user.id;
    const userObjectid = new Types.ObjectId(String(userId));

    const totalIncome = await Income.aggregate([
      { $match: { userId: userObjectid } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const totalExpense = await Expense.aggregate([
      { $match: { userId: userObjectid } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const last30DaysIncomeTransactions = await Income.find({
      userId,
      date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
    }).sort({ date: -1, _id: -1 });

    const last30DaysExpenseTransactions = await Expense.find({
      userId,
      date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
    }).sort({ date: -1, _id: -1 });

    const incomeTxns = await Income.find({ userId }).sort({ date: -1 });
    const expenseTxns = await Expense.find({ userId }).sort({ date: -1 });

    const transactions = [
      ...incomeTxns.map((txn) => ({ ...txn.toObject(), type: "income" })),
      ...expenseTxns.map((txn) => ({ ...txn.toObject(), type: "expense" })),
    ].sort((a, b) => {
      const dateDiff = new Date(b.date) - new Date(a.date);
      if (dateDiff !== 0) return dateDiff;
      return b._id.toString().localeCompare(a._id.toString());
    });

    const totalIncomeValue = totalIncome[0]?.total || 0;
    const totalExpenseValue = totalExpense[0]?.total || 0;
    const totalBalance = totalIncomeValue - totalExpenseValue;

    res.status(200).json({
      totalIncome: totalIncomeValue,
      totalExpense: totalExpenseValue,
      totalBalance,
      last30DaysIncomeTransactions,
      last30DaysExpenseTransactions,
      transactions,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
