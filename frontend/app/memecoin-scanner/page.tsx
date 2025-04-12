"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, Shield, TrendingUp, AlertTriangle, Twitter, MessageCircle, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { toast } from "@/components/ui/use-toast"

export default function MemecoinScannerPage() {
  const [contractAddress, setContractAddress] = useState("")
  const [chain, setChain] = useState("ethereum")
  const [isScanning, setIsScanning] = useState(false)
  const [scanComplete, setScanComplete] = useState(false)

  const handleScan = () => {
    if (!contractAddress) {
      toast({
        title: "Missing Contract Address",
        description: "Please enter a contract address to scan.",
        variant: "destructive",
      })
      return
    }

    setIsScanning(true)

    // Simulate scanning process
    setTimeout(() => {
      setIsScanning(false)
      setScanComplete(true)
      toast({
        title: "Scan Complete",
        description: "Memecoin analysis has been completed successfully.",
      })
    }, 3000)
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="MemeCoin Scanner" text="Analyze risk and potential of emerging memecoins" />

      <motion.div
        className="grid gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="border-primary/20 bg-black/40 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle>Scan MemeCoin</CardTitle>
            </div>
            <CardDescription>Enter a contract address to analyze</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="0x..."
                  className="bg-black/60 border-primary/20"
                  value={contractAddress}
                  onChange={(e) => setContractAddress(e.target.value)}
                />
              </div>
              <div>
                <select
                  className="h-10 rounded-md border border-primary/20 bg-black/60 px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  value={chain}
                  onChange={(e) => setChain(e.target.value)}
                >
                  <option value="ethereum">Ethereum</option>
                  <option value="bsc">Binance Smart Chain</option>
                  <option value="polygon">Polygon</option>
                  <option value="solana">Solana</option>
                </select>
              </div>
              <Button
                className="bg-gradient-to-r from-primary to-indigo-600 hover:from-primary/90 hover:to-indigo-600/90 text-white"
                onClick={handleScan}
                disabled={isScanning}
              >
                {isScanning ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                    Scanning...
                  </>
                ) : (
                  <>
                    <Search className="mr-2 h-4 w-4" />
                    Scan
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {scanComplete && (
          <motion.div
            className="grid gap-4 md:grid-cols-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="md:col-span-2 border-primary/20 bg-black/40 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Doge Unchained (DOGEUN)</CardTitle>
                    <CardDescription>{contractAddress || "0x7a32...8f93"}</CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-primary/20 bg-black/60 hover:bg-primary/10 hover:text-primary"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add to Watchlist
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="tokenomics">
                  <TabsList className="mb-4 bg-black/60">
                    <TabsTrigger value="tokenomics">Tokenomics</TabsTrigger>
                    <TabsTrigger value="audit">Audit Results</TabsTrigger>
                    <TabsTrigger value="sentiment">Social Sentiment</TabsTrigger>
                  </TabsList>
                  <TabsContent value="tokenomics">
                    <div className="space-y-4">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="rounded-lg border border-primary/20 bg-black/20 p-4">
                          <h3 className="text-sm font-medium">Total Supply</h3>
                          <p className="mt-1 text-lg font-bold">1,000,000,000,000</p>
                        </div>
                        <div className="rounded-lg border border-primary/20 bg-black/20 p-4">
                          <h3 className="text-sm font-medium">Circulating Supply</h3>
                          <p className="mt-1 text-lg font-bold">750,000,000,000</p>
                        </div>
                      </div>

                      <div className="rounded-lg border border-primary/20 bg-black/20 p-4">
                        <h3 className="text-sm font-medium">Token Distribution</h3>
                        <div className="mt-4 space-y-3">
                          <div>
                            <div className="mb-1 flex items-center justify-between text-sm">
                              <span>Liquidity Pool</span>
                              <span className="font-medium">40%</span>
                            </div>
                            <Progress value={40} className="h-2" />
                          </div>
                          <div>
                            <div className="mb-1 flex items-center justify-between text-sm">
                              <span>Team</span>
                              <span className="font-medium">15%</span>
                            </div>
                            <Progress value={15} className="h-2" />
                          </div>
                          <div>
                            <div className="mb-1 flex items-center justify-between text-sm">
                              <span>Marketing</span>
                              <span className="font-medium">20%</span>
                            </div>
                            <Progress value={20} className="h-2" />
                          </div>
                          <div>
                            <div className="mb-1 flex items-center justify-between text-sm">
                              <span>Community Rewards</span>
                              <span className="font-medium">25%</span>
                            </div>
                            <Progress value={25} className="h-2" />
                          </div>
                        </div>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="rounded-lg border border-primary/20 bg-black/20 p-4">
                          <h3 className="text-sm font-medium">Transaction Tax</h3>
                          <div className="mt-2 space-y-1 text-sm">
                            <div className="flex justify-between">
                              <span>Buy Tax</span>
                              <span>5%</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Sell Tax</span>
                              <span>7%</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Transfer Tax</span>
                              <span>2%</span>
                            </div>
                          </div>
                        </div>
                        <div className="rounded-lg border border-primary/20 bg-black/20 p-4">
                          <h3 className="text-sm font-medium">Liquidity</h3>
                          <div className="mt-2 space-y-1 text-sm">
                            <div className="flex justify-between">
                              <span>Locked</span>
                              <span className="text-green-500">Yes</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Lock Period</span>
                              <span>365 days</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Liquidity Amount</span>
                              <span>$450,000</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="audit">
                    <div className="space-y-4">
                      <div className="rounded-lg border border-primary/20 bg-black/20 p-4">
                        <div className="flex items-center gap-2">
                          <Shield className="h-5 w-5 text-green-500" />
                          <h3 className="font-medium">Contract Verified</h3>
                        </div>
                        <p className="mt-2 text-sm">
                          The smart contract code has been verified on Etherscan and matches the deployed bytecode.
                        </p>
                      </div>

                      <div className="rounded-lg border border-primary/20 bg-black/20 p-4">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="h-5 w-5 text-amber-500" />
                          <h3 className="font-medium">Potential Issues</h3>
                        </div>
                        <div className="mt-2 space-y-2">
                          <div className="rounded-md bg-black/40 p-2 text-sm">
                            <span className="font-medium">Ownership not renounced</span>
                            <p className="mt-1 text-muted-foreground">
                              The contract owner can modify parameters or pause trading.
                            </p>
                          </div>
                          <div className="rounded-md bg-black/40 p-2 text-sm">
                            <span className="font-medium">High transaction tax</span>
                            <p className="mt-1 text-muted-foreground">
                              The combined buy/sell tax is above average for memecoins.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-lg border border-primary/20 bg-black/20 p-4">
                        <h3 className="font-medium">Security Score</h3>
                        <div className="mt-4">
                          <div className="mb-1 flex items-center justify-between text-sm">
                            <span>Overall Security</span>
                            <span className="font-medium">72/100</span>
                          </div>
                          <Progress value={72} className="h-2" />
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="sentiment">
                    <div className="space-y-4">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="rounded-lg border border-primary/20 bg-black/20 p-4">
                          <div className="flex items-center gap-2">
                            <Twitter className="h-5 w-5 text-blue-400" />
                            <h3 className="font-medium">Twitter Sentiment</h3>
                          </div>
                          <div className="mt-4">
                            <div className="mb-1 flex items-center justify-between text-sm">
                              <span>Positive</span>
                              <span className="font-medium">68%</span>
                            </div>
                            <Progress value={68} className="h-2 bg-black/40" indicatorClassName="bg-green-500" />
                          </div>
                          <div className="mt-2">
                            <div className="mb-1 flex items-center justify-between text-sm">
                              <span>Neutral</span>
                              <span className="font-medium">22%</span>
                            </div>
                            <Progress value={22} className="h-2 bg-black/40" indicatorClassName="bg-blue-500" />
                          </div>
                          <div className="mt-2">
                            <div className="mb-1 flex items-center justify-between text-sm">
                              <span>Negative</span>
                              <span className="font-medium">10%</span>
                            </div>
                            <Progress value={10} className="h-2 bg-black/40" indicatorClassName="bg-red-500" />
                          </div>
                        </div>
                        <div className="rounded-lg border border-primary/20 bg-black/20 p-4">
                          <div className="flex items-center gap-2">
                            <MessageCircle className="h-5 w-5 text-green-500" />
                            <h3 className="font-medium">Telegram Activity</h3>
                          </div>
                          <div className="mt-4 space-y-1 text-sm">
                            <div className="flex justify-between">
                              <span>Members</span>
                              <span>12,450</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Active Users (24h)</span>
                              <span>3,280</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Messages (24h)</span>
                              <span>8,750</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Growth Rate (7d)</span>
                              <span className="text-green-500">+15%</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-lg border border-primary/20 bg-black/20 p-4">
                        <h3 className="font-medium">Community Growth</h3>
                        <div className="mt-2 space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span>Twitter Followers</span>
                            <span>28,500</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Discord Members</span>
                            <span>8,200</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Reddit Subscribers</span>
                            <span>5,400</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Unique Holders</span>
                            <span>4,850</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            <Card className="border-primary/20 bg-black/40 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>AI Trust Score</CardTitle>
                <CardDescription>Based on comprehensive analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center">
                  <motion.div
                    className="relative mb-4 h-36 w-36"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                      delay: 0.5,
                    }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-amber-500">68</div>
                        <div className="text-sm text-muted-foreground">out of 100</div>
                      </div>
                    </div>
                    <svg className="h-full w-full" viewBox="0 0 100 100">
                      <circle className="stroke-primary/10 fill-none" cx="50" cy="50" r="45" strokeWidth="10" />
                      <motion.circle
                        className="stroke-amber-500 fill-none"
                        cx="50"
                        cy="50"
                        r="45"
                        strokeWidth="10"
                        strokeDasharray="283"
                        initial={{ strokeDashoffset: 283 }}
                        animate={{ strokeDashoffset: 90 }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                        transform="rotate(-90 50 50)"
                      />
                    </svg>
                  </motion.div>
                  <div className="text-center text-sm font-medium text-amber-500">Moderate Risk</div>
                </div>

                <motion.div
                  className="mt-6 space-y-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <div>
                    <div className="mb-1 flex items-center justify-between text-sm">
                      <span>Rug Pull Risk</span>
                      <span className="font-medium text-amber-500">Medium</span>
                    </div>
                    <Progress value={45} className="h-2 bg-black/40" indicatorClassName="bg-amber-500" />
                  </div>
                  <div>
                    <div className="mb-1 flex items-center justify-between text-sm">
                      <span>Community Strength</span>
                      <span className="font-medium text-green-500">Strong</span>
                    </div>
                    <Progress value={80} className="h-2 bg-black/40" indicatorClassName="bg-green-500" />
                  </div>
                  <div>
                    <div className="mb-1 flex items-center justify-between text-sm">
                      <span>Liquidity Health</span>
                      <span className="font-medium text-green-500">Good</span>
                    </div>
                    <Progress value={75} className="h-2 bg-black/40" indicatorClassName="bg-green-500" />
                  </div>
                  <div>
                    <div className="mb-1 flex items-center justify-between text-sm">
                      <span>Team Transparency</span>
                      <span className="font-medium text-amber-500">Medium</span>
                    </div>
                    <Progress value={50} className="h-2 bg-black/40" indicatorClassName="bg-amber-500" />
                  </div>
                </motion.div>

                <motion.div
                  className="mt-6 rounded-lg border border-primary/20 bg-black/20 p-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                >
                  <h3 className="text-sm font-medium">AI Recommendation</h3>
                  <p className="mt-2 text-sm">
                    This token shows moderate potential with strong community engagement, but exercise caution due to
                    team anonymity and high transaction taxes. Consider small position sizing if investing.
                  </p>
                </motion.div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-gradient-to-r from-primary to-indigo-600 hover:from-primary/90 hover:to-indigo-600/90 text-white">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Trade DOGEUN
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </motion.div>
    </DashboardShell>
  )
}
