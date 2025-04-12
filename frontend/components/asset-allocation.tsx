"use client"

import { useState, useEffect } from "react"
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"
import { motion } from "framer-motion"

// Mock data for asset allocation
const data = [
  { name: "Bitcoin", value: 35, color: "#3b82f6" },
  { name: "Ethereum", value: 25, color: "#8b5cf6" },
  { name: "Stocks", value: 20, color: "#10b981" },
  { name: "Stablecoins", value: 15, color: "#f59e0b" },
  { name: "Other Crypto", value: 5, color: "#ef4444" },
]

export function AssetAllocation() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [startAngle, setStartAngle] = useState(-270)
  const [endAngle, setEndAngle] = useState(-270)

  // Animate the pie chart on load
  useEffect(() => {
    const timer = setTimeout(() => {
      setEndAngle(90)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[300px]">
      <div className="flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
              startAngle={startAngle}
              endAngle={endAngle}
              animationDuration={1000}
              onMouseEnter={(_, index) => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color}
                  stroke="transparent"
                  style={{
                    filter: activeIndex === index ? "drop-shadow(0 0 8px rgba(255,255,255,0.5))" : "none",
                    opacity: activeIndex === null || activeIndex === index ? 1 : 0.6,
                    transition: "opacity 0.3s, filter 0.3s",
                  }}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => [`${value}%`, "Allocation"]}
              contentStyle={{
                backgroundColor: "rgba(15, 23, 42, 0.8)",
                borderColor: "#3b82f6",
                borderRadius: "0.375rem",
                backdropFilter: "blur(8px)",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="flex flex-col justify-center">
        <h3 className="text-lg font-medium mb-4">Portfolio Breakdown</h3>
        <div className="space-y-3">
          {data.map((item, index) => (
            <motion.div
              key={item.name}
              className="flex items-center justify-between"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 + 0.5 }}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }} />
                <span>{item.name}</span>
              </div>
              <span className="font-medium">{item.value}%</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
