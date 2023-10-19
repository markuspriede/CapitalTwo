import { useState } from "react";
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

  const budgets = ["Household"];

  const [transactions, setTransactions] = useState<ITransaction[]>([
    {
      date: "08/15/23",
      name: "Target",
      amount: 52.17,
      ID: 12488,
      category: "Household",
      budget: "Shopping"
    },
    {
      date: "08/15/23",
      name: "Target",
      amount: 52.17,
      ID: 12488,
      category: "Household",
      budget: "Shopping"
    },
    {
      date: "08/15/23",
      name: "Target",
      amount: 52.17,
      ID: 12488,
      category: "Household",
      budget: "Shopping"
    },
    {
      date: "08/15/23",
      name: "Target",
      amount: 52.17,
      ID: 12488,
      category: "Household",
      budget: "Shopping"
    },
    {
      date: "08/15/23",
      name: "Target",
      amount: 52.17,
      ID: 12488,
      category: "Household",
      budget: "Shopping"
    },
    {
      date: "08/15/23",
      name: "Target",
      amount: 52.17,
      ID: 12488,
      category: "Household",
      budget: "Shopping"
    },
    {
      date: "08/15/23",
      name: "Target",
      amount: 52.17,
      ID: 12488,
      category: "Household",
      budget: "Shopping"
    },
  ])

  return <>
    <table className="table-fixed text-left shadow-md text-xs">
      <thead>
        <tr className="bg-blue-100">
          <th className="py-3">DATE</th>
          <th className="py-3">NAME</th>
          <th className="py-3">AMOUNT</th>
          <th className="py-3">ID</th>
          <th className="py-3">CATEGORY</th>
          <th className="py-3">BUDGET</th>
        </tr>
      </thead>
      <tbody>
        {
          transactions.map((transaction, key) => {
            return <tr key={key} className="border">
              { Object.entries(transaction).map(([key, value]) => {
                if (key === "budget") {
                  return <td className="py-2" key={key}>
                    <TableDropdown budgets={budgets} />
                  </td>
                }

                return <td className="py-2" key={key}>{ value }</td>
              }) }
            </tr>
          })
        }
      </tbody>
    </table>
  </>;
}

export default Transactions;