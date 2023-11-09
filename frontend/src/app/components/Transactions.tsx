import { useEffect, useState } from "react";
import TableDropdown from "./TableDropdown";

interface ITransaction {
  date: string,
  name: string,
  amount: number,
  ID: number,
  category: string,
  budget: string
}

const Transactions = () => {

  const [budgets, setBudgets] = useState<string[]>([]);

  const [transactions, setTransactions] = useState<ITransaction[]>([]);

  function mapTransactionToTableCell(transaction: any) {
    return {
      date: transaction.date,
      name: transaction.alias,
      amount: `$${transaction.budget.amount_spent}`,
      id: transaction.id,
      subscription: transaction.isSubscription ? "Yes" : "N/A",
      budget: transaction.budget.category_name
    }
  }

  useEffect(() => {
    fetch(`http://localhost/transaction`).then((res) => res.json()).then((data) => data.map(mapTransactionToTableCell)).then((transactions) => {
      setTransactions(transactions);
    });
  }, []);

  useEffect(() => {
    fetch(`http://localhost/budget`).then((res) => res.json()).then((budgets) => {
      const newBudgets: string[] = [];

      budgets.map((budget: any) => {
        newBudgets.push(budget.category_name);
      });

      setBudgets(newBudgets);
    });
  }, []);

  useEffect(() => {
    console.log(transactions);
  }, [transactions]);

  return <>
    <table className="table-fixed text-left shadow-md text-xs font-sans border-collapse">
      <thead>
        <tr className="bg-blue-100">
          <th className="py-3 pl-3">DATE</th>
          <th className="py-3 pl-3">NAME</th>
          <th className="py-3 pl-3">AMOUNT</th>
          <th className="py-3 pl-3">ID</th>
          <th className="py-3 pl-3">SUBSCRIPTION</th>
          <th className="py-3 pl-3 border">BUDGET</th>
        </tr>
      </thead>
      <tbody>
        {
          transactions.map((transaction, key) => {
            return <tr key={key} className="border-t-2">
              { Object.entries(transaction).map(([key, value]) => {
                if (key === "budget") {
                  return <td className="pl-3" key={key}>
                    <TableDropdown budgets={budgets} />
                  </td>
                }

                return <td className="pl-3 border-b" key={key}>{ value }</td>
              }) }
            </tr>
          })
        }
      </tbody>
    </table>
  </>;
}

export default Transactions;