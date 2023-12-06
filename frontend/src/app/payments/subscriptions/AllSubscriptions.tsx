'use client'

import React from "react";
import { useState, useEffect } from "react";
import SubscriptionCard from "./SubscriptionCard";
import { ICustomSubCard } from "@/app/types/Types";


const AllSubscriptions: React.FC = () => {
    const [subscriptions, setSubscriptions] = useState<ICustomSubCard[]>([]);

    useEffect(() => {
      fetch("http://3.84.112.106/subscription")
        .then(res => {
          console.log(res.status);
          return res.json()
        })
        .then(data => {
          console.log(data)
          setSubscriptions(data)
        })
    }, [])
    
    return (
        <div className="flex flex-wrap justify-start gap-8">
        {
            subscriptions.map((sub) => <SubscriptionCard key={sub.id} {...sub} />

            )
        }
    </div>
    )
}

export default AllSubscriptions