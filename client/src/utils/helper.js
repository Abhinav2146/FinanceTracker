export function addThousandsSeparator(num) {
  if (typeof num !== "number") num = Number(num);
  if (isNaN(num)) return "0";
  return num.toLocaleString("en-IN");
}

export const prepareExpenseBarChartData = (data = []) => {
  return data.map((item, index) => ({
    id: index,
    category: item?.category,
    amount: item?.amount,
  }));
};

export const prepareIncomeBarChartData = (data = []) => {
  return data.map((item, index) => ({
    id: index,
    category: item?.source,
    amount: item?.amount,
  }));
};

export const prepareExpenseLineChartData = (data = []) => {
  const sortedData = [...data].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  return sortedData.map((item, index) => ({
    id:index,
    amount: item?.amount,
    category: item?.category,
  }));
};
