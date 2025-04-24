import { LineChart, Line, ResponsiveContainer } from 'recharts';

const MiniChart = ({ data }) => {
  const chartData = data.map((value, index) => ({ value }));
  
  return (
    <ResponsiveContainer width="100%" height={40}>
      <LineChart data={chartData}>
        <Line 
          type="monotone" 
          dataKey="value" 
          stroke={data[0] < data[data.length - 1] ? '#16c784' : '#ea3943'} 
          dot={false}
          strokeWidth={1.5}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default MiniChart;