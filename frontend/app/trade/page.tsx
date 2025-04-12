"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowDown, ArrowUp, Wallet, Search, Info } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { TradingViewChart } from "@/components/trading-view-chart"
import { useWallet } from "@/components/wallet-provider"
import { toast } from "@/components/ui/use-toast"
import { ConnectWalletButton } from "@/components/connect-wallet-button"
import { AssetDetailModal } from "@/components/asset-detail-modal"
import { PaymentSuccessAnimation } from "@/components/payment-success-animation"
import { RegulationCheckButton } from "@/components/regulation-check-button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BlockchainService } from "@/lib/blockchain-service"

// Mock data for stocks, cryptocoins, and memecoins
import { stocksData, cryptoData, memecoinsData } from "@/lib/market-data"

export default function TradePage() {
  const { isConnected, balance } = useWallet()
  const [orderType, setOrderType] = useState<"market" | "limit">("market")
  const [tradeAction, setTradeAction] = useState<"buy" | "sell">("buy")
  const [selectedAsset, setSelectedAsset] = useState("")
  const [amount, setAmount] = useState("")
  const [limitPrice, setLimitPrice] = useState("")
  const [isAdvanced, setIsAdvanced] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [marketType, setMarketType] = useState<"stocks" | "crypto" | "memecoins">("stocks")
  const [searchQuery, setSearchQuery] = useState("")
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [selectedAssetDetail, setSelectedAssetDetail] = useState<any>(null)
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false)
  const [filteredAssets, setFilteredAssets] = useState<any[]>([])

  // Set initial data based on market type
  useEffect(() => {
    let data: any[] = []
    switch (marketType) {
      case "stocks":
        data = stocksData
        break
      case "crypto":
        data = cryptoData
        break
      case "memecoins":
        data = memecoinsData
        break
    }
    setFilteredAssets(data)

    // Reset selected asset when changing market type
    setSelectedAsset("")
    setSelectedAssetDetail(null)
  }, [marketType])

  // Filter assets based on search query
  useEffect(() => {
    let data: any[] = []
    switch (marketType) {
      case "stocks":
        data = stocksData
        break
      case "crypto":
        data = cryptoData
        break
      case "memecoins":
        data = memecoinsData
        break
    }

    if (searchQuery) {
      data = data.filter(
        (asset) =>
          asset.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
          asset.name.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    setFilteredAssets(data)
  }, [searchQuery, marketType])

  const handleAssetSelect = (asset: any) => {
    setSelectedAsset(asset.symbol)
    setSelectedAssetDetail(asset)
    setShowDetailModal(true)
  }

  const handleExecuteTrade = async () => {
    if (!isConnected) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet to execute trades.",
        variant: "destructive",
      })
      return
    }

    if (!selectedAsset) {
      toast({
        title: "No Asset Selected",
        description: "Please select an asset to trade.",
        variant: "destructive",
      })
      return
    }

    if (!amount || Number.parseFloat(amount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount to trade.",
        variant: "destructive",
      })
      return
    }

    if (orderType === "limit" && (!limitPrice || Number.parseFloat(limitPrice) <= 0)) {
      toast({
        title: "Invalid Limit Price",
        description: "Please enter a valid limit price.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      // Create a blockchain transaction
      const transaction = BlockchainService.createTransaction(
        tradeAction === "buy" ? "exchange" : "alice",
        tradeAction === "buy" ? "alice" : "exchange",
        Number.parseFloat(amount) * (selectedAssetDetail?.price || 0),
        "password", // In a real app, this would be securely handled
      )

      if (!transaction) {
        throw new Error("Transaction failed")
      }

      // Show payment success animation
      setShowPaymentSuccess(true)

      // Hide animation after 3 seconds
      setTimeout(() => {
        setShowPaymentSuccess(false)
      }, 3000)

      // For demo purposes, we'll just show a success message
      toast({
        title: "Trade Executed Successfully",
        description: `${tradeAction === "buy" ? "Bought" : "Sold"} ${amount} ${selectedAsset} at ${orderType === "market" ? "market price" : `${limitPrice}`}.`,
      })
    } catch (error) {
      toast({
        title: "Trade Failed",
        description: "There was an error executing your trade. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const getRiskColor = (risk: number) => {
    if (risk < 30) return "bg-green-500"
    if (risk < 70) return "bg-yellow-500"
    return "bg-red-500"
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Trade" text="Execute trades across multiple asset classes">
        <div className="flex items-center gap-2">
          <RegulationCheckButton />
        </div>
      </DashboardHeader>

      {/* Market Type Selector */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <Tabs
          defaultValue="stocks"
          className="w-full mb-6"
          onValueChange={(value) => setMarketType(value as "stocks" | "crypto" | "memecoins")}
        >
          <TabsList className="grid w-full grid-cols-3 bg-black/60 p-1">
            <TabsTrigger value="stocks" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              Stock Market
            </TabsTrigger>
            <TabsTrigger value="crypto" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              Cryptocurrencies
            </TabsTrigger>
            <TabsTrigger value="memecoins" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              Memecoins
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </motion.div>

      {/* Search and Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="mb-6"
      >
        <Card className="border-primary/20 bg-black/40 backdrop-blur-sm">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder={`Search ${marketType === "stocks" ? "stocks" : marketType === "crypto" ? "cryptocurrencies" : "memecoins"}...`}
                  className="pl-10 bg-black/60 border-primary/20 w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Asset List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="mb-6"
      >
        <Card className="border-primary/20 bg-black/40 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle>
              {marketType === "stocks"
                ? "Top Stocks"
                : marketType === "crypto"
                  ? "Top Cryptocurrencies"
                  : "Top Memecoins"}
            </CardTitle>
            <CardDescription>
              {filteredAssets.length}{" "}
              {marketType === "stocks" ? "stocks" : marketType === "crypto" ? "cryptocurrencies" : "memecoins"} found
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border border-primary/20">
              <Table>
                <TableHeader className="bg-black/60">
                  <TableRow>
                    <TableHead className="w-[50px]">#</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>24h Change</TableHead>
                    <TableHead className="hidden md:table-cell">Market Cap</TableHead>
                    <TableHead className="hidden md:table-cell">Risk Level</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAssets.slice(0, 10).map((asset, index) => (
                    <TableRow
                      key={asset.symbol}
                      className="cursor-pointer hover:bg-primary/5"
                      onClick={() => handleAssetSelect(asset)}
                    >
                      <TableCell className="font-medium">{index + 1}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                            {asset.symbol.substring(0, 1)}
                          </div>
                          <div>
                            <div className="font-medium">{asset.name}</div>
                            <div className="text-xs text-muted-foreground">{asset.symbol}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">${asset.price.toLocaleString()}</TableCell>
                      <TableCell>
                        <span className={`flex items-center ${asset.change >= 0 ? "text-green-500" : "text-red-500"}`}>
                          {asset.change >= 0 ? (
                            <ArrowUp className="h-3 w-3 mr-1" />
                          ) : (
                            <ArrowDown className="h-3 w-3 mr-1" />
                          )}
                          {Math.abs(asset.change)}%
                        </span>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">${asset.marketCap.toLocaleString()}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="flex items-center gap-2">
                          <Progress
                            value={asset.riskLevel}
                            className="h-2 w-20"
                            indicatorClassName={getRiskColor(asset.riskLevel)}
                          />
                          <span className="text-xs">{asset.riskLevel}%</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-primary/20 bg-black/60 hover:bg-primary/20"
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedAsset(asset.symbol)
                            setSelectedAssetDetail(asset)
                          }}
                        >
                          Trade
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {filteredAssets.length === 0 && (
              <div className="py-24 text-center">
                <Info className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                <h3 className="mt-4 text-lg font-semibold">No assets found</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Try adjusting your search or filters to find what you're looking for.
                </p>
              </div>
            )}

            {filteredAssets.length > 10 && (
              <div className="mt-4 text-center">
                <Button variant="outline" className="border-primary/20 bg-black/60">
                  Load More
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
{selectedAsset && selectedAssetDetail && (
  <div className="grid gap-6 lg:grid-cols-3">
    {/* Left Column - Chart (Remove this part) */}
    {/* <motion.div
      className="lg:col-span-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="border-primary/20 bg-black/40 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle className="text-xl">
              {selectedAssetDetail.name} ({selectedAssetDetail.symbol})
            </CardTitle>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-2xl font-bold">${selectedAssetDetail.price.toLocaleString()}</span>
              <span
                className={`flex items-center text-sm ${selectedAssetDetail.change >= 0 ? "text-green-500" : "text-red-500"}`}
              >
                {selectedAssetDetail.change >= 0 ? (
                  <ArrowUp className="h-3 w-3 mr-1" />
                ) : (
                  <ArrowDown className="h-3 w-3 mr-1" />
                )}
                {Math.abs(selectedAssetDetail.change)}%
              </span>
              <Badge variant="outline" className="ml-2 border-primary/20 bg-black/60">
                {marketType === "stocks" ? "Stock" : marketType === "crypto" ? "Crypto" : "Memecoin"}
              </Badge>
            </div>
          </div>
          <div className="flex gap-2">
            <Select defaultValue="1D">
              <SelectTrigger className="w-[80px] bg-black/60 border-primary/20">
                <SelectValue placeholder="Timeframe" />
              </SelectTrigger>
              <SelectContent className="bg-black/90 border-primary/20">
                <SelectItem value="1H">1H</SelectItem>
                <SelectItem value="4H">4H</SelectItem>
                <SelectItem value="1D">1D</SelectItem>
                <SelectItem value="1W">1W</SelectItem>
                <SelectItem value="1M">1M</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="h-[400px] w-full">
            <TradingViewChart symbol={selectedAssetDetail.symbol} type={marketType} />
          </div>
        </CardContent>
      </Card>
    </motion.div> */}

    {/* Right Column - Trade Form */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="border-primary/20 bg-black/40 backdrop-blur-sm">
        {/* ... rest of the trade form code ... */}
      </Card>
    </motion.div>
  </div>
)}

      {/* Asset Detail Modal */}
      <AnimatePresence>
        {showDetailModal && selectedAssetDetail && (
          <AssetDetailModal
            asset={selectedAssetDetail}
            marketType={marketType}
            onClose={() => setShowDetailModal(false)}
            onTrade={() => setShowDetailModal(false)}
          />
        )}
      </AnimatePresence>

      {/* Payment Success Animation */}
      <AnimatePresence>
        {showPaymentSuccess && <PaymentSuccessAnimation onComplete={() => setShowPaymentSuccess(false)} />}
      </AnimatePresence>
    </DashboardShell>
  )
}
