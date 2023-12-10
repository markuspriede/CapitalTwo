'use client'
import React, { useState } from 'react'
import Card from "../components/Card";
import Transactions from '../components/Transactions';

const Payments: React.FC = () => {
  const [refresh, setRefresh] = useState(0);

  return (
    <div className="flex flex-col gap-16">
      <div className="flex gap-16">
        <Card title="Statement Balance" line1="$100.50" line2="Dec 15 - Jan 14" buttonText="View Transactions" />
        <Card title="Payment Due on" line1="December 30" line2="Minimum Payment Due $20.00" buttonText="Make Payment" />
        <Card title="Total Balance" line1="$100.50" line2="Balance Details" buttonText="View Balance" />
      </div>
      <Transactions refresh={refresh} setRefresh={setRefresh} />
    </div>
  );
};

export default Payments;