import { useState, useEffect } from "react";
import type { NextPage } from "next";
import Head from "next/head";

import LayoutDashboard from "@/layout/layoutDashboard";
import { WindowLoader } from "@/components/shared/WindowLoader";
import { ErrorInDashboard } from "@/components/shared/errorInDashboard";

import { TxnsTable } from "@/components/shared/tables/TxnsTable";
//wallet list defualt

const Txns: NextPage = () => {
  const [txns, setTxns] = useState<{
    val: any[];
    loading: boolean;
    err: any;
  }>({
    val: [],
    loading: true,
    err: null,
  });

  useEffect(() => {
    async function fetch() {
      try {
        // const res1 = await axios.get(
        //   `${process.env.QUICKNODE}/api/get-txns`,
        //   {
        //     withCredentials: true,
        //   }
        // );

        setTxns({
          loading: false,
          val: [
            {
              unix: 123412341234,
              id: "0xasdfzxcv",
              block: 41,
            },
          ],
          err: null,
        });
      } catch (e) {
        setTxns({
          loading: false,
          val: [],
          err: e,
        });
      }
    }

    fetch();
  }, []);

  let jsx = null;

  if (txns.loading) {
    jsx = <WindowLoader></WindowLoader>;
  } else if (txns.err) {
    jsx = <ErrorInDashboard />;
  } else if (txns.val?.length > 0) {
    jsx = (
      <div className="divide-y divide-gray-100 space-y-8">
        {txns.val?.length > 0 && <TxnsTable txns={txns.val} />}
      </div>
    );
  } else {
    jsx = <>No txns found</>;
  }

  return (
    <>
      <Head>
        <title>Transactions</title>
      </Head>
      <LayoutDashboard>{jsx}</LayoutDashboard>
    </>
  );
};

export default Txns;
