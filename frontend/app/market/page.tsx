import { Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { MarketChart } from "@/components/market-chart"
import { CoinStats } from "@/components/coin-stats"
import { CoinChart } from "@/components/coin-chart"
import { MarketStats } from "@/components/market-stats"
import { MarketNews } from "@/components/market-news"

export default function MarketPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Market Analyzer" text="Search and analyze any stock, cryptocurrency, or memecoin" />
      <div className="grid gap-4">

        <div className="grid gap-4 md:grid-cols-7">
          <Card className="col-span-5">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Bitcoin (BTC)</CardTitle>
                  <CardDescription>The world's first cryptocurrency</CardDescription>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">$42,568.23</div>
                  <div className="text-sm text-green-500">+2.34% (24h)</div>
                </div>
              </div>

            </CardHeader>
            <CardContent>
              <Tabs defaultValue="price">
                <TabsList className="mb-4">
                  <TabsTrigger value="price">Price</TabsTrigger>
                  <TabsTrigger value="volume">Volume</TabsTrigger>
                  <TabsTrigger value="ma">Moving Avg</TabsTrigger>
                </TabsList>                                                                                                                                                                                                                                                                                                                                                                   
                <TabsContent value="price" className="h-[400px]">
                  <CoinChart type="price" />
                </TabsContent>
                <TabsContent value="volume" className="h-[400px]">
                  <CoinChart type="volume" />
                </TabsContent>
                <TabsContent value="ma" className="h-[400px]">
                  <CoinChart type="ma" />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Market Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <CoinStats />
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-7">
          <Card className="col-span-5">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Apple (APPL)</CardTitle>
                  <CardDescription>The world's most valued company</CardDescription>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">$196.8</div>
                  <div className="text-sm text-green-500">+3.34% (24h)</div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="price">
                <TabsList className="mb-4">
                  <TabsTrigger value="price">Price</TabsTrigger>
                  <TabsTrigger value="volume">Volume</TabsTrigger>
                  <TabsTrigger value="ma">Moving Avg</TabsTrigger>
                </TabsList>
                <TabsContent value="price" className="h-[400px]">
                  <MarketChart type="price" />
                </TabsContent>
                <TabsContent value="volume" className="h-[400px]">
                  <MarketChart type="volume" />
                </TabsContent>
                <TabsContent value="ma" className="h-[400px]">
                  <MarketChart type="ma" />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Market Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <MarketStats />
            </CardContent>
          </Card>
        </div>        

        <Card>
          <CardHeader>
            <CardTitle>Market News & Analysis</CardTitle>
            <CardDescription>Latest news and insights for Bitcoin</CardDescription>
          </CardHeader>
          <CardContent>
            <MarketNews />
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  )
}
