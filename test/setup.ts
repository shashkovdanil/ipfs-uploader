import { Web3 } from 'web3'
import { IpfsPlugin } from '../src'
import { REGISTRY_CONTRACT_ABI } from '../src/const'
import registryArtifact from '../build/contracts/Registry.json'

// In real development we have to add RPC server and privatekey to .env vars
export const web3 = new Web3('http://127.0.0.1:7545') // ganache RPC server
const plugin = new IpfsPlugin(
  web3,
  {
    addFile: () => Promise.resolve(`cid1`),
  },
  {
    address: registryArtifact.networks['5777'].address,
    abi: REGISTRY_CONTRACT_ABI,
  },
)
web3.registerPlugin(plugin)

const privateKey =
  '0x18a311d08d68748e4aff1f85bb114fdec166d6b27b0ea702c8a36bf50e9e1b08' // from ganache accounts
export const account = web3.eth.accounts.privateKeyToAccount(privateKey)
