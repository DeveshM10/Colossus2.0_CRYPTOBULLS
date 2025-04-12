"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ArrowDown, ArrowUp } from "lucide-react"

const initialTickerData = [
  { symbol: "BTC", name: "Bitcoin", price: 83804.00, change: 4258.00 },
  { symbol: "ETH", name: "Ethereum", price: 1569.08, change: 51.40 },
  { symbol: "AAPL", name: "Apple Inc.", price: 198.10, change: 7.68 },
  { symbol: "MSFT", name: "Microsoft", price: 388.77, change: 7.42 },
  { symbol: "DOGE", name: "Dogecoin", price: 0.1601, change: 0.00642 },
  { symbol: "SHIB", name: "Shiba Inu", price: 0.00001223, change: 0.0000007 },
  { symbol: "TSLA", name: "Tesla Inc.", price: 248.25, change: -4.15 },
  { symbol: "AMZN", name: "Amazon", price: 183.90, change: 2.68 }
];
export default function PriceTicker() {
  const [tickerData, setTickerData] = useState(initialTickerData)

  // Simulate price changes
  useEffect(() => {
    const interval = setInterval(() => {
      setTickerData((prevData) =>
        prevData.map((item) => {
          const changePercent = (Math.random() * 2 - 1) * 0.5
          const newPrice = item.price * (1 + changePercent / 100)
          return {
            ...item,
            price: Number.parseFloat(newPrice.toFixed(newPrice < 1 ? 8 : 2)),
            change: Number.parseFloat((item.change + changePercent / 10).toFixed(2)),
          }
        }),
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="overflow-hidden whitespace-nowrap">
      <div className="animate-ticker inline-flex gap-8">
        {tickerData.map((item, index) => (
          <motion.div
            key={item.symbol}
            className="inline-flex items-center gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <span className="font-medium text-primary">{item.symbol}</span>
            <span>${item.price < 1 ? item.price.toFixed(6) : item.price.toFixed(2)}</span>
            <span className={`flex items-center ${item.change >= 0 ? "text-green-500" : "text-red-500"}`}>
              {item.change >= 0 ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
              {Math.abs(item.change)}%
            </span>
          </motion.div>
        ))}
        {/* Duplicate for continuous scrolling effect */}
        {tickerData.map((item) => (
          <div key={`${item.symbol}-dup`} className="inline-flex items-center gap-2">
            <span className="font-medium text-primary">{item.symbol}</span>
            <span>${item.price < 1 ? item.price.toFixed(6) : item.price.toFixed(2)}</span>
            <span className={`flex items-center ${item.change >= 0 ? "text-green-500" : "text-red-500"}`}>
              {item.change >= 0 ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
              {Math.abs(item.change)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
