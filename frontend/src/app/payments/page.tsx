'use client'
import React from 'react'
import Card from "../components/Card";
import Transactions from '../components/Transactions';

const Payments: React.FC = () => {
  return (
    <div className="flex flex-col gap-16">
      <div className="flex gap-16">
        <Card title="Statement Balance" line1="$100.50" line2="Aug 15 - Sep 14" buttonText="View Transactions" />
        <Card title="Payment Due on" line1="September 30" line2="Minimum Payment Due $20.00" buttonText="Make Payment" />
        <Card title="Payment Due on" line1="September 30" line2="Minimum Payment Due $20.00" buttonText="Make Payment" />
      </div>
      <Transactions />
    </div>
  );
};

export default Payments;