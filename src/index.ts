import type {
  Contract,
  Transaction,
  TransactionReceipt,
  Web3,
  Web3BaseWalletAccount,
} from 'web3'
import { Web3PluginBase } from 'web3'
import { ipfs as ipfsUploader } from './ipfs'
import type { Ipfs } from './ipfs'
import {
  REGISTRY_CONTRACT_ABI,
  REGISTRY_CONTRACT_ADDRESS,
  DEPLOYMENT_BLOCK_NUMBER,
} from './const'

export class IpfsPlugin extends Web3PluginBase {
  public pluginNamespace = 'ipfs'

  private readonly _registryContract: Contract<typeof REGISTRY_CONTRACT_ABI>

  private _web3: Web3

  private _ipfs: Ipfs

  public constructor(
    web3Instance: Web3,
    ipfs = ipfsUploader,
    registryContractData = {
      abi: REGISTRY_CONTRACT_ABI,
      address: REGISTRY_CONTRACT_ADDRESS,
    },
  ) {
    super()
    this._web3 = web3Instance
    this._ipfs = ipfs
    this._registryContract = new this._web3.eth.Contract(
      registryContractData.abi,
      registryContractData.address,
    )
  }

  private async _sendTransactionToRegistry(
    account: Web3BaseWalletAccount,
    cid: string,
  ): Promise<TransactionReceipt> {
    try {
      const txData = this._registryContract.methods.store(cid).encodeABI()

      const tx: Transaction = {
        from: account.address,
        to: this._registryContract.options.address,
        gas: 2000000,
        data: txData,
        maxFeePerGas: this._web3.utils.toWei('3', 'gwei'),
        maxPriorityFeePerGas: this._web3.utils.toWei('2', 'gwei'),
      }

      const signedTx = await account.signTransaction(tx)

      const receipt = await this._web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
      )

      return receipt
    } catch (error) {
      console.error('An error occurred during the transaction process:', error)
      throw error
    }
  }

  public async upload(
    file: Uint8Array,
    account: Web3BaseWalletAccount,
  ): Promise<string> {
    try {
      const cid = await this._ipfs.addFile(file)
      const receipt = await this._sendTransactionToRegistry(account, cid)

      return receipt.transactionHash.toString()
    } catch (error) {
      console.error('An error occurred during the upload process:', error)
      throw error
    }
  }

  public async getCIDsForAddress(
    address: string,
    fromBlock = DEPLOYMENT_BLOCK_NUMBER,
  ): Promise<string[]> {
    try {
      const events = await this._registryContract.getPastEvents('CIDStored', {
        filter: { owner: address },
        fromBlock,
        toBlock: 'latest',
      })

      const cids = events.map(event =>
        typeof event === 'string' ? event : (event.returnValues.cid as string),
      )

      console.log(cids)

      return cids
    } catch (error) {
      console.error('An error occurred while retrieving the CIDs:', error)
      throw error
    }
  }
}

declare module 'web3' {
  interface Web3Context {
    ipfs: IpfsPlugin
  }
}
