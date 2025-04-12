// "use client"

// import { useState, useEffect } from "react"
// import { motion } from "framer-motion"
// import { BarChart3, LineChart, PieChart, TrendingUp } from "lucide-react"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { DashboardHeader } from "@/components/dashboard-header"
// import { DashboardShell } from "@/components/dashboard-shell"
// import { AssetAllocation } from "@/components/asset-allocation"
// import { PerformanceChart } from "@/components/performance-chart"
// import { BlockchainService, type Transaction } from "@/lib/blockchain-service"

// export default function PortfolioPage() {
//   const [timeframe, setTimeframe] = useState("1Y")
//   const [ledger, setLedger] = useState<Transaction[]>([])
//   const [totalInvested, setTotalInvested] = useState(0)

//   useEffect(() => {
//     // Fetch blockchain data
//     const fetchBlockchainData = () => {
//       const ledgerData = BlockchainService.getLedger()
//       const investedAmount = BlockchainService.getTotalInvestedAmount()

//       setLedger(ledgerData)
//       setTotalInvested(investedAmount)
//     }

//     fetchBlockchainData()
//   }, [])

//   // Calculate profit/loss
//   const totalProfit = 8245.67 // Mock value
//   const totalProfitPercentage = 16.5 // Mock value

//   return (
//     <DashboardShell>
//       <DashboardHeader heading="Portfolio" text="Track and manage your investments" />

//       <motion.div
//         className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
//         variants={{
//           hidden: { opacity: 0 },
//           show: {
//             opacity: 1,
//             transition: {
//               staggerChildren: 0.1,
//             },
//           },
//         }}
//         initial="hidden"
//         animate="show"
//       >
//         <motion.div
//           variants={{
//             hidden: { opacity: 0, y: 20 },
//             show: { opacity: 1, y: 0 },
//           }}
//         >
//           <Card className="border-primary/20 bg-black/40 backdrop-blur-sm hover:shadow-[0_0_15px_rgba(59,130,246,0.2)] transition-all duration-300">
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">Total Portfolio Value</CardTitle>
//               <PieChart className="h-4 w-4 text-primary" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">${totalInvested.toLocaleString()}</div>
//               <p className="text-xs text-muted-foreground">
//                 <span className="text-green-500">+20.1%</span> from last month
//               </p>
//             </CardContent>
//           </Card>
//         </motion.div>

//         <motion.div
//           variants={{
//             hidden: { opacity: 0, y: 20 },
//             show: { opacity: 1, y: 0 },
//           }}
//         >
//           <Card className="border-primary/20 bg-black/40 backdrop-blur-sm hover:shadow-[0_0_15px_rgba(59,130,246,0.2)] transition-all duration-300">
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">Total Profit/Loss</CardTitle>
//               <LineChart className="h-4 w-4 text-primary" />
//             </CardHeader>
//             <CardContent>
//               <div className={`text-2xl font-bold ${totalProfit >= 0 ? "text-green-500" : "text-red-500"}`}>
//                 {totalProfit >= 0 ? "+" : ""}${totalProfit.toLocaleString()}
//               </div>
//               <p className="text-xs text-muted-foreground">
//                 <span className={totalProfitPercentage >= 0 ? "text-green-500" : "text-red-500"}>
//                   {totalProfitPercentage >= 0 ? "+" : ""}
//                   {totalProfitPercentage.toFixed(2)}%
//                 </span>{" "}
//                 overall return
//               </p>
//             </CardContent>
//           </Card>
//         </motion.div>

//         <motion.div
//           variants={{
//             hidden: { opacity: 0, y: 20 },
//             show: { opacity: 1, y: 0 },
//           }}
//         >
//           <Card className="border-primary/20 bg-black/40 backdrop-blur-sm hover:shadow-[0_0_15px_rgba(59,130,246,0.2)] transition-all duration-300">
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">Assets</CardTitle>
//               <BarChart3 className="h-4 w-4 text-primary" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">{ledger.length}</div>
//               <p className="text-xs text-muted-foreground">
//                 <span className="text-green-500">+2</span> new assets this month
//               </p>
//             </CardContent>
//           </Card>
//         </motion.div>

