export const REGISTRY_CONTRACT_ADDRESS =
  '0xa683bf985bc560c5dc99e8f33f3340d1e53736eb'
export const DEPLOYMENT_BLOCK_NUMBER = '4546394'
export const REGISTRY_CONTRACT_ABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      { indexed: true, internalType: 'string', name: 'cid', type: 'string' },
    ],
    name: 'CIDStored',
    type: 'event',
  },
  {
    inputs: [{ internalType: 'string', name: 'cid', type: 'string' }],
    name: 'store',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const
