import type { NextPage } from "next";
import Head from "next/head";

import { DashboardLayout } from "../layouts/dashboardLayout";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <DashboardLayout>asdf</DashboardLayout>
    </>
  );
};

export default Home;
