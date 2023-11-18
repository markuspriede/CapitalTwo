import React from 'react';
import CustomCard from './CustomCard';

const SubscriptionsPage: React.FC = () => {
  const card0 = {
    title: 'Subscription Total',
    price: '$65.05',
    subTitle: 'Calculated to today',
    subPlan: '',
    showLogo: false,
    customHeightCard0: true,
    customWidthCard0: true,
  };

  const card1 = {
    title: 'YouTube Premium',
    price: '$10.00',
    subTitle: '09/15-10/14',  
    subPlan: 'Monthly',
    comingUp: 'Coming Up', 
    showLogo: false,  
    customHeightCard1: true,
    customWidthCard1: true,
  };

  const card2 = {
    title: 'YouTube Premium',
    price: '$10.00',
    subTitle: 'Student Premium Plan',
    subPlan: 'Monthly',
  };

  const card3 = {
    title: 'YouTube Premium',
    price: '$10.00',
    subTitle: 'Student Premium Plan',
    subPlan: 'Monthly',
  };

  const card4 = {
    title: 'YouTube Premium',
    price: '$10.00',
    subTitle: 'Student Premium Plan',
    subPlan: 'Monthly',
  };

  const card5 = {
    title: 'YouTube Premium',
    price: '$10.00',
    subTitle: 'Student Premium Plan',
    subPlan: 'Monthly',
  };

  const card6 = {
    title: 'YouTube Premium',
    price: '$10.00',
    subTitle: 'Student Premium Plan',
    subPlan: 'Monthly',
  };

  const card7 = {
    title: 'YouTube Premium',
    price: '$10.00',
    subTitle: 'Student Premium Plan',
    subPlan: 'Monthly',
  };

  return (
    <div className="p-6">
    <div className="mt-4">
      <div className="flex flex-wrap justify-start gap-20 mt-4 mb-4">
        <div><CustomCard {...card0} center /></div>
        <div><CustomCard {...card1} /></div>
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
          <CustomCard {...card2} />
          <CustomCard {...card3} />
          <CustomCard {...card4} />
        </div>
        <div className="flex flex-wrap justify-start gap-20 w-full mt-6">
          <CustomCard {...card5} />
          <CustomCard {...card6} />
          <CustomCard {...card7} />
        </div>
      </div>
    </div>
  );
};

export default SubscriptionsPage;
