import React from "react";
import { PieChart, Pie, Cell, Tooltip, } from "recharts";

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
  payload,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {payload.value}
    </text>
  );
};

const CustomTooltip = ({ active, payload, label }) => {

  if (active && payload && payload.length) {
    return (
      <div className=" bg-slate-100 p-4 rounded-md flex items-center shadow-md">
        <p className="label">{`${payload[0].name} : ${payload[0].value}`}</p>
        <div
          className={`w-4 h-4 rounded-md`}
          style={{ backgroundColor: `${payload[0].payload.fill}` }}
        ></div>
      </div>
    );
  }

  return null;
};

export const Chart = ({ valuesOfChart, colors }) => {
  return (
    <PieChart width={300} height={300} className="self-center ">
      <Pie
        data={valuesOfChart}
        cx="50%"
        cy="50%"
        labelLine={false}
        label={renderCustomizedLabel}
        outerRadius={100}
        fill="#8884d8"
        dataKey="value"
      >
        {valuesOfChart.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
        ))}
      </Pie>
      <Tooltip content={<CustomTooltip />} />
    </PieChart>
  );
};
