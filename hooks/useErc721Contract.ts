import { useWeb3Provider } from './useWeb3Provider'
import { useMemo } from 'react'
import { ethers } from 'ethers'
import { erc721ABI } from 'wagmi'

export function useErc721Contract(address: string) {
  const provider = useWeb3Provider()
  return useMemo(() => {
    return new ethers.Contract(address, erc721ABI, provider)
  }, [address, provider])
}
