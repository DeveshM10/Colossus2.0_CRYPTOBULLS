"use client"

import { ArrowDown, ArrowUp } from "lucide-react"
import type { Transaction } from "@/lib/blockchain-service"

interface RecentTransactionsProps {
  transactions?: Transaction[]
}

export function RecentTransactions({ transactions = [] }: RecentTransactionsProps) {
  // If no transactions are provided, use default mock data
  const displayTransactions =
    transactions.length > 0
      ? transactions
      : [
          {
            id: "tx1",
            sender: "alice",
            receiver: "bob",
            amount: 5000,
            timestamp: Date.now() - 1000000,
            hash: "0x123abc456def789",
          },
          {
            id: "tx2",
            sender: "bob",
            receiver: "charlie",
            amount: 2500,
            timestamp: Date.now() - 800000,
            hash: "0x456def789ghi012",
          },
          {
            id: "tx3",
            sender: "alice",
            receiver: "charlie",
            amount: 1000,
            timestamp: Date.now() - 600000,
            hash: "0x789ghi012jkl345",
          },
          {
            id: "tx4",
            sender: "charlie",
            receiver: "alice",
            amount: 500,
            timestamp: Date.now() - 400000,
            hash: "0x012jkl345mno678",
          },
          {
            id: "tx5",
            sender: "bob",
            receiver: "alice",
            amount: 3000,
            timestamp: Date.now() - 200000,
            hash: "0x345mno678pqr901",
          },
        ]

  // Sort transactions by timestamp (newest first)
  const sortedTransactions = [...displayTransactions].sort((a, b) => b.timestamp - a.timestamp)

  return (
    <div className="space-y-4">
      {sortedTransactions.map((transaction) => (
        <div
          key={transaction.id}
          className="flex items-center justify-between rounded-lg border border-primary/20 bg-black/20 p-3"
        >
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-primary/10 p-2">
              {transaction.sender === "alice" ? (
                <ArrowUp className="h-4 w-4 text-red-500" />
              ) : (
                <ArrowDown className="h-4 w-4 text-green-500" />
              )}
            </div>
            <div>
              <div className="font-medium">
                {transaction.sender === "alice"
                  ? `Sent to ${transaction.receiver}`
                  : `Received from ${transaction.sender}`}
              </div>
              <div className="text-xs text-muted-foreground">{new Date(transaction.timestamp).toLocaleString()}</div>
            </div>
          </div>
          <div className="text-right">
            <div className={`font-medium ${transaction.sender === "alice" ? "text-red-500" : "text-green-500"}`}>
              {transaction.sender === "alice" ? "-" : "+"}${transaction.amount.toLocaleString()}
            </div>
            <div className="text-xs text-muted-foreground">Hash: {transaction.hash.substring(0, 10)}...</div>
          </div>
        </div>
      ))}
    </div>
  )
}
