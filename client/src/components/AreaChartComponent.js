import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const AreaChartComponent = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data} margin={{ top: 50, right: 50 }}>
        <XAxis dataKey="date" stroke="#627d98" />
        <YAxis />
        <Tooltip
          contentStyle={{
            border: "2px #60a5fa solid",
            borderRadius: "0.25rem",
          }}
          wrapperStyle={{
            width: 100,
          }}
        />
        <CartesianGrid stroke="#9fb3c8" strokeDasharray="5 5" />
        <Area type="monotone" dataKey="count" fill="#3b82f6" stroke="#1d4ed8" />
      </AreaChart>
    </ResponsiveContainer>
  );
};
export default AreaChartComponent;
