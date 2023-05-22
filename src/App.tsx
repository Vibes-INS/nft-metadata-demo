import '@rainbow-me/rainbowkit/styles.css'
import { WalletProviders } from '../components/WalletProviders'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { NFTDetail } from '../components/NFTDetail'
import { Center, ChakraProvider } from '@chakra-ui/react'

function App() {
  return (
    <>
      <WalletProviders>
        <ChakraProvider>
          <Center flexDirection="column" py={8} h="100vh" w="full">
            <ConnectButton />

            <NFTDetail
              // contractAddress="0xa8d2e9faad9b3910c09984d297c82ce417bd2d83"
              // tokenID="512"

              contractAddress="0x5d666f215a85b87cb042d59662a7ecd2c8cc44e6"
              tokenID="2952036"
            />
          </Center>
        </ChakraProvider>
      </WalletProviders>
    </>
  )
}

export default App
