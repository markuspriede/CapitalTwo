'use client'

import React, { useState } from 'react';
import { FaListUl, FaPollH } from 'react-icons/fa';
import BudgetTable from './budgetstable';
import BudgetChart from '../components/BudgetChart';

const Budgets: React.FC = () => {
  const [displayTable, setDisplayTable] = useState(true);
  const [refresh, setRefresh] = useState(0)

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
      {displayTable ? <BudgetTable /> : <BudgetChart refresh={refresh} setRefresh={setRefresh} />}
    </div>
  );
};

export default Budgets;
