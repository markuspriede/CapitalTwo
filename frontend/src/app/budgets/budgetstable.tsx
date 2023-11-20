'use client'

import React from 'react';
import { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaCheck, FaTimes } from 'react-icons/fa';

interface IBudgetItem {
  id: number;
  category: string,
  assigned: string,
  spent: string,
  available: string,
}

const BudgetTable: React.FC = () => {
  const [budgets, setBudgets] = useState<IBudgetItem[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);

const mapBudgetToTableCell = (budget: any) => {
  return {
    id: budget.id,
    category: budget.category_name || '', 
    assigned: `$${(budget.budget_amount || 0).toFixed(2)}`, 
    spent: `$${(budget.amount_spent || 0).toFixed(2)}`, 
    available: `$${((budget.budget_amount - budget.amount_spent) || 0).toFixed(2)}`, 
  };
};


  useEffect(() => {
    fetch(`http://localhost/budget`).then((res) => res.json()).then((data) => data.map(mapBudgetToTableCell)).then((budget) => {
      setBudgets(budget);
    }).catch((error) => console.error('Error fetching data:', error));;
  }, []);

  useEffect(() => {
    console.log(budgets);
  }, [budgets]);

  const handleEditChange = (id: number, field: string, value: string) => {
    setBudgets((prevBudgets) =>
      prevBudgets.map((budget) =>
        budget.id === id ? { ...budget, [field]: value } : budget
      )
    );
  };
  

  const editItem = (budgetId: number) => {
    setEditingId(budgetId)
  }

  const saveItem = (id: number) => {
    const editedBudget = budgets.find((budget) => budget.id === id);
  
    if (!editedBudget) {
      console.error('Budget not found');
      return;
    }

    const { category, assigned, spent, available } = editedBudget;
  
    fetch(`http://localhost/budget/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        start_date: "2023-11-12",
        category_name: category,
        budget_amount: parseFloat(assigned.replace('$', '')),
        amount_spent: parseFloat(spent.replace('$', '')),
      }),
    })
      .then((res) => res.json())
      .then((updatedBudget) => {
        console.log('API Response:', updatedBudget);
        setEditingId(null);
        
        setBudgets((prevBudgets) =>
          prevBudgets.map((budget) =>
            budget.id === id ? mapBudgetToTableCell(updatedBudget) : budget
          )
        );
      })
      .catch((error) => console.error('Error updating item:', error));
  };
  
  const deleteItem = (id: number) => {
    // console.log(`Deleted item with ID: ${id}`);

    fetch(`http://localhost/budget/${id}`, {
      method: 'DELETE' 
    })
      .then(() => {
        setBudgets((prevBudgets) => prevBudgets.filter((budget) => budget.id !== id));
      })
      .catch((error) => console.error('Error deleting item:', error));
  }

  const addItem = () => {
    const newBudgetItem = {
      start_date: "2023-11-12",
      category_name: "New Budget", 
      budget_amount: 0, 
      amount_spent: 0, 
    };

    fetch(`http://localhost/budget`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newBudgetItem),
    })
      .then((res) => res.json())
      .then((addedBudget) => {
        
        setBudgets((prevBudgets) => [...prevBudgets, mapBudgetToTableCell(addedBudget)]);
        setEditingId(addedBudget.id);
      })
      .catch((error) => console.error('Error adding item:', error));
  };


  return (
    <div className="p-6">
      <table className="w-full text-left shadow-md text-base font-sans border-collapse mt-3 rounded-md">
        <thead className="bg-blue-100">
          <tr>
            <th className="py-3 pl-3 w-1/6">Category</th>
            <th className="py-3 pl-3 w-1/6">Assigned</th>
            <th className="py-3 pl-3 w-1/6">Spent</th>
            <th className="py-3 pl-3 w-1/6">Available</th>
            {/* <th className="py-3 pl-3 w-1/6">Enable</th> */}
            <th className="py-3 pl-3 w-1/6">Actions</th>
          </tr>
        </thead>

        <tbody>
        {budgets.map((budget) => (
      <tr key={budget.id} className="border-t-2">
        <td className="pl-3 border-b">
          {editingId === budget.id ? (
            <input
              type="text"
              value={budget.category}
              onChange={(e) => handleEditChange(budget.id, 'category', e.target.value)}
              className="rounded p-1 border border-blue-500"
            />
          ) : (
            budget.category
          )}
        </td>
        <td className="pl-3 border-b">
          {editingId === budget.id ? (
            <input
              type="text"
              value={budget.assigned}
              onChange={(e) => handleEditChange(budget.id, 'assigned', e.target.value)}
              className="rounded p-1 border border-blue-500"
            />
          ) : (
            `${budget.assigned}`
          )}
        </td>
        <td className={`pl-3 border-b ${editingId === budget.id ? 'text-gray-500' : ''}`}>
          {budget.spent}
        </td>
        <td className={`pl-3 border-b ${editingId === budget.id ? 'text-gray-500' : ''}`}>
          {budget.available}
        </td>
        <td className="py-2 pl-3 flex items-center space-x-2">
          {editingId === budget.id ? (
            <>
              <span onClick={() => saveItem(budget.id)} style={{ cursor: 'pointer' }}>
                <FaCheck className="text-xl text-blue-500"/>
              </span>
              <span onClick={() => setEditingId(null)} style={{ cursor: 'pointer' }}>
                <FaTimes className="text-xl text-red-500"/>
              </span>
            </>
          ) : (
            <div className="flex space-x-2 cursor-pointer text-xl opacity-50">
              <FaEdit onClick={() => editItem(budget.id)} />
              <FaTrash onClick={() => deleteItem(budget.id)} />
            </div>
          )}
        </td>
      </tr>
            ))}

        </tbody>
      </table>
      <div className="flex justify-center">
        <button className="text-blue-700 bg-blue-100 rounded-full px-4 py-2 mt-4"
          onClick={addItem}>
          Add Budget
        </button>
      </div>
    </div>
  );
}


export default BudgetTable;

