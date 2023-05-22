import { useNetwork } from 'wagmi'
import { useMemo } from 'react'
import { ethers } from 'ethers'

export function useWeb3Provider() {
  const network = useNetwork()
  return useMemo(() => {
    return new ethers.providers.Web3Provider(
      (window as any).ethereum,
      network.chain
        ? {
            name: network.chain?.name,
            chainId: network.chain?.id,
          }
        : undefined
    )
  }, [network])
}
