'use client'

import React from 'react';
import { useState, useEffect } from 'react';
import { ICustomSubCard } from '@/app/types/Types';
import Image from 'next/image';

const SubscriptionCard: React.FC<ICustomSubCard> = (props: ICustomSubCard) => {

  return (
    <div className="relative flex w-full max-w-[23rem] flex-col rounded-xl bg-clip-border bg-gray-100 text-gray-700 shadow-lg p-2 mb-2">
      <div className="relative flex items-center gap-4 pt-0 pb-2 pr-3 mx-0 mt-4 overflow-hidden text-gray-700 bg-transparent shadow-none rounded-xl bg-clip-border">
      <img
          src={props.icon_path}
          alt="Subscription Logo"
          className="inline-block h-[58px] w-[58px]" 
          // !rounded-full object-cover object-center
        />
        <div className="flex w-full flex-col gap-0.5">
          <div className="flex items-center justify-between">
            <h5 className="block font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
              {props.subscription_name}
            </h5>
            <div className="flex items-center gap-0">
              <h5 className='font-sans text-xl'>
                ${props.price.toFixed(2)}
              </h5>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <p className="block font-sans text-base antialiased font-light leading-relaxed text-blue-gray-900">
              {props.description}
            </p>
            <div className="flex items-center gap-0">
              <p className='font-sans'>
                {props.routine}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionCard;