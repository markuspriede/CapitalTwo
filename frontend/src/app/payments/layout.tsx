import React from "react";
import Card from "../components/Card";

export default function PaymentsLayout({ children }: { children: React.ReactNode }) {
  return <section>
    <div className="flex flex-col h-screen px-10 gap-16">
      <div className="flex w-full gap-5">
        
        <div className="grow flex flex-col pt-3 text-sm text-gray-500 mr-12">
          <a className="py-3 pl-2 border-l-2 border-blue-600 bg-blue-100" href="/payments">Recent Transactions</a>
          <a className="py-3 pl-2">Previous Billing</a>
          <a className="py-3 pl-2">Financial Summary</a>
          <a className="py-3 pl-2">Custom Date Range</a>
          <a className="py-3 pl-2" href="/payments/subscriptions">Subscription Management</a>
        </div>

        <div className="flex grow-0 shrink flex-col pt-3 gap-8">
          <div className="flex gap-16">
            <Card title="Statement Balance" line1="$100.50" line2="Aug 15 - Sep 14" buttonText="View Transactions" />
            <Card title="Payment Due on" line1="September 30" line2="Minimum Payment Due $20.00" buttonText="Make Payment" />
            <Card title="Payment Due on" line1="September 30" line2="Minimum Payment Due $20.00" buttonText="Make Payment" />
          </div>

          { children }
        </div>

      </div>
    </div>

  </section>
}