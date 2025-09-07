import React, { useState } from "react";
import EmojiPickerPopup from "../EmojiPickerPopup";

const AddExpenseForm = ({ onAddExpense }) => {
  const [expense, setExpense] = useState({
    category: "",
    amount: "",
    date: "",
    icon: "",
  });

  const handleChange = (key, value) => setExpense({ ...expense, [key]: value });

  return (
    <div className="flex flex-col">
      <EmojiPickerPopup
        icon={expense.icon}
        onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
      />
      <label>Expense Category</label>
      <input
        className="input"
        value={expense.category}
        onChange={({ target }) => handleChange("category", target.value)}
        type="text"
      />
      <label>Amount</label>
      <input
        className="input"
        value={expense.amount}
        onChange={({ target }) => handleChange("amount", target.value)}
        type="number"
      />
      <label>Date</label>
      <input
        className="input"
        value={expense.date}
        onChange={({ target }) => handleChange("date", target.value)}
        type="date"
      />
      <div className="flex justify-end mt-6">
        <button
          type="button"
          className="add-btn add-btn-fill hover:bg-primary-dull"
          onClick={() => onAddExpense(expense)}
        >
          Add Expense
        </button>
      </div>
    </div>
  );
};

export default AddExpenseForm;
