import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import type { AppProps } from 'next/app';
import { configureChains, WagmiConfig } from 'wagmi';
import {
  mainnet,
  goerli,
  sepolia,
  polygon,
  polygonMumbai,
  celo,
  celoAlfajores,
} from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';


import { UAuthWagmiConnector } from "@uauth/wagmi";
import { MetaMaskConnector } from "@wagmi/core/connectors/metaMask";
import { WalletConnectConnector } from "@wagmi/core/connectors/walletConnect";
import {default as UAuth} from '@uauth/js'
import { Connector, createClient } from "wagmi";

// const { chains, provider, publicClient, webSocketPublicClient } = configureChains(
//   [
//     goerli,
//     sepolia,
//     polygon,
//     polygonMumbai,
//     celo,
//     celoAlfajores,
//       ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [goerli] : []),
//   ],
//   [publicProvider()]
// );

const { chains, provider } = configureChains(
  [
    mainnet,
    goerli,
    sepolia,
    polygon,
    polygonMumbai,
    celo,
    celoAlfajores,
], 
  [publicProvider()]
  );


const uauthClient = new UAuth({
  // clientID: "CLIENT_ID",
  // redirectUri: "REDIRECT_URI",
  // // Scope must include openid and wallet
  // scope: "openid wallet",
  clientID: "a0ee8e9c-91ef-48ad-b9ff-14b3610bcb75",
  redirectUri: "http://localhost:3000",
  scope: "openid wallet messaging:notifications:optional"  
});

const metaMaskConnector = new MetaMaskConnector();
const walletConnectConnector = new WalletConnectConnector({
  options: {
    projectId: "2f7db0d266590a371c710cb2adfeb869", // Get projectID at https://cloud.walletconnect.com
  },
});

const { connectors } = getDefaultWallets({
  appName: 'RainbowKit App',
  projectId: 'YOUR_PROJECT_ID',
  chains,
});

const uauthConnector = new UAuthWagmiConnector({
  chains,
  options: {
    uauth: uauthClient,
    metaMaskConnector,
    walletConnectConnector,
  },
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors: [uauthConnector  as any as Connector<any, any, any>, metaMaskConnector, walletConnectConnector],
  provider,
});

// const wagmiConfig = createConfig({
//   autoConnect: true,
//   // connectors,
//   connectors: [metaMaskConnector, walletConnectConnector, uauthConnector as any as Connector<any, any>],
//   publicClient,
//   webSocketPublicClient,
// });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
