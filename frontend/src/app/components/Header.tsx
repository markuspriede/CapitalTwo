'use client'

import { useState, useEffect } from "react";
import styles from "./Header.module.css";
import { usePathname } from "next/navigation";
import Link from "next/link";
import logo from "../icons/Capital-One-Logo.png"
import Image from "next/image";

const Header = () => {

  const pathName = usePathname();
   // List of pages where the header should be hidden
   const pagesWithoutHeader = ['/', '/enrollment'];

   // Check if the current pathname is in the list of pages without header
   const shouldHideHeader = pagesWithoutHeader.includes(pathName);
 
   // If the header should be hidden, return null
   if (shouldHideHeader) {
     return null;
   }

  const headerItems = [
    { name: "Home", link: "/home" },
    { name: "Transfers & Payments", link: "/payments" },
    { name: "Budget & Planning", link: "/budgets" },
  ];


  return (
    <div>
        <div className="flex px-10">
          <Link href="/" legacyBehavior>
            <Image src={logo} alt="Capital One Logo" priority={true} className="object-scale-down h-16 w-32" />
          </Link>
        </div>

        <ul className="flex border-b-2 px-10 pt-1 text-xs">
          {headerItems.map((item, index) => (
            <li className="mr-1" key={index}>
              <Link href={item.link} legacyBehavior>
                <div className={(pathName === item.link) || (pathName !== "/" && item.link !== "/" && pathName.includes(item.link)) ? styles.selected : styles.notSelected}>
                  {item.name}
               </div>
              </Link>
            </li>
          ))} 
        </ul>
      </div>
  );
}

export default Header;