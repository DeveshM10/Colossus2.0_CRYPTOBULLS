"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { BarChart3, Coins, LineChart, PieChart, TrendingUp } from "lucide-react"
import { ethers } from "ethers"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { PerformanceChart } from "@/components/performance-chart"
import { PredictionCard } from "@/components/prediction-card"
import { RecentTransactions } from "@/components/recent-transactions"
import { AssetAllocation } from "@/components/asset-allocation"
import { BlockchainService, type Transaction } from "@/lib/blockchain-service"

export default function DashboardPage() {
  const [ledger, setLedger] = useState<Transaction[]>([])
  const [totalInvested, setTotalInvested] = useState(0)
  const [totalTransactions, setTotalTransactions] = useState(0)
  const [ethBalance, setEthBalance] = useState<string | null>(null)
  const [isLoadingBalance, setIsLoadingBalance] = useState(true)
  const [walletAddress, setWalletAddress] = useState<string | null>(null)
  const [totalPL, setTotalPL] = useState<number>(0)  // Today's P/L
  const [totalAssets, setTotalAssets] = useState<number>(0)  // Total assets
  const [activeTrades, setActiveTrades] = useState<number>(0)  // Active trades

  // Fetch MetaMask balance
  useEffect(() => {
    const fetchMetaMaskData = async () => {
      try {
        if (!window.ethereum) throw new Error("MetaMask not installed")
        
        // Request account access if needed
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
        setWalletAddress(accounts[0])

        // Switch to Sepolia network
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0xaa36a7' }] // Sepolia chain ID
        })

        const provider = new ethers.BrowserProvider(window.ethereum)
        const balanceWei = await provider.getBalance(accounts[0])
        const balanceEth = ethers.formatEther(balanceWei)
        
        setEthBalance(Number(balanceEth).toFixed(4))
      } catch (error) {
        console.error("Error fetching MetaMask data:", error)
        setEthBalance("0.0000") // Fallback value
      } finally {
        setIsLoadingBalance(false)
      }
    }

    fetchMetaMaskData()

    // Listen for account changes
    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length > 0) {
        setWalletAddress(accounts[0])
        fetchMetaMaskData()
      }
    }

    window.ethereum?.on('accountsChanged', handleAccountsChanged)

    return () => {
      window.ethereum?.removeListener('accountsChanged', handleAccountsChanged)
    }
  }, [])

  // Fetch blockchain data
  useEffect(() => {
    const fetchBlockchainData = async () => {
      try {
        const ledgerData = await BlockchainService.getLedger()
        const investedAmount = await BlockchainService.getTotalInvestedAmount()
        const txCount = await BlockchainService.getTotalTransactions()
        const activeTradesCount = await BlockchainService.getActiveTrades()
        
        // Calculate P/L (Example: Subtract total invested from total value)
        const todayPL = await BlockchainService.getTodaysPL()

        setLedger(ledgerData)
        setTotalInvested(investedAmount)
        setTotalTransactions(txCount)
        setTotalPL(todayPL)  // Set Today's P/L dynamically
        setTotalAssets(txCount)  // Assuming assets = number of transactions for simplicity
        setActiveTrades(activeTradesCount)  // Set active trades dynamically
      } catch (error) {
        console.error("Error fetching blockchain data:", error)
      }
    }

    fetchBlockchainData()
    const interval = setInterval(fetchBlockchainData, 10000)
    return () => clearInterval(interval)
  }, [])

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Dashboard" text="Welcome back! Here's an overview of your portfolio." />

      <motion.div
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Total Portfolio Value */}
        <motion.div variants={item}>
          <Card className="border-primary/20 bg-black/40 backdrop-blur-sm hover:shadow-[0_0_15px_rgba(59,130,246,0.2)] transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Portfolio Value</CardTitle>
              <PieChart className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {isLoadingBalance ? (
                  <span className="text-muted-foreground">Loading...</span>
                ) : (
                  `${ethBalance} ETH`
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                {walletAddress ? (
                  <span className="text-green-500">Connected: {`${walletAddress.substring(0, 6)}...${walletAddress.substring(38)}`}</span>
                ) : (
                  <span className="text-yellow-500">Connect MetaMask</span>
                )}
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Today's P/L */}
        <motion.div variants={item}>
          <Card className="border-primary/20 bg-black/40 backdrop-blur-sm hover:shadow-[0_0_15px_rgba(59,130,246,0.2)] transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's P/L</CardTitle>
              <LineChart className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">
                ${totalPL.toFixed(2)}
              </div>
              <p className="text-xs text-muted-foreground">
                <span className={totalPL >= 0 ? "text-green-500" : "text-red-500"}>
                  {totalPL >= 0 ? `+${totalPL.toFixed(2)}` : totalPL.toFixed(2)}
                </span> from yesterday
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Assets */}
        <motion.div variants={item}>
          <Card className="border-primary/20 bg-black/40 backdrop-blur-sm hover:shadow-[0_0_15px_rgba(59,130,246,0.2)] transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Assets</CardTitle>
              <Coins className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalAssets}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500">+{totalAssets}</span> new assets this month
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Active Trades */}
        <motion.div variants={item}>
          <Card className="border-primary/20 bg-black/40 backdrop-blur-sm hover:shadow-[0_0_15px_rgba(59,130,246,0.2)] transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Trades</CardTitle>
              <TrendingUp className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeTrades}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-yellow-500">{activeTrades} active trades</span> in progress
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <motion.div
          className="col-span-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="border-primary/20 bg-black/40 backdrop-blur-sm h-full">
            <CardHeader>
              <CardTitle>Portfolio Performance</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <PerformanceChart showOnlyBenchmark={true} />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          className="col-span-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="border-primary/20 bg-black/40 backdrop-blur-sm h-full">
            <CardHeader>
              <CardTitle>AI Prediction of the Day</CardTitle>
              <CardDescription>Based on market analysis and historical data</CardDescription>
            </CardHeader>
            <CardContent>
              <PredictionCard />
            </CardContent>
          </Card>
        </motion.div>
      </div>

