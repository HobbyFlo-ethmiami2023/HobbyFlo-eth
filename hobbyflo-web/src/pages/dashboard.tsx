import type { NextPage } from "next";
import Head from "next/head";

import LayoutDashboard from "@/layout/layoutDashboard";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <LayoutDashboard>
        Content
      </LayoutDashboard>
    </>
  );
};

export default Home;
