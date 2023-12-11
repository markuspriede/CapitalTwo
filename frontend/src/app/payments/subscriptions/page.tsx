'use client'

import React from 'react';
import SubscriptionCard from './SubscriptionCard';
import AllSubscriptions from './AllSubscriptions';
import { SubTotalCard, ComingUpCard, ISubTotalCard } from './DashboardCards';
import { useState, useEffect } from 'react';
import { ICustomSubCard } from '@/app/types/Types';


const SubscriptionsPage: React.FC = () => {
  const [subscriptionTotal, setSubscriptionTotal] = useState(0)
  const [subscriptions, setSubscriptions] = useState<ICustomSubCard[]>([]);
  const [highestIdSub, setHighestIdSub] = useState<ICustomSubCard | null>(null);

  useEffect(() => {
    fetch("http://3.84.112.106/subscription")
  .then(res => {
    console.log(res.status);
    return res.json()
  })
  .then(data => {
    // console.log(data)
    setSubscriptions(data)

    const highestIdSub = data.reduce((maxIdSub: ICustomSubCard, sub: ICustomSubCard) => {
      return sub.id > maxIdSub.id ? sub : maxIdSub;
    }, data[0]);
    setHighestIdSub(highestIdSub);

    const prices = data.map((sub: { price: number; }) => sub.price);
    const total = prices.reduce((acc: number, price: number) => acc + price, 0)
    setSubscriptionTotal(total)
  })
}, [])


  const subTotalData: ISubTotalCard = {
    title: 'Subscription Total',
    priceDisplay: subscriptionTotal,
    subtitle: 'Calculated Today'
  }

  return (
    <div className="p-6">
    <div className="mt-4">
    <div className="flex flex-wrap gap-20 mt-4 mb-4">
          <SubTotalCard {...subTotalData}/>

          {highestIdSub !== null ? (
          <ComingUpCard 
            subscription_name={highestIdSub.subscription_name} 
            price={highestIdSub.price} 
            routine={highestIdSub.routine} 
            id={highestIdSub.id} 
            date='Due: 12-31-2023'
            icon_path={highestIdSub.icon_path}
          />
          ) :  (
            <div className="flex items-center justify-center">
            <p>No upcoming subscriptions.</p>
            </div>
          )}
        </div>
      <div className="flex justify-center mb-4 ml-96">
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
