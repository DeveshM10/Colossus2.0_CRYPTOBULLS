"use client"

import { motion } from "framer-motion"
import { X, ArrowUp, ArrowDown, AlertTriangle, Info, TrendingUp, BarChart3, DollarSign } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { TradingViewChart } from "@/components/trading-view-chart"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

interface AssetDetailModalProps {
  asset: any
  marketType: "stocks" | "crypto" | "memecoins"
  onClose: () => void
  onTrade: () => void
}

export function AssetDetailModal({ asset, marketType, onClose, onTrade }: AssetDetailModalProps) {
  const getRiskColor = (risk: number) => {
    if (risk < 30) return "bg-green-500"
    if (risk < 70) return "bg-yellow-500"
    return "bg-red-500"
  }

  const getRiskLabel = (risk: number) => {
    if (risk < 30) return "Low"
    if (risk < 70) return "Medium"
    return "High"
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="w-full max-w-6xl max-h-[90vh] overflow-auto"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
      >
        <Card className="border-primary/20 bg-black/90 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <CardTitle className="text-2xl">{asset.name}</CardTitle>
                <Badge variant="outline" className="border-primary/20 bg-black/60">
                  {asset.symbol}
                </Badge>
                <Badge variant="outline" className="border-primary/20 bg-black/60">
                  {marketType === "stocks" ? "Stock" : marketType === "crypto" ? "Crypto" : "Memecoin"}
                </Badge>
              </div>
              <CardDescription className="mt-2">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <span className="text-xl font-bold">${asset.price.toLocaleString()}</span>
                    <span
                      className={`flex items-center text-sm ${asset.change >= 0 ? "text-green-500" : "text-red-500"}`}
                    >
                      {asset.change >= 0 ? (
                        <ArrowUp className="h-3 w-3 mr-1" />
                      ) : (
                        <ArrowDown className="h-3 w-3 mr-1" />
                      )}
                      {Math.abs(asset.change)}%
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Risk:</span>
                    <div className="flex items-center gap-2">
                      <Progress
                        value={asset.riskLevel}
                        className="h-2 w-20"
                        indicatorClassName={getRiskColor(asset.riskLevel)}
                      />
                      <span className={`text-xs ${getRiskColor(asset.riskLevel).replace("bg-", "text-")}`}>
                        {getRiskLabel(asset.riskLevel)}
                      </span>
                    </div>
                  </div>
                </div>
              </CardDescription>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>

          <CardContent className="space-y-6">
            <Tabs defaultValue="chart" className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-black/60">
                <TabsTrigger value="chart">Chart</TabsTrigger>
                <TabsTrigger value="info">Information</TabsTrigger>
                <TabsTrigger value="news">News</TabsTrigger>
              </TabsList>

              <TabsContent value="chart" className="pt-4">
                <div className="h-[500px] w-full">
                  <TradingViewChart symbol={asset.symbol} type={marketType} />
                </div>
              </TabsContent>

              <TabsContent value="info" className="pt-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Overview</h3>
                    <p className="text-muted-foreground">
                      {asset.description ||
                        `${asset.name} (${asset.symbol}) is a ${marketType === "stocks" ? "publicly traded company" : marketType === "crypto" ? "cryptocurrency" : "memecoin"} with a market capitalization of ${asset.marketCap.toLocaleString()}.`}
                    </p>

                    <div className="grid grid-cols-2 gap-4 pt-2">
                      <div>
                        <h4 className="text-sm font-medium">Market Cap</h4>
                        <p className="text-lg">${asset.marketCap.toLocaleString()}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">Volume (24h)</h4>
                        <p className="text-lg">${(asset.marketCap * 0.05).toLocaleString()}</p>
                      </div>

                      {marketType !== "stocks" && (
                        <>
                          <div>
                            <h4 className="text-sm font-medium">Circulating Supply</h4>
                            <p className="text-lg">
                              {(asset.marketCap / asset.price).toLocaleString()} {asset.symbol}
                            </p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium">Max Supply</h4>
                            <p className="text-lg">
                              {marketType === "crypto"
                                ? asset.symbol === "BTC"
                                  ? "21,000,000 BTC"
                                  : ((asset.marketCap / asset.price) * 1.5).toLocaleString() + " " + asset.symbol
                                : "Unlimited"}
                            </p>
                          </div>
                        </>
                      )}

                      {marketType === "stocks" && (
                        <>
                          <div>
                            <h4 className="text-sm font-medium">P/E Ratio</h4>
                            <p className="text-lg">{(10 + Math.random() * 30).toFixed(2)}</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium">Dividend Yield</h4>
                            <p className="text-lg">{(Math.random() * 5).toFixed(2)}%</p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Key Metrics</h3>

                    <div className="space-y-3">
                      <div>
                        <div className="flex items-center justify-between text-sm">
                          <span>All Time High</span>
                          <span className="font-medium">${(asset.price * (1 + Math.random() * 0.5)).toFixed(2)}</span>
                        </div>
                        <Progress value={80} className="h-1 mt-1" />
                      </div>

                      <div>
                        <div className="flex items-center justify-between text-sm">
                          <span>All Time Low</span>
                          <span className="font-medium">${(asset.price * (1 - Math.random() * 0.8)).toFixed(2)}</span>
                        </div>
                        <Progress value={30} className="h-1 mt-1" />
                      </div>

                      <div>
                        <div className="flex items-center justify-between text-sm">
                          <span>Volatility (30d)</span>
                          <span className="font-medium">{(5 + Math.random() * 20).toFixed(2)}%</span>
                        </div>
                        <Progress value={50} className="h-1 mt-1" />
                      </div>

                      {marketType !== "stocks" && (
                        <div>
                          <div className="flex items-center justify-between text-sm">
                            <span>Developer Activity</span>
                            <span className="font-medium">{marketType === "crypto" ? "High" : "Low"}</span>
                          </div>
                          <Progress value={marketType === "crypto" ? 80 : 20} className="h-1 mt-1" />
                        </div>
                      )}

                      {marketType === "memecoins" && (
                        <div>
                          <div className="flex items-center justify-between text-sm">
                            <span>Community Score</span>
                            <span className="font-medium">{(Math.random() * 10).toFixed(1)}/10</span>
                          </div>
                          <Progress value={70} className="h-1 mt-1" />
                        </div>
                      )}
                    </div>

                    {marketType === "memecoins" && (
                      <div className="rounded-lg border border-yellow-500/30 bg-yellow-500/10 p-3 mt-4">
                        <div className="flex items-start gap-2">
                          <AlertTriangle className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <h4 className="font-medium text-yellow-500">High Risk Investment</h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              This memecoin has high volatility and risk. Only invest what you can afford to lose.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="analysis" className="pt-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-primary" />
                      <h3 className="text-lg font-medium">Technical Analysis</h3>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="rounded-lg border border-primary/20 bg-black/20 p-3 text-center">
                        <h4 className="text-sm text-muted-foreground">RSI (14)</h4>
                        <p className={`text-lg font-medium ${Math.random() > 0.5 ? "text-green-500" : "text-red-500"}`}>
                          {(30 + Math.random() * 40).toFixed(2)}
                        </p>
                      </div>

                      <div className="rounded-lg border border-primary/20 bg-black/20 p-3 text-center">
                        <h4 className="text-sm text-muted-foreground">MACD</h4>
                        <p className={`text-lg font-medium ${Math.random() > 0.5 ? "text-green-500" : "text-red-500"}`}>
                          {(Math.random() * 2 - 1).toFixed(2)}
                        </p>
                      </div>

                      <div className="rounded-lg border border-primary/20 bg-black/20 p-3 text-center">
                        <h4 className="text-sm text-muted-foreground">MA (50/200)</h4>
                        <p className={`text-lg font-medium ${Math.random() > 0.5 ? "text-green-500" : "text-red-500"}`}>
                          {Math.random() > 0.5 ? "Bullish" : "Bearish"}
                        </p>
                      </div>
                    </div>

                    <div className="rounded-lg border border-primary/20 bg-black/20 p-4">
                      <h4 className="text-sm font-medium mb-3">Moving Averages</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>MA 20</span>
                          <span className="font-medium">
                            ${(asset.price * (1 + (Math.random() * 0.1 - 0.05))).toFixed(2)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span>MA 50</span>
                          <span className="font-medium">
                            ${(asset.price * (1 + (Math.random() * 0.15 - 0.075))).toFixed(2)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span>MA 100</span>
                          <span className="font-medium">
                            ${(asset.price * (1 + (Math.random() * 0.2 - 0.1))).toFixed(2)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span>MA 200</span>
                          <span className="font-medium">
                            ${(asset.price * (1 + (Math.random() * 0.3 - 0.15))).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5 text-primary" />
                      <h3 className="text-lg font-medium">AI Prediction</h3>
                    </div>

                    <div className="rounded-lg border border-primary/20 bg-black/20 p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-sm font-medium">Price Forecast (30 Days)</h4>
                        <Badge variant="outline" className="border-primary/20 bg-black/60">
                          AI Generated
                        </Badge>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <div className="flex items-center justify-between text-sm">
                            <span>Bullish Scenario</span>
                            <span className="font-medium text-green-500">
                              ${(asset.price * (1 + 0.1 + Math.random() * 0.2)).toFixed(2)}
                            </span>
                          </div>
                          <Progress value={85} className="h-1 mt-1" indicatorClassName="bg-green-500" />
                        </div>

                        <div>
                          <div className="flex items-center justify-between text-sm">
                            <span>Base Scenario</span>
                            <span className="font-medium text-blue-500">
                              ${(asset.price * (1 + Math.random() * 0.1)).toFixed(2)}
                            </span>
                          </div>
                          <Progress value={50} className="h-1 mt-1" indicatorClassName="bg-blue-500" />
                        </div>

                        <div>
                          <div className="flex items-center justify-between text-sm">
                            <span>Bearish Scenario</span>
                            <span className="font-medium text-red-500">
                              ${(asset.price * (1 - Math.random() * 0.15)).toFixed(2)}
                            </span>
                          </div>
                          <Progress value={25} className="h-1 mt-1" indicatorClassName="bg-red-500" />
                        </div>
                      </div>

                      <div className="mt-4 text-sm text-muted-foreground">
                        <p>
                          Our AI model predicts a {Math.random() > 0.5 ? "positive" : "mixed"} outlook for{" "}
                          {asset.symbol} over the next 30 days based on technical indicators, market sentiment, and
                          historical patterns.
                        </p>
                      </div>
                    </div>

                    <div className="rounded-lg border border-primary/20 bg-black/20 p-4">
                      <h4 className="text-sm font-medium mb-3">Risk Assessment</h4>

                      <div className="space-y-3">
                        <div>
                          <div className="flex items-center justify-between text-sm">
                            <span>Volatility Risk</span>
                            <span className="font-medium">
                              {marketType === "stocks" ? "Low" : marketType === "crypto" ? "Medium" : "High"}
                            </span>
                          </div>
                          <Progress
                            value={marketType === "stocks" ? 30 : marketType === "crypto" ? 60 : 90}
                            className="h-1 mt-1"
                            indicatorClassName={
                              marketType === "stocks"
                                ? "bg-green-500"
                                : marketType === "crypto"
                                  ? "bg-yellow-500"
                                  : "bg-red-500"
                            }
                          />
                        </div>

                        <div>
                          <div className="flex items-center justify-between text-sm">
                            <span>Liquidity Risk</span>
                            <span className="font-medium">
                              {marketType === "stocks" ? "Low" : marketType === "crypto" ? "Medium" : "High"}
                            </span>
                          </div>
                          <Progress
                            value={marketType === "stocks" ? 20 : marketType === "crypto" ? 50 : 80}
                            className="h-1 mt-1"
                            indicatorClassName={
                              marketType === "stocks"
                                ? "bg-green-500"
                                : marketType === "crypto"
                                  ? "bg-yellow-500"
                                  : "bg-red-500"
                            }
                          />
                        </div>

                        <div>
                          <div className="flex items-center justify-between text-sm">
                            <span>Regulatory Risk</span>
                            <span className="font-medium">
                              {marketType === "stocks" ? "Low" : marketType === "crypto" ? "Medium" : "High"}
                            </span>
                          </div>
                          <Progress
                            value={marketType === "stocks" ? 10 : marketType === "crypto" ? 60 : 90}
                            className="h-1 mt-1"
                            indicatorClassName={
                              marketType === "stocks"
                                ? "bg-green-500"
                                : marketType === "crypto"
                                  ? "bg-yellow-500"
                                  : "bg-red-500"
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="news" className="pt-4">
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="rounded-lg border border-primary/20 bg-black/20 p-4">
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-16 rounded bg-primary/20 flex items-center justify-center flex-shrink-0">
                          <Info className="h-8 w-8 text-primary/60" />
                        </div>
                        <div>
                          <h4 className="font-medium">
                            {marketType === "stocks"
                              ? `${asset.name} Reports Strong Q${Math.floor(Math.random() * 4) + 1} Earnings, Exceeds Expectations`
                              : marketType === "crypto"
                                ? `${asset.name} Announces Major Partnership with Financial Institution`
                                : `${asset.name} Gains Popularity After Celebrity Endorsement`}
                          </h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            {marketType === "stocks"
                              ? `${asset.name} reported quarterly earnings that exceeded analyst expectations, with revenue growing by ${(Math.random() * 20 + 5).toFixed(1)}% year-over-year.`
                              : marketType === "crypto"
                                ? `${asset.name} has formed a strategic partnership that will enable broader adoption and new use cases for the cryptocurrency.`
                                : `${asset.name} saw a surge in trading volume after a popular social media influencer mentioned the token in a recent post.`}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-xs text-muted-foreground">
                              {new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                            </span>
                            <Badge variant="outline" className="text-xs border-primary/20 bg-black/60">
                              {marketType === "stocks" ? "Earnings" : "News"}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>

          <CardFooter className="flex justify-between">
            <Button variant="outline" className="border-primary/20 bg-black/60" onClick={onClose}>
              Close
            </Button>
            <Button
              className="bg-gradient-to-r from-primary to-indigo-600 hover:from-primary/90 hover:to-indigo-600/90"
              onClick={onTrade}
            >
              <DollarSign className="mr-2 h-4 w-4" />
              Trade {asset.symbol}
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </motion.div>
  )
}
