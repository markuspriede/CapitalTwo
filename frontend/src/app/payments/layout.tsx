"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Card from "../components/Card";
import styles from "./layout.module.css";

export default function PaymentsLayout({ children }: { children: React.ReactNode }) {
  const pathName = usePathname();

  const navItems = [
    { name: "Recent Transactions", link: "/payments" },
    { name: "Previous Billing", link: "" },
    { name: "Financial Summary", link: "" },
    { name: "Custom Date Range", link: "" },
    { name: "Subscription Management", link: "/payments/subscriptions" },
  ];
  
  return <section>
    <div className="flex h-screen px-10 gap-16">
      <div className="flex w-full gap-5">
        
        <div className="flex flex-col pt-3 text-sm text-gray-500 mr-14">
          {
            navItems.map((navItem) => {
              const isSelected = pathName === navItem.link;

              return <a key={navItem.name} className={`py-3 pl-2 pr-3 ${isSelected ? styles.selected : ""}`} href={navItem.link}>{navItem.name}</a>
            })
          }
        </div>
        <div className="flex flex-col flex-1 pt-3 gap-8">
          { children }
        </div>

      </div>
    </div>

  </section>
}