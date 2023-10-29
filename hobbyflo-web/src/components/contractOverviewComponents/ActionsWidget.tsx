import { infoToast } from "@/utility/toasts";
import React from "react";

export const ActionsWidget = () => {
  return (
    <div className=" bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div
          className="rounded-2xl flex bg-white p-6 flex-col space-y-5"
          id="widget"
        >
          <div>
            <p className="text-lg font-semibold">Actions</p>
          </div>

          <div className="flex space-x-5 items-center">
            <button
              onClick={() => {
                infoToast("Request Arbitration");
              }}
              className="rounded-lg bg-blue-400 text-red-50 text-sm p-2 px-6 transform hover:scale-105 duration-300"
            >
              Arbitrate
            </button>
            <button
              onClick={() => {
                infoToast("Withdraw funds");
              }}
              className="rounded-lg bg-blue-400 text-red-50 text-sm p-2 px-6 transform hover:scale-105 duration-300"
            >
              Withdraw Money
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
