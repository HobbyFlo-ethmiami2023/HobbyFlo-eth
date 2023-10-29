import React from "react";

export const BalanceWidget = () => {
  return (
    <div className=" bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div
        className="relative py-3 sm:max-w-xl sm:mx-auto font-inter"
        id="widget"
      >
        <div className="rounded-xl bg-white p-6 w-96 text-gray-700">
          <div className="font-semibold text-gray-800 mb-4">Balance</div>
          <div className="flex text-sm font-semibold text-gray-600">
            <div className="w-9/12">Amount</div>
            <div className="w-3/12">Token</div>
          </div>
          <div className="text-sm flex w-full">
            <div className="flex items-center space-x-2 mt-5 w-9/12 truncate p4">
              <div>0.41</div>
            </div>
            <div className="flex items-center space-x-2 mt-5 w-3/12 transform hover:scale-105 duration-200 overflow-hidden">
              ETH
            </div>
          </div>
          <div className="text-sm flex w-full">
            <div className="flex items-center space-x-2 mt-5 w-9/12">
              <div>{"0x1234adfc847".slice(0, 8)}</div>
            </div>
            <div className="flex items-center space-x-2 mt-5 w-3/12 transform hover:scale-105 duration-200 overflow-hidden">
              USDC
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
