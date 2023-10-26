import { createHelia } from 'helia'
import { unixfs } from '@helia/unixfs'

export const ipfs = {
  addFile: async (file: Uint8Array): Promise<string> => {
    try {
      const helia = await createHelia()
      const fs = unixfs(helia)

      const cid = await fs.addFile({
        content: file,
      })

      return cid.toString()
    } catch (error) {
      console.error('An error occurred while uploading the file:', error)
      throw error
    }
  },
}

export type Ipfs = typeof ipfs
