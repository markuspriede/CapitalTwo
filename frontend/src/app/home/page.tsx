'use client'


import Card from "../components/Card";
import Transactions from "../components/Transactions";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as BarTooltip, Legend, Cell, PieChart, Pie, Tooltip as PieTooltip } from 'recharts';
import { TooltipProps} from "recharts";
// Custom Tooltip for BarChart
const BarCustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip" style={{ backgroundColor: '#fff', padding: '5px', border: '1px solid #999', borderRadius: '5px' }}>
        <label>{`${label}: $${payload[0].value}`}</label>
      </div>
    );
  }
  return null;
};

// Custom Tooltip for PieChart
const PieCustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip" style={{ backgroundColor: '#fff', padding: '5px', border: '1px solid #ddd', borderRadius: '5px', textAlign: 'center' }}>
        <p className="label">{`${payload[0].name} : ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};
// Custom data for BarChart
const barData = [
  { month: 'Aug', total: 120 },
  { month: 'Sep', total: 210 },
  { month: 'Oct', total: 180 },
  { month: 'Nov', total: 260 },
  { month: 'Dec', total: 300 },
];

// Custom data for PieChart
const pieData = [
  { name: 'Entertainment', value: 400 },
  { name: 'Grocery', value: 300 },
  { name: 'Investment', value: 300 },
  { name: 'Misc', value: 200 },
];

// Colors for each slice of the pie chart
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Home = () => {

  return (
    <div className="flex flex-col h-screen px-10 mb-16">
      <div className="flex justify-center gap-x-10 pt-8">
        <Card title="Statement Balance" line1="$100.50" line2="Dec 15 - Jan 14" buttonText="View Transactions" />
        <Card title="Payment Due on" line1="December 30" line2="Minimum Payment Due $20.00" buttonText="Make Payment" />
        <Card title="Total Balance" line1="$100.50" line2="Balance Details" buttonText="View Balance Details" />
      </div>

      <div className="pt-8 flex-grow">
        <h1 className="text-2xl font-semibold pb-4">Financial Summary</h1>
        <div className="flex justify-around items-center">
          {/* Activities card with bar chart */}
          <div className="card flex-auto bg-white p-4 rounded-lg shadow" style={{ maxWidth: '600px' }}>
            <h2>Activities</h2>
            <BarChart width={500} height={300} data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <BarTooltip content={<BarCustomTooltip />} />
              <Legend />
              <Bar dataKey="total" fill="#8884d8" barSize={20}>
                {barData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={`url(#color${index})`} />
                ))}
              </Bar>
              <defs>
                {barData.map((entry, index) => (
                  <linearGradient key={`gradient-${index}`} id={`color${index}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0.2}/>
                  </linearGradient>
                ))}
              </defs>
            </BarChart>
          </div>

          {/* Categories card with pie chart */}
          <div className="card flex-auto bg-white p-4 rounded-lg shadow" style={{ maxWidth: '600px' }}>
            <h2>Categories</h2>
            <PieChart width={500} height={300}>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <PieTooltip content={<PieCustomTooltip />} />
            </PieChart>
          </div>
        </div>
      </div>

      <Transactions  />
    </div>
  )
}

export default Home;

