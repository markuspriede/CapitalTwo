'use client'

import { useState, useEffect } from "react";
import styles from "./Header.module.css";
import { usePathname } from "next/navigation";
import Link from "next/link";
import logo from "../icons/Capital-One-Logo.png"
import Image from "next/image";

const Header = () => {

  const pathName = usePathname();

  const headerItems = [
    { name: "Home", link: "/" },
    { name: "Transfers & Payments", link: "/payments" },
    { name: "Budget & Planning", link: "/budgets" },
  ];


  return <div>
      <div className="flex px-10">
        <Link href="/">
          <Image src={logo} alt="Capital One Logo" priority={true} className="object-scale-down h-16 w-32" />
        </Link>
      </div>

      <ul className="flex border-b-2 px-10 pt-1 text-xs">
        {headerItems.map((item, index) => (
          <li className="mr-1" key={index}>
            <Link href={item.link}>
              <div className={(pathName === item.link) || (pathName !== "/" && item.link !== "/" && pathName.includes(item.link)) ? styles.selected : styles.notSelected}>
                {item.name}
             </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
}

export default Header;