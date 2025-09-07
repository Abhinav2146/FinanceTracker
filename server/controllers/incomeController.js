const Income = require("../models/Income");
const xlsx = require("xlsx");

exports.addIncome = async (req, res) => {
  try {
    const { icon, source, amount, date } = req.body;
    if (!source || !amount) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const { _id } = req.user;
    const newIncome = new Income({
      userId: _id,
      icon,
      source,
      amount,
      date,
    });
    await newIncome.save();
    res.status(200).json(newIncome);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

exports.getIncome = async (req, res) => {
  const userId = req.user.id;
  try {
    const income = await Income.find({ userId }).sort({ date: -1, _id:-1 });
    res.json(income);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

exports.deleteIncome = async (req, res) => {
  try {
    await Income.findByIdAndDelete(req.params.id);
    res.json({ message: "Income deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

exports.downloadIncome = async (req, res) => {
  const userId = req.user.id;
  try {
    const income = await Income.find({ userId }).sort({ date: -1 });

    const data = income.map((item) => ({
      Source: item.source,
      Amount: item.amount,
      Date: new Date(item.date).toLocaleDateString("en-IN"),
    }));

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, "Income");
    xlsx.writeFile(wb, "income_details.xlsx");
    res.download("income_details.xlsx");
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
