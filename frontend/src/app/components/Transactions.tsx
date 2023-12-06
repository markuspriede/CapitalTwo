import { useEffect, useState } from "react";
import TableDropdown from "./TableDropdown";
import { ITransaction } from "../types/Types";
import SubscriptionModal from "./SubscriptionModal";

const Transactions = () => {

  const [budgets, setBudgets] = useState<any[]>([]);

  const [transactions, setTransactions] = useState<ITransaction[]>([]);

  const [showModal, setModal] = useState<boolean>(false);

  const [currentTransaction, setCurrentTransaction] = useState<ITransaction | null>(null);

  const [refersh, setRefresh] = useState(0);

  function mapTransactionToTableCell(transaction: any) {
    return {
      date: transaction.date,
      name: transaction.alias,
      amount: `${transaction.amount}`,
      id: transaction.id,
      subscription: transaction.isSubscription,
      budget: transaction.budget ? transaction.budget.category_name : "N/A"
    }
  }

  function openModal(transaction: ITransaction) {
    setCurrentTransaction(transaction);
    setModal(true);
  }

  function changeBudget(budget: any, transaction: ITransaction) {
    fetch(`http://3.84.112.106/transaction/${transaction.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "isSubscription": transaction.subscription,
        "budget_id": budget.category_name === "N/A" ? -1 : budgets[budgets.indexOf(budget)].id,
        "subscription_id": transaction.subscriptionId
      })
    }).then((res) => res.json()).then(() => {
      setRefresh((refresh) => refresh + 1);
    })
  }

  useEffect(() => {
    fetch(`http://3.84.112.106/transaction`).then((res) => res.json()).then((data) => data.map(mapTransactionToTableCell)).then((transactions) => {
      setTransactions(transactions);
    });
  }, [currentTransaction, refersh]);

  useEffect(() => {
    fetch(`http://3.84.112.106/budget`).then((res) => res.json()).then((budgets) => {
      const newBudgets: any[] = [];

      budgets.map((budget: any) => {
        newBudgets.push(budget);
      });

      setBudgets([{ category_name: "N/A" }, ...newBudgets]);
    });
  }, []);

  return <>
    <SubscriptionModal showModal={showModal} setModal={setModal} setTransaction={setCurrentTransaction} transaction={currentTransaction} />
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
                    <TableDropdown budgets={budgets} changeBudget={changeBudget} transaction={transaction} />
                  </td>
                }

                if (key === "subscription") {
                  return <td className="pl-3 pt-2 flex items-center" key={key}>
                    <input key={key} onClick={() => openModal(transaction)} type="checkbox" checked={value} onChange={() => {}} />
                    <p>Subscribe</p>
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