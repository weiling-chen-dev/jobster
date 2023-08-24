import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
const BarChartComponent = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 50, right: 50 }}>
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
        <Bar dataKey="count" fill="#3b82f6" barSize={70} />
      </BarChart>
    </ResponsiveContainer>
  );
};
export default BarChartComponent;
