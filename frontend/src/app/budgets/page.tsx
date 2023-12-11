'use client'

import React, { useState, useEffect } from 'react';
import { FaListUl, FaPollH } from 'react-icons/fa';
import BudgetTable from './budgetstable';
import BudgetChart from '../components/BudgetChart';
import useCategoryData from '../components/CategoryChart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as BarTooltip, Legend, Cell, PieChart, Pie, Tooltip as PieTooltip } from 'recharts';
import { TooltipProps } from 'recharts';

const Budgets: React.FC = () => {
  const [displayTable, setDisplayTable] = useState(true);
  const [refresh, setRefresh] = useState(0)
  const [pieData, setPieData] = useState([]);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const PieCustomTooltip: React.FC<TooltipProps<number, string>> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip" style={{ backgroundColor: '#fff', padding: '5px', border: '1px solid #ddd', borderRadius: '5px', textAlign: 'center' }}>
        <p className="label">{`${payload[0].name} : ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

useEffect(() => {
  fetch(`http://3.84.112.106/budget`)
    .then((res) => res.json())
    .then((data) => {
      const processedData = data.map((category: any) => ({
        name: category.category_name,
        value: category.amount_spent, 
      }));
      setPieData(processedData);
    })
    .catch((error) => console.error('Error fetching category data:', error));
}, [refresh]);

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-4 ml-6">Budgets</h1>
      <div className="flex items-center space-x-4 ml-6">
        <p className="text-gray-400">Current Duration:</p>
        <p className="text-gray-600">12/01/2023 - 12/31/2023</p>
        <div className="flex space-x-4 bg-blue-100 text-gray-500 rounded-full px-8 py-2 border-solid border-2 border-blue-300">
          <button
            className={`hover:text-blue-400 ${displayTable ? 'text-blue-600' : ''}`}
            onClick={() => setDisplayTable(true)}
          >
            <FaListUl />
          </button>
          <button
            className={`hover:text-blue-400 ${!displayTable ? 'text-blue-600' : ''}`}
            onClick={() => setDisplayTable(false)}
          >
            <FaPollH />
          </button>
        </div>
      </div>
      {displayTable ? <BudgetTable /> 
      : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10%' }}>
          <div>
          <BudgetChart refresh={refresh} setRefresh={setRefresh} />
          </div>
          {/* Categories card with pie chart */}
          <div>
          <div className="card flex-auto bg-white" style={{ maxWidth: '450px' }}>
            <PieChart width={400} height={300}>
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
      )}

    </div>
  );
};

export default Budgets;
