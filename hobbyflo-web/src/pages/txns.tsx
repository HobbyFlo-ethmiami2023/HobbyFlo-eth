import type { NextPage } from "next";
import Head from "next/head";

import LayoutDashboard from "@/layout/layoutDashboard";

const Txns: NextPage = () => {
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <LayoutDashboard>
        Txns
      </LayoutDashboard>
    </>
  );
};

export default Txns;
