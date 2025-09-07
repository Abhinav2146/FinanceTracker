import React, { useState } from "react";
import EmojiPickerPopup from "../EmojiPickerPopup";

const AddIncomeForm = ({ onAddIncome }) => {
  const [income, setIncome] = useState({
    source: "",
    amount: "",
    date: "",
    icon: "",
  });

  const handleChange = (key, value) => setIncome({ ...income, [key]: value });

  return (
    <div className="flex flex-col">
      <EmojiPickerPopup
        icon={income.icon}
        onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
      />
      <label>Income Source</label>
      <input
        className="input"
        value={income.source}
        onChange={({ target }) => handleChange("source", target.value)}
        type="text"
      />
      <label>Amount</label>
      <input
        className="input"
        value={income.amount}
        onChange={({ target }) => handleChange("amount", target.value)}
        type="number"
      />
      <label>Date</label>
      <input
        className="input"
        value={income.date}
        onChange={({ target }) => handleChange("date", target.value)}
        type="date"
      />
      <div className="flex justify-end mt-6">
        <button
          type="button"
          className="add-btn add-btn-fill hover:bg-primary-dull"
          onClick={() => onAddIncome(income)}
        >
          Add Income
        </button>
      </div>
    </div>
  );
};

export default AddIncomeForm;
