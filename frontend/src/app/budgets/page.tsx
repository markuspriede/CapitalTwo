'use client'

import React from 'react';
import {useState} from "react";

interface IBudgetItem {
  id: number;
  category: string,
  assigned: string,
  amount: string,
  available: string,
  enable: boolean  
}

const Budgets: React.FC = () => {
    const [budgetItems, setBudgetItems] = useState<IBudgetItem[]>([
      {
        id: 1,
        category: "Household",
        assigned: "$650",
        amount: "$500",
        available: "$52",
        enable: true
      },
      {
        id: 2,
        category: "Dining",
        assigned: "$650",
        amount: "$500",
        available: "$52",
        enable: true
      },
      {
        id: 3,
        category: "Work",
        assigned: "$650",
        amount: "$500",
        available: "$52",
        enable: true
      },
      
    ]);

    const toggleEnable = (id: number) => {
        setBudgetItems(prevItems =>
          prevItems.map(item =>
            item.id === id ? { ...item, enable: !item.enable } : item
          )
        );
      };
    
      const deleteItem = (id: number) => {
        setBudgetItems(prevItems => prevItems.filter(item => item.id !== id));
      };

 
  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-4">Budget/Project</h1>
      <div className="flex items-center space-x-4">
        <p className="text-gray-400">Current Duration:</p>
        <p className="text-gray-600">08/15/2023 - 09/14/2023</p>
        <button className="bg-blue-500 text-white rounded-full px-8 py-2 space-x-4">
          <span className="flex-1 bg-white w-1/2 h-full rounded-l-full"></span>
          <span className="flex-1 bg-white w-1/2 h-full rounded-r-full"></span>
        </button>
      </div>

     <table className="table-fixed text-left shadow-md text-xs mt-6">
        <thead className="bg-blue-300">
          <tr>
            <th>Category</th>
            <th>Assigned</th>
            <th>Amount</th>
            <th>Available</th>
            <th>Enable</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {budgetItems.map(item => (
            <tr key={item.id}>
              <td>{item.category}</td>
              <td>{item.assigned}</td>
              <td>{item.amount}</td>
              <td>{item.available}</td>
              <td>
                <input type="checkbox" checked={item.enable} onChange={() => toggleEnable(item.id)} />
              </td>
              <td>
                <button onClick={() => deleteItem(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


export default Budgets;

  