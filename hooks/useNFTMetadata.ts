import useSWR from 'swr'
import { useAccount } from 'wagmi'
import { useErc721Contract } from './useErc721Contract'
import axios from 'axios'
import { GalxeOATMetadata } from '../models/GalxeOATMetadata'
import { useToast } from '@chakra-ui/react'
import { useEffect } from 'react'
import { QueryKey } from '../constants/QueryKey.ts'

export function useNFTMetadata(contractAddress: string, tokenID: string) {
  const contract = useErc721Contract(contractAddress)
  const account = useAccount()
  const toast = useToast()
  const errorToast = (error: any) =>
    toast({
      title: 'Failed to obtain NFT metadata',
      description: error,
      status: 'error',
    })
  const { data, error, isLoading } = useSWR(
    [QueryKey.GetNFTMetadata, account.address, tokenID],
    async () => {
      if (!contract) return null
      const isOwner = await contract
        .ownerOf(tokenID)
        .then((res: string) => res === account.address)
        .catch((err: unknown) => {
          errorToast(err)
          return false
        })
      const tokenURI = await contract
        .tokenURI(tokenID)
        .then((res: string) => res as string)
        .catch((err: any) => {
          errorToast(err)
          return ''
        })
      const metadata = tokenURI
        ? await axios.get<GalxeOATMetadata>(tokenURI).then((res) => res.data)
        : null
      console.log({ tokenID, metadata })
      return {
        isOwner,
        metadata,
      }
    },
    {
      revalidateOnReconnect: false,
      revalidateOnFocus: false,
      refreshWhenHidden: false,
      refreshWhenOffline: false,
    }
  )

  useEffect(() => {
    if (error) {
      console.error(error)
      toast({
        title: 'Failed to obtain NFT metadata',
        description: error,
        status: 'error',
      })
    }
  }, [error, toast])

  return {
    data,
    error,
    isLoading,
  }
}
