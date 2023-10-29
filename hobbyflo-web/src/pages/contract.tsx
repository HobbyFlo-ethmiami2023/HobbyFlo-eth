import type { NextPage } from "next";
import Head from "next/head";
import LayoutDashboard from "@/layout/layoutDashboard";
import { errorReporter } from "@/utility/error/reporter";
import { infoToast } from "@/utility/toasts";
import axios from "axios";
import { useTranslation } from "next-i18next";
import React, { useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { ArrowPathIcon } from "@heroicons/react/24/outline";

const Contract: NextPage = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    setValue,
    watch,
    control,
  } = useForm({
    defaultValues: {
      buyer: "",
      seller: "",
      arbiter: "",
      endDate: moment().add("0", "m"),
      termsHash: "",
    },
  });

  const inputElEndDate = useRef<Datetime>(null);

  const onSubmit = async (data: any) => {
    try {
      const { buyer, seller, arbiter, endDate } = data;

      const endDateUnixMilliseconds = endDate.unix() * 1000;

      console.log("data", data);
      console.log("endDate", endDate);

      // Ethers.js deploy contract here

      infoToast("Deploying Contract...");
    } catch (e) {
      errorReporter(e);
    }
  };

  return (
    <>
      <Head>
        <title>Contract</title>
      </Head>
      <LayoutDashboard>
        <>
          <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-0 lg:px-8">
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-5xl">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="buyer"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Buyer
                    </label>
                    <div className="mt-2">
                      <input
                        {...register("buyer", {
                          required: true,
                        })}
                        id="buyer"
                        name="buyer"
                        type="text"
                        autoComplete="buyer"
                        placeholder={"Buyer Address"}
                        className={`block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 ${
                          errors["buyer"] && "ring-red-700 focus:ring-red-500"
                        }`}
                      />
                    </div>
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="seller"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Seller
                    </label>
                    <div className="mt-2">
                      <input
                        {...register("seller", {
                          required: true,
                        })}
                        id="seller"
                        name="seller"
                        type="seller"
                        autoComplete="seller"
                        placeholder={"Seller Address"}
                        className={`block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 ${
                          errors["seller"] && "ring-red-700 focus:ring-red-500"
                        }`}
                      />
                    </div>
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="arbiter"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Arbiter
                    </label>
                    <div className="mt-2">
                      <input
                        {...register("arbiter", {
                          required: true,
                        })}
                        id="arbiter"
                        name="arbiter"
                        type="text"
                        autoComplete="arbiter"
                        placeholder={"Arbiter Address"}
                        className={`block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 ${
                          errors["arbiter"] && "ring-red-700 focus:ring-red-500"
                        }`}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="termsHash"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Hash of agreement terms
                  </label>
                  <div className="mt-2">
                    <input
                      {...register("termsHash", {
                        required: true,
                      })}
                      type="text"
                      name="termsHash"
                      id="termsHash"
                      placeholder={"Hash of agreement terms"}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                      defaultValue={""}
                    />
                  </div>
                </div>
                {/*  */}
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="endDate"
                    className="flex text-sm font-medium leading-6 text-gray-900"
                  >
                    End Date&nbsp;
                    <ArrowPathIcon
                      className="inline h-5 w-5 cursor-pointer"
                      onClick={() => {
                        setValue("endDate", moment());
                      }}
                    />
                  </label>
                  <div className="mt-2">
                    <Datetime
                      timeFormat={true}
                      input={true}
                      ref={inputElEndDate}
                      initialValue={getValues("endDate")}
                      onChange={(e: any) => {
                        console.log("--- e.unix() ---", e.unix());
                        e = moment(e.unix() * 1000);
                        setValue("endDate", e);
                      }}
                      renderInput={(props, openCalendar, closeCalendar) => (
                        <input
                          {...register("endDate", {
                            required: true,
                          })}
                          className={`max-w-lg block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 ${
                            errors["endDate"] &&
                            "ring-red-700 focus:ring-red-500"
                          }`}
                          type="text"
                          inputMode="none"
                          value={getValues("endDate").toString()}
                          placeholder="mm/dd/yyyy"
                          onFocus={(e: any) => {
                            openCalendar();
                          }}
                        />
                      )}
                    />
                  </div>
                </div>
                <div>
                  <button className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
                    Deploy
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      </LayoutDashboard>
    </>
  );
};

export default Contract;
