'use client'

import React from "react";
import { ICustomSubCard } from "@/app/types/Types";

export interface ISubTotalCard {
    title: string;
    priceDisplay: number;
    subtitle: string;
  }

const ComingUpCard = (props: ICustomSubCard) => {

    const renderIcon = () => {
        if (props.icon_path === 'String' || props.icon_path.trim() === '') {
          return (
            <div className="h-[58px] w-[58px] flex items-center justify-center bg-blue-300 text-white rounded-full text-3xl">
              {props.subscription_name.charAt(0).toUpperCase()}
            </div>
          );
        } else {
          return (
            <img
              src={props.icon_path}
              alt="Subscription Logo"
              className="inline-block h-[58px] w-[58px]"
            />
          );
        }
      };
    return (
        <div className="relative flex w-full max-w-[40rem] flex-col bg-white text-gray-700 shadow-lg flex-1 pb-6 rounded overflow-hidden text-center border-2 border-gray-200 p-1">
          <div className="relative flex items-center gap-4 pt-0 pr-3 mx-0 mt-4 overflow-hidden text-gray-700 rounded-xl">
          {renderIcon()}
            <div className="flex w-full flex-col gap-0.5">
            <h3 className="block font-sans text-base antialiased font-bold leading-relaxed text-blue-gray-900">
                    {props.comingUp}
                </h3>
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
                <p className="block font-sans text-base antialiased font-light leading-relaxed text-blue-500">
                  {props.date}
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
}

const SubTotalCard = (props: ISubTotalCard) => {
    return <>
      <div className="flex-1 max-w-sm pb-6 rounded overflow-hidden shadow-lg text-center border-2 border-gray-200 p-1">
        <div className="px-6 py-4">
          <div className="mb-2 text-xl">{props.title}</div>
          <p className="font-bold text-4xl">${props.priceDisplay.toFixed(2)}</p>
        </div>
        <p>{props.subtitle}</p>
      </div>
    </>
  }

  export {
    SubTotalCard,
    ComingUpCard,
  }