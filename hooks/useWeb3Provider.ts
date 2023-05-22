import { useNetwork } from 'wagmi'
import { useMemo } from 'react'
import { ethers } from 'ethers'

export function useWeb3Provider() {
  const network = useNetwork()
  return useMemo(() => {
    const ethereum = (window as any).ethereum
    return ethereum
      ? new ethers.providers.Web3Provider(
          ethereum,
          network.chain
            ? {
                name: network.chain?.name,
                chainId: network.chain?.id,
              }
            : undefined
        )
      : null
  }, [network])
}