{/* Apple Prediction Card */}
      <motion.div
        className="mt-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card className="border-primary/20 bg-black/40 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>AI Stock Prediction</CardTitle>
            <CardDescription>Based on market analysis and historical data</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1 space-y-4">
                <div>
                  <h3 className="text-xl font-bold">Apple (AAPL)</h3>
                  <p className="text-sm text-red-500 font-medium">Predicted to decline 5-7% in next 10 days</p>
                </div>
                <p className="text-sm text-muted-foreground">
                  Our AI model has identified a potential downtrend for Apple due to a newly imposed U.S. tariffs on Chinese imports, including a 145% duty that could significantly increase iPhone prices. This escalation in the U.S.-China trade war is expected to reduce demand and profitability for Apple products.
                </p>
                <div className="grid grid-cols-3 gap-4 pt-2">
                  <div>
                    <p className="text-xs text-muted-foreground">Confidence Score</p>
                    <p className="text-lg font-bold text-primary">84%</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Current Price</p>
                    <p className="text-lg font-bold">$198.20</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Target Price</p>
                    <p className="text-lg font-bold text-red-500">$189.55</p>
                  </div>
                </div>
              </div>
              <div className="flex-1 flex items-center justify-center">
                <div className="w-full max-w-xs">
                  <div className="rounded-full bg-primary/10 p-6 aspect-square flex items-center justify-center relative">
                    <div className="absolute inset-0 rounded-full border-4 border-primary/20"></div>
                    <div
                      className="absolute top-0 right-0 bottom-0 left-0 rounded-full border-4 border-primary"
                      style={{
                        clipPath: "polygon(0 0, 82% 0, 82% 100%, 0 100%)",
                        transform: "rotate(-90deg)",
                        transformOrigin: "center",
                      }}
                    ></div>
                    <div className="text-center">
                      <div className="text-3xl font-bold">84%</div>
                      <div className="text-xs text-muted-foreground">Confidence</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <Button className="w-full bg-primary text-white">Trade Apple Now</Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </DashboardShell>
  )
}