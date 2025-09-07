import React from "react";
import { addThousandsSeparator } from "../../utils/helper";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import CustomTooltip from "./CustomTooltip";

const CustomBarChart = ({ data }) => {
  const getBarColor = (index) => {
    return index % 2 === 0 ? "#2563eb" : "#a8c1f7";
  };

  return (
    <div className="bg-white mt-6">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid stroke="none" />
          <XAxis
            dataKey="id"
            tick={{ fontSize: 12, fill: "#555" }}
            stroke="none"
          />
          <YAxis
            dataKey="amount"
            tick={{ fontSize: 12, fill: "#555" }}
            tickFormatter={(value) => value.toLocaleString()}
            stroke="none"
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar
            dataKey="amount"
            fill="#FF8042"
            radius={[10, 10, 0, 0]}
            activeDot={{ r: 8, fill: "yellow" }}
            activestyle={{ fill: "green" }}
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={getBarColor(index)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart;
