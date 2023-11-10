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
          <a className="py-3 pl-2 border-l-2 border-blue-600 bg-blue-100" href="/payments/subscriptions">Subscription Management</a>
        </div>
        <div className="flex grow-0 shrink flex-col pt-3 gap-8">
          { children }
        </div>

      </div>
    </div>

  </section>
}