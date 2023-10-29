import { useState, useEffect } from "react";
import type { NextPage } from "next";
import Head from "next/head";

import { ethers } from "ethers";
import { Provider } from "ethers";

import { JsonRpcProvider } from "@ethersproject/providers";
import { JsonRpcSigner } from "@ethersproject/providers";

const provider = new JsonRpcProvider("https://mainnet.infura.io/v3/YOUR_API_KEY");



import LayoutDashboard from "@/layout/layoutDashboard";
import { WindowLoader } from "@/components/shared/WindowLoader";
import { ErrorInDashboard } from "@/components/shared/errorInDashboard";

import { TxnsTable } from "@/components/shared/tables/TxnsTable";

const Txns: NextPage = () => {
  const [rpcUrl, setRpcUrl] = useState<string>(
    "https://omniscient-evocative-fire.ethereum-sepolia.quiknode.pro/3213e3742c524aba34079e33f9df33bc89d34082"
  );
  const [txns, setTxns] = useState<{
    val: ethers.TransactionResponse[];
    loading: boolean;
    noTxns: boolean;
    err: any;
  }>({
    val: [],
    loading: true,
    noTxns: false,
    err: null,
  });

  useEffect(() => {
    async function fetch() {
      try {
        const set= setRpcUrl("https://omniscient-evocative-fire.ethereum-sepolia.quiknode.pro/3213e3742c524aba34079e33f9df33bc89d34082")
        const provider = new ethers.JsonRpcProvider(rpcUrl);
        const wallet: JsonRpcSigner = await provider.getSigner();

        const txnHistory = await wallet.getHistory();

       // const signer: JsonRpcSigner = await provider.getSigner();


        


        setTxns({
          loading: false,
          val: txnHistory,
          noTxns: txnHistory.length === 0,
          err: null,
        });
      } catch (e) {
        setTxns({
          loading: false,
          val: [],
          noTxns: true,
          err: e,
        });
      }
    }

    fetch();
  }, [rpcUrl]);

  let jsx = null;

  if (txns.loading) {
    jsx = <WindowLoader />;
  } else if (txns.err) {
    jsx = <ErrorInDashboard />;
  } else if (txns.noTxns) {
    jsx = <>No txns found</>;
  } else {
    jsx = (
      <div className="divide-y divide-gray-100 space-y-8">
        <TxnsTable txns={txns.val} />
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <LayoutDashboard>{jsx}</LayoutDashboard>
    </>
  );
};

export default Txns;