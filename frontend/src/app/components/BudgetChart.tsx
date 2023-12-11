import { useEffect, useState } from "react";

interface IBudgetChartProps {
  refresh: Number,
  setRefresh: any
}

const BudgetChart = (props: IBudgetChartProps) => {
  const [budgets, setBudgets] = useState<any[]>([]);

  useEffect(() => {
    fetch(`http://3.84.112.106/budget`).then((res) => res.json()).then((data) => {
      setBudgets(data);
    }).catch((error) => console.error('Error fetching data:', error));
  }, [props.refresh]);

  return <div className="w-full h-full bg-white"> 
    {
      budgets.map((budget, index) => {
        if (index > 2) {
          return <div key={index}></div>;
        }

        const over = budget.amount_spent > budget.budget_amount;
        const percentage = budget.amount_spent < budget.budget_amount ? (budget.amount_spent / budget.budget_amount) * 100 : 100;

        return <div className="w-full bg-grey-light my-2" key={index}>
        <div className="flex flex-nowrap justify-between mb-1 content-end">
          <h2 className="text-md text-slate-500 align-text-bottom flex-nowrap">{ budget.category_name }</h2>
          <div className={`${over ? "text-red-600" : "text-green-600"} text-end`}>
            <p className="text-xs">{ over ? "Over budget" : "Remaining" }</p>
            <p>${ over ? (budget.amount_spent - budget.budget_amount).toFixed(2) : (budget.budget_amount - budget.amount_spent).toFixed(2) }</p>
          </div>
        </div>
        <div className="w-full bg-gray-300 rounded-full h-2">
          <div className="bg-blue-700 h-2 rounded-full" style={{ width: `${percentage}%` }}></div>
        </div>
        <div className="flex justify-end mt-1">
          <p className="text-sm text-slate-500">{`${budget.amount_spent} / ${budget.budget_amount}`}</p>
        </div>
      </div>
      })
    }
  </div>
}

export default BudgetChart;