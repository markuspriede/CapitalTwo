import React from "react";
import { useState } from "react";

export interface ISubTotalCard {
    title: string;
    priceDisplay: number
    subtitle: string
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

  export default SubTotalCard;