'use client'

import { useState, useEffect } from "react";
import styles from "./Header.module.css";
import { usePathname } from "next/navigation";

const Header = () => {
  const [selected, setSelected] = useState("");

  const pathName = usePathname();

  const headerItems = [
    { name: "Home", link: "/" },
    { name: "Transfers & Deposits", link: "/deposits" },
    { name: "Payments", link: "/payments" },
    { name: "Statements & Activity", link: "/statements" },
    { name: "Budget & Planning", link: "/budgets" },
  ];

  useEffect(() => {
    setSelected(pathName);
  }, []);

  return <div>
    <ul className="flex border-b px-10 pt-4 text-xs">
      {
        headerItems.map((item, index) => {
          return <li className="mr-1" key={index}>
              <a className={selected === item.link ? styles.selected : styles.notSelected} href={item.link}>{item.name}</a>
            </li>
        })
      }
    </ul>
  </div>
}

export default Header;