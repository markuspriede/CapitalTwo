const Home = () => {
  return (
    <div className="flex flex-col h-screen">
      <ul className="flex border-b px-10 pt-4 text-xs">
        <li className="-mb-px mr-1">
          <a className="bg-blue-100 inline-block border-l border-b-4 border-b-blue-700 py-2 px-4 text-blue-700" href="#">Home</a>
        </li>
        <li className="mr-1">
          <a className="bg-white inline-block py-2 px-4 text-gray-400" href="#">Transfers & Deposits</a>
        </li>
        <li className="mr-1">
          <a className="bg-white inline-block py-2 px-4 text-gray-400" href="#">Payments</a>
        </li>
        <li className="mr-1">
          <a className="bg-white inline-block py-2 px-4 text-gray-400" href="#">Statements & Activity</a>
        </li>
        <li className="mr-1">
          <a className="bg-white inline-block py-2 px-4 text-gray-400" href="#">Budget & Planning</a>
        </li>
      </ul>
      
      <div className="flex justify-center gap-x-10 pt-8">
        <div className="flex-1 max-w-sm rounded overflow-hidden shadow-lg text-center border-2 border-gray-200 p-1">
          <div className="px-6 py-4">
            <div className="mb-2 text-xl">Statement Balance</div>
            <p className="font-bold text-4xl">$100.5</p>
          </div>
          <p>Aug 15 - Sep 14</p>
          <div className="px-6 py-8">
            <button className="flex-1 px-3 text-xs py-2 select-none rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200">View Transactions</button>
          </div>
        </div>

        <div className="flex-1 max-w-sm rounded overflow-hidden shadow-lg text-center border-2 border-gray-200 p-1">
          <div className="px-6 py-4">
            <div className="mb-2 text-xl">Payment Due on</div>
            <p className="font-bold text-4xl">September 30</p>
          </div>
          <p>Minimum Payment Due $20.00</p>
          <div className="px-6 py-8">
            <button className="flex-1 px-3 text-xs py-2 select-none rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200">Make Payment</button>
          </div>
        </div>

        <div className="flex-1 max-w-sm rounded overflow-hidden shadow-lg text-center border-2 border-gray-200 p-1">
          <div className="px-6 py-4">
            <div className="mb-2 text-xl">Total Balance</div>
            <p className="font-bold text-4xl">$100.5</p>
          </div>
          <p>Balance Details</p>
          <div className="px-6 py-8">
            <button className="flex-1 px-3 text-xs py-2 select-none rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200">View Balance Details</button>
          </div>
        </div>

      </div>

      <div className="pt-8 px-10 flex flex-col flex-1 mb-6">
        <h1 className="text-2xl font-semibold pb-4">Financial Summary</h1>
        <div className="flex flex-1 justify-center gap-x-3 text-left">
          <div className="bg-gray-200 rounded-md p-3 text-left text-xl flex-1">Activities</div>
          <div className="bg-gray-200 rounded-md p-3 text-left text-xl flex-shrink w-1/4">Categories</div>
          <div className="bg-gray-200 rounded-md p-3 text-left text-xl flex-1">Budget</div>
        </div>
      </div>
    </div>
  )
}

export default Home;