'use client'

import React from 'react';
import SubscriptionCard from './SubscriptionCard';
import AllSubscriptions from './AllSubscriptions';
import SubTotalCard from './SubTotalCard';
import { useState, useEffect } from 'react';


const SubscriptionsPage: React.FC = () => {
  const [subscriptionTotal, setSubscriptionTotal] = useState(0)

  useEffect(() => {
    fetch("http://3.84.112.106/subscription")
  .then(res => {
    console.log(res.status);
    return res.json()
  })
  .then(data => {
    // console.log(data)
    const prices = data.map((sub: { price: number; }) => sub.price);
    const total = prices.reduce((acc: number, price: number) => acc + price, 0)
    setSubscriptionTotal(total)
  })
}, [])


  return (
    <div className="p-6">
    <div className="mt-4">
      <div className="flex flex-wrap justify-start gap-20 mt-4 mb-4">
        <SubTotalCard title={'Subscription Total'} priceDisplay={subscriptionTotal} subtitle={'Calculated Today'}/>
      </div>
      <div className="flex justify-start mb-4 ml-96">
        <button className="bg-blue-200 text-blue-900 font-bold px-4 py-2 rounded-md w-96">
        View Calendar
        </button>
      </div>
      </div>

      <div className="border-t border-gray-300 mt-10"></div>
      <h2 className="text-2xl font-bold mt-10">Subscription Management</h2>

      <div className="flex flex-wrap justify-start mt-10">
        <div className="flex flex-wrap justify-start gap-20 w-full">
          <AllSubscriptions/>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionsPage;
