'use client'

import React from 'react';
import {FaListUl, FaPollH } from 'react-icons/fa';
import BudgetTable from './budgetstable';

const Budgets: React.FC = () => {

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-4">Budget</h1>
      <div className="flex items-center space-x-4 ml-6">
        <p className="text-gray-400">Current Duration:</p>
        <p className="text-gray-600">08/15/2023 - 09/14/2023</p>
        <div className="flex space-x-4 bg-blue-100 text-grey rounded-full px-8 py-2 border-solid border-2 border-blue-300">
          <button className="hover:text-blue-600">
            <FaListUl />
          </button>
          <button className="hover:text-blue-600">
            <FaPollH />
          </button>
        </div>
      </div>
      <BudgetTable/>
    </div>
  )
}


export default Budgets;

