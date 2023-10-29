import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Hero } from "../components/indexComponents/hero";
import { Testimonials } from "../components/indexComponents/testimonials";
import { Features } from "../components/indexComponents/features";
import Layout1 from "@/layout/layout1";
import LayoutDashboard from "@/layout/layoutDashboard";
import { RolesWidget } from "@/components/contractOverviewComponents/RolesWidget";
import { ActionsWidget } from "@/components/contractOverviewComponents/ActionsWidget";
import { BalanceWidget } from "@/components/contractOverviewComponents/BalanceWidget";

const Interact: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Interact</title>
        <meta content="Made with love by HobbyFlo" name="description" />
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <LayoutDashboard>
        <BalanceWidget />
        <RolesWidget />
        <ActionsWidget />
      </LayoutDashboard>
    </div>
  );
};

export default Interact;
