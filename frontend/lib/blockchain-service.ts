// This service will integrate with your command-line blockchain
// For now, we'll use mock data that you can replace with actual API calls

export interface Transaction {
  id: string
  sender: string
  receiver: string
  amount: number
  timestamp: number
  hash: string
}

// Mock ledger data - replace this with actual API calls to your blockchain
const ledgerData: Transaction[] = [
  {
    id: "tx1",
    sender: "exchange",
    receiver: "alice",
    amount: 5000,
    timestamp: Date.now() - 1000000,
    hash: "0x123abc456def789",
  },
  {
    id: "tx2",
    sender: "alice",
    receiver: "exchange",
    amount: 2500,
    timestamp: Date.now() - 800000,
    hash: "0x456def789ghi012",
  },
  {
    id: "tx3",
    sender: "exchange",
    receiver: "alice",
    amount: 3000,
    timestamp: Date.now() - 600000,
    hash: "0x789ghi012jkl345",
  },
  {
    id: "tx4",
    sender: "alice",
    receiver: "bob",
    amount: 1500,
    timestamp: Date.now() - 400000,
    hash: "0x012jkl345mno678",
  },
  {
    id: "tx5",
    sender: "exchange",
    receiver: "alice",
    amount: 4000,
    timestamp: Date.now() - 200000,
    hash: "0x345mno678pqr901",
  },
]

export class BlockchainService {
  // Get the entire ledger
  static getLedger(): Transaction[] {
    // In a real implementation, this would fetch data from your blockchain API
    return ledgerData
  }

  // Get total invested amount
  static getTotalInvestedAmount(): number {
    // Calculate total invested amount from ledger
    let total = 0
    ledgerData.forEach((tx) => {
      if (tx.receiver === "alice") {
        total += tx.amount
      }
      if (tx.sender === "alice") {
        total -= tx.amount
      }
    })
    return total
  }

  // Get total number of transactions
  static getTotalTransactions(): number {
    return ledgerData.length
  }

  // Get transactions for a specific user
  static getUserTransactions(username: string): Transaction[] {
    return ledgerData.filter((tx) => tx.sender === username || tx.receiver === username)
  }

  // Verify a transaction by hash
  static verifyTransaction(hash: string): Transaction | null {
    return ledgerData.find((tx) => tx.hash === hash) || null
  }

  // Get all user balances
  static getAllBalances(): Record<string, number> {
    const balances: Record<string, number> = {}

    ledgerData.forEach((tx) => {
      if (!balances[tx.sender]) {
        balances[tx.sender] = 0
      }
      if (!balances[tx.receiver]) {
        balances[tx.receiver] = 0
      }

      balances[tx.sender] -= tx.amount
      balances[tx.receiver] += tx.amount
    })

    return balances
  }

  // Create a new transaction
  static createTransaction(sender: string, receiver: string, amount: number, password: string): Transaction | null {
    // In a real implementation, this would call your blockchain API
    // For now, we'll just create a mock transaction

    if (password !== "password") {
      return null
    }

    const newTransaction: Transaction = {
      id: `tx${ledgerData.length + 1}`,
      sender,
      receiver,
      amount,
      timestamp: Date.now(),
      hash: `0x${Math.random().toString(16).substring(2, 34)}`,
    }

    // Add to our mock ledger
    ledgerData.push(newTransaction)

    return newTransaction
  }
}
