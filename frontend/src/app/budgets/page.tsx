'use client'

import React from 'react';
import { useState } from "react";
import { FaEdit, FaTrash, FaListUl } from 'react-icons/fa';
import Switch from 'react-switch'

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
      assigned: "$650.00",
      amount: "$500.00",
      available: "$52.00",
      enable: true
    },
    {
      id: 2,
      category: "Dining",
      assigned: "$650.00",
      amount: "$500.00",
      available: "$52.00",
      enable: true
    },
    {
      id: 3,
      category: "Work",
      assigned: "$650.00",
      amount: "$500.00",
      available: "$52.00",
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

  //make the rows fixed till user presses edit icon
  const [editingId, setEditingId] = useState<number | null>(null);

  const editItem = (id: number) => {
    setEditingId(id);
  };

  const addBudget = () => {
    const newBudget: IBudgetItem = {
      id: Date.now(),
      category: "New Category",
      assigned: "$0.00",
      amount: "$0.00",
      available: "$0.00",
      enable: true
    };

    setBudgetItems(prevItems => [...prevItems, newBudget]);
    setEditingId(newBudget.id);
  };
  //make componenets editable
  const updateField = (id: number, field: keyof IBudgetItem, value: string | boolean) => {
    setBudgetItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };
  //format values upto 2 decimal places and prefix with dollar sign
  const formatCurrency = (value: string) => {
    const numValue = parseFloat(value.replace(/\$/g, '')); // Remove the dollar sign
    if (isNaN(numValue)) return '0.00'; // Set a default value if parsing fails
    return `$${numValue.toFixed(2)}`; // Format the number with two decimal places
  };

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-4">Budget/Project</h1>
      <div className="flex items-center space-x-4">
        <p className="text-gray-400">Current Duration:</p>
        <p className="text-gray-600">08/15/2023 - 09/14/2023</p>
        <button className="bg-blue-100 text-white rounded-full px-8 py-2 space-x-4">
          <span className="flex-1 bg-white w-1/2 h-full rounded-l-full"></span>
          <span className="flex-1 bg-white w-1/2 h-full rounded-r-full"></span> 
        </button>
      </div>

      <table className="w-full text-left shadow-md text-base font-sans border-collapse mt-3 rounded-md">
        <thead className="bg-blue-100">
          <tr>
            <th className="py-3 pl-3 w-1/6">Category</th>
            <th className="py-3 pl-3 w-1/6">Assigned</th>
            <th className="py-3 pl-3 w-1/6">Amount</th>
            <th className="py-3 pl-3 w-1/6">Available</th>
            <th className="py-3 pl-3 w-1/6">Enable</th>
            <th className="py-3 pl-3 w-1/6">Actions</th>
          </tr>
        </thead>
        <tbody>

          {budgetItems.map(item => (
            <tr key={item.id}
              className={`border-t-2 ${editingId === item.id ? 'bg-blue-300' : ''} text-base`}
            >
              <td className="py-2 pl-3 cursor-default">
                {editingId === item.id ? (
                  <input
                    type="text"
                    value={item.category}
                    onChange={(e) => updateField(item.id, 'category', e.target.value)}
                    placeholder="New Category"
                    className="rounded"
                  />
                ) : (
                  <span>{item.category}</span>
                )}
              </td>
              <td className="py-2 pl-3 cursor-default">
                {editingId === item.id ? (
                  <input
                    type="text"
                    value={item.assigned}
                    onBlur={(e) => updateField(item.id, 'assigned', formatCurrency(e.target.value))}
                    onChange={(e) => updateField(item.id, 'assigned', e.target.value)}
                    placeholder="$0.00"
                    className="rounded"
                  />
                ) : (
                  <span>{formatCurrency(item.assigned)}</span>
                )}
              </td>
              <td className="py-2 pl-3 cursor-default">
                {editingId === item.id ? (
                  <input
                    type="text"
                    value={item.amount}
                    onBlur={(e) => updateField(item.id, 'amount', formatCurrency(e.target.value))}
                    onChange={(e) => updateField(item.id, 'amount', e.target.value)}
                    placeholder="$0.00"
                    className="rounded"
                  />
                ) : (
                  <span>{formatCurrency(item.amount)}</span>
                )}
              </td>
              <td className="py-2 pl-3 cursor-default">
                {editingId === item.id ? (
                  <input
                    type="text"
                    value={item.available}
                    onBlur={(e) => updateField(item.id, 'available', formatCurrency(e.target.value))}
                    onChange={(e) => updateField(item.id, 'available', e.target.value)}
                    placeholder="$0.00"
                    className="rounded"
                  />
                ) : (
                  <span>{formatCurrency(item.available)}</span>
                )}
              </td>

              <td className="py-2 pl-3">
                <Switch
                  checked={item.enable}
                  onChange={() => toggleEnable(item.id)}
                  height={20}
                  width={40}
                />
              </td>
              <td className="py-2 pl-3 flex items-center space-x-2">
                <div className="flex space-x-2 cursor-pointer text-xl opacity-50">
                  <FaEdit
                    onClick={() => editItem(item.id)}
                  />
                  <FaTrash
                    onClick={() => deleteItem(item.id)}
                  />
                </div>
                {editingId === item.id &&
                  <>
                    <span onClick={() => setEditingId(null)} style={{cursor: 'pointer'}}>Save</span>
                    <span onClick={() => setEditingId(null)} style={{cursor: 'pointer'}}>Cancel</span>
                  </>
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center">
        <button className="text-blue-700 bg-blue-100 rounded-full px-4 py-2 mt-4" onClick={addBudget}>
          Add Budget
        </button>
      </div>
    </div>
  );
}


export default Budgets;

