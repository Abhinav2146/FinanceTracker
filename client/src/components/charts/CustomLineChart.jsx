import React from "react";
import CustomTooltip from "./CustomTooltip";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Area,
  AreaChart,
} from "recharts";

const CustomLineChart = ({ data }) => {
  return (
    <div className="bg-white">
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2563eb" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid stroke="none" />
          <XAxis
            dataKey="id"
            tick={{ fontSize: 12, fill: "#555" }}
            stroke="none"
          />
          <YAxis
            tick={{ fontSize: 12, fill: "#555" }}
            stroke="none"
            tickFormatter={(value) => value.toLocaleString()}
          />
          <Tooltip content={<CustomTooltip />} />

          <Area
            type="monotone"
            dataKey="amount"
            stroke="#2563eb"
            fill="url(#expenseGradient)"
            strokeWidth={3}
            dot={{ r: 3, fill: "#ab8df8" }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomLineChart;
