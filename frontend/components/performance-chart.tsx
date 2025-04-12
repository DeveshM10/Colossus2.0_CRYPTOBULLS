"use client"

import { useState, useEffect } from "react"
import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { motion } from "framer-motion"

// Mock data for the chart
const data = [
  { date: "Jan", benchmark: 10000 },
  { date: "Feb", benchmark: 10500 },
  { date: "Mar", benchmark: 11000 },
  { date: "Apr", benchmark: 11200 },
  { date: "May", benchmark: 11800 },
  { date: "Jun", benchmark: 12500 },
  { date: "Jul", benchmark: 13000 },
  { date: "Aug", benchmark: 13200 },
  { date: "Sep", benchmark: 13800 },
  { date: "Oct", benchmark: 14200 },
  { date: "Nov", benchmark: 14800 },
  { date: "Dec", benchmark: 15500 },
]

interface PerformanceChartProps {
  showOnlyBenchmark?: boolean
}

export function PerformanceChart({ showOnlyBenchmark = false }: PerformanceChartProps) {
  const [timeframe, setTimeframe] = useState<"1M" | "3M" | "6M" | "1Y" | "ALL">("1Y")
  const [animatedData, setAnimatedData] = useState<typeof data>([])

  // Filter data based on timeframe
  const getFilteredData = () => {
    switch (timeframe) {
      case "1M":
        return data.slice(-1)
      case "3M":
        return data.slice(-3)
      case "6M":
        return data.slice(-6)
      case "1Y":
        return data
      case "ALL":
        return data
      default:
        return data
    }
  }

  const filteredData = getFilteredData()

  useEffect(() => {
    // Reset animation when timeframe changes
    setAnimatedData([])

    // Animate data points appearing one by one
    let i = 0
    const interval = setInterval(() => {
      if (i < filteredData.length) {
        setAnimatedData((prev) => [...prev, filteredData[i]])
        i++
      } else {
        clearInterval(interval)
      }
    }, 100)

    return () => clearInterval(interval)
  }, [timeframe])

  return (
    <div className="h-[300px] w-full">
      <div className="mb-4 flex items-center justify-end gap-2">
        {(["1M", "3M", "6M", "1Y", "ALL"] as const).map((period) => (
          <motion.button
            key={period}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setTimeframe(period)}
            className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
              timeframe === period
                ? "bg-primary text-primary-foreground"
                : "bg-primary/20 text-primary hover:bg-primary/30"
            }`}
          >
            {period}
          </motion.button>
        ))}
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={animatedData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorBenchmark" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#9ca3af" }} dy={10} />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: "#9ca3af" }}
            tickFormatter={(value) => `${value / 1000}k`}
          />
          <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
          <Tooltip
            formatter={(value) => [`${value}`, ""]}
            labelFormatter={(label) => `${label} 2023`}
            contentStyle={{
              backgroundColor: "rgba(15, 23, 42, 0.8)",
              borderColor: "#3b82f6",
              borderRadius: "0.375rem",
              backdropFilter: "blur(8px)",
            }}
          />
          <Legend wrapperStyle={{ color: "#9ca3af" }} />
          <Area
            type="monotone"
            dataKey="benchmark"
            name="S&P 500"
            stroke="#8b5cf6"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorBenchmark)"
            animationDuration={1000}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
