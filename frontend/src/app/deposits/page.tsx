'use client'
import React from 'react'
import Card from "../components/Card";
import Transactions from '../components/Transactions';

const Deposits: React.FC = () => { 
  return (
    <div className="flex flex-col h-screen px-10 gap-16">
      <div className="flex justify-center gap-x-10 pt-8">
        <Card title="Statement Balance" line1="$100.50" line2="Aug 15 - Sep 14" buttonText="View Transactions" />
        <Card title="Payment Due on" line1="September 30" line2="Minimum Payment Due $20.00" buttonText="Make Payment" />
        <Card title="Total Balance" line1="$100.50" line2="Balance Details" buttonText="View Balance Details" />
      </div>

      <div className="flex gap-16">
        <div className="w-1/6 flex flex-col pt-3 text-sm text-gray-500">
          <p className="py-3 pl-2 border-l-2 border-blue-600 bg-blue-100">Recent Transactions</p>
          <p className="py-3 pl-2">Previous Billing</p>
          <p className="py-3 pl-2">Financial Summary</p>
          <p className="py-3 pl-2">Custom Date Range</p>
          <p className="py-3 pl-2">Subscription Management</p>
        </div>

        <Transactions />
      </div>
    </div>
  )
}

export default Deposits