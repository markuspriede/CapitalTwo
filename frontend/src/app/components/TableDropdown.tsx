import { useEffect, useState } from "react";
import { ITransaction } from "../types/Types";

interface ITableDropdownProps {
  transaction: ITransaction,
  budgets: any[],
  changeBudget: any
}

const TableDropdown = (props: ITableDropdownProps) => {
  const [hidden, setHidden] = useState(true);

  function toggle() {
    setHidden(!hidden);
  }

  function changeBudget(budget: string) {
    props.changeBudget(budget, props.transaction);
    toggle();
  }

  return <>
    <div className="relative inline-block text-left text-xs w-full h-full pr-5">
      <div>
        <button type="button" className="inline-flex w-full justify-between content-center gap-x-1.5 rounded-xl bg-white px-3 py-2 text-xs text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" onClick={toggle}>
          <span>{ props.transaction.budget }</span>
          <svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      {
        !hidden ? <> 
          <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white hover:bg-white-600 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" tabIndex={-1}>
            <div className="py-1">
              {
                props.budgets.map((budget) => {
                  return <span key={budget.category_name} onClick={() => changeBudget(budget)} className="text-gray-700 block px-4 py-2 text-sm cursor-pointer hover:bg-slate-100" tabIndex={-1}>{ budget.category_name }</span>; 
                })
              }
            </div>
          </div>
        </> : <></>
      }
      
    </div>
  </>
}

export default TableDropdown;