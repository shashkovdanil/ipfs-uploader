import { test, expect } from 'vitest'
import { web3, account } from './setup'

test('upload', async () => {
  const txHash = await web3.ipfs.upload(new Uint8Array([1, 2, 3]), account)
  expect(txHash.length).toEqual(66)
})

test('get list of CIDs', async () => {
  const latestBlockNumber = await web3.eth.getBlockNumber()
  const cids = await web3.ipfs.getCIDsForAddress(
    account.address,
    latestBlockNumber.toString(),
  )
  expect(cids).toContain(
    '0x908a7948c7ef87571c5e9bc764dd90bc16794ce29cfcdf994ff79849ab791c6c', // 'cid1'
  )
})
