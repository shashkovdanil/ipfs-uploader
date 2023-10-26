# Web3.js IPFS Plugin

This is a [web3.js](https://github.com/web3/web3.js) `4.x` plugin for uploading a provided local file to IPFS then store the CID in a smart contract

## Features

- Simple file uploads to IPFS within a Web3 project.
- Transparent recording and tracking of file CIDs through a smart contract on the Ethereum blockchain.
- Convenient retrieval of all CIDs associated with an Ethereum address.
- Integration with the Web3.js library, allowing for a seamless blockchain experience.
- Working in node.js and the browser.

## Usage

```ts
import { Web3 } from 'web3'
import { IpfsPlugin } from 'web3-ipfs-plugin'

const web3 = new Web3()
const plugin = new IpfsPlugin(web3)
web3.registerPlugin(plugin)

const txHash = await web3.ipfs.upload(file, account)
const cids = await web3.ipfs.getCIDsForAddress(account)
```

## Testing

1. Install [Ganache UI](https://trufflesuite.com/ganache/)
2. Run Ganache UI
3. Run `npm run migrate`
4. Run `npm run test`
