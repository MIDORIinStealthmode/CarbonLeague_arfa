export type MintResponse = {
  receipt: {
    to: string
    from: string
    transactionIndex: number
    gasUsed: {
      type: string
      hex: string
    }
    logsBloom: string
    blockHash: string
    transactionHash: string
    logs: {
      transactionIndex: number
      blockNumber: number
      transactionHash: string
      address: string
      topics: string[]
      data: string
      logIndex: number
      blockHash: string
    }[]
    blockNumber: number
    confirmations: number
    cumulativeGasUsed: {
      type: string
      hex: string
    }
    effectiveGasPrice: {
      type: string
      hex: string
    }
    status: number
    type: number
    byzantium: boolean
    events: {
      transactionIndex: number
      blockNumber: number
      transactionHash: string
      address: string
      topics: string[]
      data: string
      logIndex: number
      blockHash: string
      args: (string | { type: string, hex: string })[]
      event: string
      eventSignature: string
    }[]
  }
}
