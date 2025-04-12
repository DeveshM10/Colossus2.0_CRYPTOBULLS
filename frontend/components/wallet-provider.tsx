"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface WalletContextType {
  isConnected: boolean
  address: string | null
  balance: string | null
  connect: (walletType: string) => Promise<void>
  disconnect: () => Promise<void>
  sendTransaction: (to: string, amount: string) => Promise<boolean>
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

export function useWallet() {
  const context = useContext(WalletContext)
  if (!context) {
    throw new Error("useWallet must be used within a WalletProvider")
  }
  return context
}

interface WalletProviderProps {
  children: ReactNode
}

export function WalletProvider({ children }: WalletProviderProps) {
  const [isConnected, setIsConnected] = useState(false)
  const [address, setAddress] = useState<string | null>(null)
  const [balance, setBalance] = useState<string | null>(null)

  // Check if wallet was previously connected
  useEffect(() => {
    const savedWalletData = localStorage.getItem("tradeai_wallet")
    if (savedWalletData) {
      try {
        const { address, balance } = JSON.parse(savedWalletData)
        setAddress(address)
        setBalance(balance)
        setIsConnected(true)
      } catch (error) {
        console.error("Failed to restore wallet connection:", error)
      }
    }
  }, [])

  // Mock wallet connection
  const connect = async (walletType: string): Promise<void> => {
    // Simulate connection delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Generate a random Ethereum address
    const mockAddress = "0x" + Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join("")

    // Set a mock balance
    const mockBalance = (Math.random() * 10).toFixed(4) + " ETH"

    setAddress(mockAddress)
    setBalance(mockBalance)
    setIsConnected(true)

    // Save to localStorage
    localStorage.setItem(
      "tradeai_wallet",
      JSON.stringify({
        address: mockAddress,
        balance: mockBalance,
        walletType,
      }),
    )
  }

  const disconnect = async (): Promise<void> => {
    setAddress(null)
    setBalance(null)
    setIsConnected(false)
    localStorage.removeItem("tradeai_wallet")
  }

  const sendTransaction = async (to: string, amount: string): Promise<boolean> => {
    // Simulate transaction delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // 90% success rate for demo purposes
    const success = Math.random() > 0.1

    if (success && balance) {
      // Update balance after transaction
      const currentBalance = Number.parseFloat(balance.split(" ")[0])
      const newBalance = Math.max(0, currentBalance - Number.parseFloat(amount)).toFixed(4) + " ETH"
      setBalance(newBalance)

      // Update localStorage
      localStorage.setItem(
        "tradeai_wallet",
        JSON.stringify({
          address,
          balance: newBalance,
        }),
      )
    }

    return success
  }

  return (
    <WalletContext.Provider
      value={{
        isConnected,
        address,
        balance,
        connect,
        disconnect,
        sendTransaction,
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}
