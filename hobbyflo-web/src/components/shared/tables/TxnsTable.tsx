import { useAppContext } from "@/context/AppContext";
import { ScanningMode } from "@/types/ScanningMode";
import get from "lodash.get";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

interface P {
  txns: any[];
}

export function TxnsTable(p: P) {
  let { txns } = p;
  const router = useRouter();

  txns = txns.slice(0, 10);

  return (
    <div className="px-4 pt-8 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Txns
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            All the transactions associated with the linked account
          </p>
        </div>
      </div>
      <div className="-mx-4 mt-4 sm:-mx-0">
        <table className="min-w-full divide-y divide-gray-300">
          <thead>
            <tr>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
              >
                Txn
              </th>
              <th
                scope="col"
                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
              >
                Block
              </th>
              <th
                scope="col"
                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
              >
                Time
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Preview
              </th>
              <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                <span className="sr-only">View</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {txns.map((txn) => {
              // console.log("customRequest", customRequest);

              return (
                <tr key={txn.id}>
                  <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-0">
                    <p>{txn.id}</p>
                    <dl className="font-normal lg:hidden">
                      <dt className="sr-only">Block</dt>
                      <dd className="mt-1 truncate text-gray-700">
                        {txn.block}
                      </dd>
                      <dt className="sr-only sm:hidden">Time</dt>
                      <dd className="mt-1 truncate text-gray-500 sm:hidden">
                        {txn.unix}
                      </dd>
                    </dl>
                  </td>
                  <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
                    {txn.block}
                  </td>
                  <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                    {txn.unix}
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-500">...</td>
                  <td className="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                    <button
                      className="text-blue-600 hover:text-blue-900"
                      onClick={() => {
                        router.push(`/contract-overview`);
                      }}
                    >
                      View
                      <span className="sr-only">{txn.id}</span>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
