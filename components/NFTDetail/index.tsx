import { useAccount } from 'wagmi'
import { useState } from 'react'
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Skeleton,
  SkeletonText,
  Text,
  useToast,
} from '@chakra-ui/react'
import { useNFTMetadata } from '../../hooks/useNFTMetadata.ts'

export interface NFTDetailProps {
  contractAddress: string
  tokenID: string
}

export const NFTDetail: React.FC<NFTDetailProps> = ({
  contractAddress,
  tokenID,
}) => {
  const account = useAccount()
  const toast = useToast()
  const [price] = useState('0.2')
  const [isSold, setIsSold] = useState(false)

  const { data, isLoading } = useNFTMetadata(contractAddress, tokenID)
  const metadata = data?.metadata

  if (!account.address) return null

  return (
    <Box
      w="calc(100% - 40px)"
      maxW="500px"
      minH="600px"
      shadow="xl"
      rounded="lg"
      mt={8}
      mx="auto"
      pos="relative"
      pb="60px"
      bg="white"
    >
      <Skeleton
        isLoaded={!isLoading}
        w="full"
        h="300px"
        overflow="hidden"
        pos="relative"
        py={8}
        px={6}
        roundedTop="lg"
      >
        <Image
          src={metadata?.image}
          alt=""
          w="full"
          h="300px"
          objectFit="contain"
          pos="absolute"
          top="0"
          left="0"
          filter="blur(30px)"
          overflow="hidden"
          transform="translate3d(0, 0, 0) scale(1.5)"
          bg="#eee"
        />
        <Image
          pos="relative"
          src={metadata?.image}
          alt=""
          w="full"
          h="full"
          objectFit="contain"
          zIndex={1}
        />
      </Skeleton>

      <Flex direction="column" py={4} px={4}>
        <Skeleton isLoaded={!isLoading} h="22px">
          <Heading fontSize="lg">
            {metadata?.name}
            {data?.isOwner ? <Box as="span">{tokenID}</Box> : null}
          </Heading>
        </Skeleton>
        <SkeletonText
          mt="4"
          noOfLines={4}
          spacing="4"
          skeletonHeight="2"
          isLoaded={!isLoading}
        >
          <Text>
            {metadata?.description === ''
              ? 'No description'
              : metadata?.description}
          </Text>
        </SkeletonText>
      </Flex>
      <Flex
        pos="absolute"
        bottom="0"
        w="full"
        h="60px"
        left="0"
        align="center"
        justify="space-between"
        borderTop="1px solid"
        borderColor="gray.200"
        px={4}
        overflow="hidden"
      >
        <Skeleton isLoaded={!isLoading} h="24px">
          <Box>Owned: {data?.isOwner || isSold ? 'true' : 'false'}</Box>
        </Skeleton>

        {isSold ? (
          <Heading
            pos="absolute"
            bottom="10px"
            right="-10px"
            transform="rotate(45deg)"
          >
            Sold
          </Heading>
        ) : null}
        <Skeleton isLoaded={!isLoading} h="40px">
          <Flex align="center">
            <Box mr="10px">Price: {price} eth</Box>
            <Button
              colorScheme="blue"
              onClick={() => {
                toast({
                  title: 'Purchase successful ',
                })
                setIsSold(true)
              }}
              isDisabled={isSold}
            >
              Buy
            </Button>
          </Flex>
        </Skeleton>
      </Flex>
    </Box>
  )
}
