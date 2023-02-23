import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import type { AppProps } from 'next/app';
import { RainbowKitProvider, getDefaultWallets } from '@rainbow-me/rainbowkit';
import { Chain, configureChains, createClient, WagmiConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';

const chain: Chain = {
  name: "SKALE | Calypso NFT Hub",
  network: "SKALE",
  testnet: true,
  nativeCurrency: {
      decimals: 18,
      symbol: "sFUEL",
      name: "sFUEL"
  },
  id: parseInt("0x5a79c44e"),
  rpcUrls: {
      public: {
        http: ["https://staging-v3.skalenodes.com/v1/staging-aware-chief-gianfar"]
      },
      default: {
          http: [
            "https://staging-v3.skalenodes.com/v1/staging-aware-chief-gianfar"
          ]
      }
  }
};

const { chains, provider, webSocketProvider } = configureChains(
  [
    chain,
  ],
  [
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'RainbowKit App',
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

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
