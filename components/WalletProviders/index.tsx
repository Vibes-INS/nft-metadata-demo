'use client'
import type { PropsWithChildren, FC } from 'react'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import {
  connectorsForWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit'
import { publicProvider } from 'wagmi/providers/public'
import { polygon } from 'wagmi/chains'
import { metaMaskWallet } from '@rainbow-me/rainbowkit/wallets'

const { chains, publicClient } = configureChains([polygon], [publicProvider()])

const walletOptions = {
  chains,
  appName: 'NFT-Metadata-demo',
}

const connectors = connectorsForWallets([
  {
    groupName: 'Recommended',
    wallets: [metaMaskWallet(walletOptions)],
  },
])

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
})

export const WalletProviders: FC<PropsWithChildren> = ({ children }) => {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>{children}</RainbowKitProvider>
    </WagmiConfig>
  )
}
