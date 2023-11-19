import { useEffect, useState } from "react";
import { ITransaction } from "../types/Transaction"

interface ISubscriptionModal {
  transaction: ITransaction | null,
  showModal: boolean,
  setModal: any,
  setTransaction: any
}

const SubscriptionModal = (props: ISubscriptionModal) => {
  const [description, setDescription] = useState("");

  function closeModal() {
    props.setModal(false);
  }

  function addSubscription() {
    fetch(`http://3.128.31.44/subscription`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "icon_path": "",
        "routine": "Monthly",
        "description": "",
        "subscription_name": `${props.transaction?.name}`,
        "price": `${props.transaction?.amount}`
      })
    }).then((res) => res.json()).then((data) => {
      fetch(`http://3.128.31.44/transaction/${props.transaction?.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "isSubscription": true,
          "budget_id": props.transaction?.budgetId,
          "subscription_id": data.id
        })
      }).then((res) => res.json()).then(() => {
        props.setTransaction(null);
      });
    });

    closeModal();
  }

  function removeSubscription() {
    fetch(`http://3.128.31.44/subscription`).then((res) => res.json()).then((subs) => {
      subs.map((sub: any) => {
        sub.transactions.map((transaction: ITransaction) => {
          if (transaction.id === props.transaction?.id) {
            fetch(`http://3.128.31.44/subscription/${sub.id}`, {
              method: "DELETE"
            }).then((res) => res.json()).then(() => {
              props.setTransaction(null);
            })
          }
        })
      });
    })

    closeModal();
  }

  if (!props.transaction?.subscription) {
    return (
      <div hidden={!props.showModal} className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <h3 className="text-xl font-semibold leading-6 text-gray-900" id="modal-title">Are you sure you want to add this transaction as a recurring subscription?</h3>
                    <div className="mt-2">
                      <p className="text-md text-black"><span className="text-gray-500">Name:</span> {props.transaction?.name}</p>
                      <p className="text-md text-black"><span className="text-gray-500">Amount:</span> ${props.transaction?.amount}</p>
                      <p className="text-md text-black"><span className="text-gray-500">Routine:</span> Monthly</p>
                      <div className="w-full h-full pt-8 text-sm text-gray-500">Description</div>
                      <input className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button onClick={addSubscription} type="button" className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto" disabled={description === ""}>Yes</button>
                <button onClick={removeSubscription} type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  else {
    return (
      <div hidden={!props.showModal} className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <h3 className="text-xl font-semibold leading-6 text-gray-900" id="modal-title">Are you sure you want to remove this subscription?</h3>
                  </div>
                </div>
              </div>
              <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button onClick={removeSubscription} type="button" className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto">Yes</button>
                <button onClick={addSubscription} type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SubscriptionModal;