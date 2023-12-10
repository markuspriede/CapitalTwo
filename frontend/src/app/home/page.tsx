'use client'

import { useEffect, useState } from "react";
import BudgetChart from "../components/BudgetChart";
import Card from "../components/Card";
import Transactions from "../components/Transactions";
import Link from "next/link";

const Home = () => {
  const [refresh, setRefresh] = useState(0);

  return (
    <div className="flex flex-col h-screen px-10 mb-16">
      <div className="flex justify-center gap-x-10 pt-8">
        <Card title="Statement Balance" line1="$100.50" line2="Dec 15 - Jan 14" buttonText="View Transactions" />
        <Card title="Payment Due on" line1="December 30" line2="Minimum Payment Due $20.00" buttonText="Make Payment" />
        <Card title="Total Balance" line1="$100.50" line2="Balance Details" buttonText="View Balance Details" />
      </div>

      <div className="pt-8 flex flex-col flex-1 mb-6 flex-grow">
        <h1 className="text-2xl font-semibold pb-4">Financial Summary</h1>
        <div className="flex flex-1 justify-center gap-x-3 text-left">
          <div className="bg-gray-200 rounded-md p-3 text-left text-xl flex-1 shadow-md">Activities</div>
          <div className="bg-gray-200 rounded-md p-3 text-left text-xl flex-shrink w-1/4 shadow-md">Categories</div>
          <Link className="bg-gray-200 rounded-md p-3 text-left text-xl flex-1 shadow-md" href={"/budgets"}>
            <p className="pb-2">Budget</p>
            <BudgetChart refresh={refresh} setRefresh={setRefresh} />
          </Link>
        </div>
      </div>

      <Transactions refresh={refresh} setRefresh={setRefresh} />
    </div>
  )
}

export default Home;