//         <motion.div
//           variants={{
//             hidden: { opacity: 0, y: 20 },
//             show: { opacity: 1, y: 0 },
//           }}
//         >
//           <Card className="border-primary/20 bg-black/40 backdrop-blur-sm hover:shadow-[0_0_15px_rgba(59,130,246,0.2)] transition-all duration-300">
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">Best Performer</CardTitle>
//               <TrendingUp className="h-4 w-4 text-primary" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">BTC</div>
//               <p className="text-xs text-muted-foreground">
//                 <span className="text-green-500">+24.9%</span> profit
//               </p>
//             </CardContent>
//           </Card>
//         </motion.div>
//       </motion.div>

//       <div className="grid gap-4 md:grid-cols-7">
//         <motion.div
//           className="md:col-span-4"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.4 }}
//         >
//           <Card className="border-primary/20 bg-black/40 backdrop-blur-sm">
//             <CardHeader className="flex flex-row items-center justify-between pb-2">
//               <div>
//                 <CardTitle>Portfolio Performance</CardTitle>
//                 <CardDescription>Track your investment growth over time</CardDescription>
//               </div>
//               <Select defaultValue={timeframe} onValueChange={setTimeframe}>
//                 <SelectTrigger className="w-[100px] bg-black/60 border-primary/20">
//                   <SelectValue placeholder="Timeframe" />
//                 </SelectTrigger>
//                 <SelectContent className="bg-black/90 border-primary/20">
//                   <SelectItem value="1M">1 Month</SelectItem>
//                   <SelectItem value="3M">3 Months</SelectItem>
//                   <SelectItem value="6M">6 Months</SelectItem>
//                   <SelectItem value="1Y">1 Year</SelectItem>
//                   <SelectItem value="ALL">All Time</SelectItem>
//                 </SelectContent>
//               </Select>
//             </CardHeader>
//             <CardContent>
//               <PerformanceChart showOnlyBenchmark={true} />
//             </CardContent>
//           </Card>
//         </motion.div>

//         <motion.div
//           className="md:col-span-3"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.5 }}
//         >
//           <Card className="border-primary/20 bg-black/40 backdrop-blur-sm h-full">
//             <CardHeader>
//               <CardTitle>Asset Allocation</CardTitle>
//               <CardDescription>Distribution of your portfolio</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <AssetAllocation />
//             </CardContent>
//           </Card>
//         </motion.div>
//       </div>

//       <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
//         <Card className="border-primary/20 bg-black/40 backdrop-blur-sm">
//           <CardHeader>
//             <CardTitle>Your Assets</CardTitle>
//             <CardDescription>Detailed breakdown of your holdings</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="rounded-md border border-primary/20">
//               <div className="grid grid-cols-5 gap-4 p-4 text-sm font-medium text-muted-foreground">
//                 <div>Transaction</div>
//                 <div>From</div>
//                 <div>To</div>
//                 <div>Amount</div>
//                 <div>Date</div>
//               </div>
//               <div className="divide-y divide-primary/20">
//                 {ledger.map((transaction, index) => (
//                   <motion.div
//                     key={transaction.id}
//                     className="grid grid-cols-5 gap-4 p-4 text-sm hover:bg-primary/5 transition-colors"
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: 0.7 + index * 0.1 }}
//                   >
//                     <div className="font-medium">{transaction.hash.substring(0, 10)}...</div>
//                     <div>{transaction.sender}</div>
//                     <div>{transaction.receiver}</div>
//                     <div className={transaction.sender === "alice" ? "text-red-500" : "text-green-500"}>
//                       {transaction.sender === "alice" ? "-" : "+"}${transaction.amount.toLocaleString()}
//                     </div>
//                     <div>{new Date(transaction.timestamp).toLocaleDateString()}</div>
//                   </motion.div>
//                 ))}
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </motion.div>
//     </DashboardShell>
//   )
// }
