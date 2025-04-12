"use client"

import { useState } from "react"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

// Mock data for the charts
const priceData = [
  { date: "Apr 22", price: 165.06 },
  { date: "May 1", price: 168.5 },
  { date: "May 13", price: 185.66 },
  { date: "May 20", price: 190.4 },
  { date: "Jun 3", price: 193.38 },
  { date: "Jun 10", price: 192.47 },
  { date: "Jun 18", price: 213.57 },
  { date: "Jul 1", price: 216.02 },
  { date: "Jul 12", price: 229.77 },
  { date: "Jul 19", price: 223.56 },
  { date: "Aug 1", price: 217.63 },
  { date: "Aug 13", price: 220.78 },
  { date: "Aug 20", price: 226.01 },
  { date: "Sep 3", price: 222.28 },
  { date: "Sep 24", price: 226.87 },
  { date: "Sep 26", price: 227.02 },
  { date: "Oct 1", price: 225.71 },
  { date: "Oct 14", price: 230.79 },
  { date: "Oct 22", price: 235.34 },
  { date: "Nov 1", price: 222.42 },
  { date: "Nov 22", price: 229.62 },
  { date: "Nov 26", price: 234.8 },
  { date: "Dec 2", price: 239.33 },
  { date: "Dec 23", price: 254.99 },
  { date: "Dec 26", price: 258.74 },
  { date: "Jan 2", price: 243.58 },
  { date: "Jan 27", price: 229.61 },
  { date: "Jan 29", price: 239.1 },
  { date: "Feb 3", price: 227.76 },
  { date: "Feb 10", price: 227.65 },
  { date: "Feb 19", price: 244.87 },
  { date: "Mar 3", price: 238.03 },
  { date: "Mar 24", price: 220.73 },
  { date: "Mar 26", price: 221.53 },
  { date: "Apr 2", price: 223.89 },
  { date: "Apr 8", price: 172.42 }
];
const volumeData = [
  { date: "Apr 22", volume: 48116400 },
  { date: "May 1", volume: 50383100 },
  { date: "May 13", volume: 72044800 },
  { date: "May 20", volume: 44361300 },
  { date: "Jun 3", volume: 50080500 },
  { date: "Jun 10", volume: 97262100 },
  { date: "Jun 18", volume: 79943300 },
  { date: "Jul 1", volume: 60402900 },
  { date: "Jul 12", volume: 53046500 },
  { date: "Jul 19", volume: 49151500 },
  { date: "Aug 1", volume: 62501000 },
  { date: "Aug 13", volume: 44155300 },
  { date: "Aug 20", volume: 30299000 },
  { date: "Sep 3", volume: 50190600 },
  { date: "Sep 24", volume: 43556100 },
  { date: "Sep 26", volume: 36636700 },
  { date: "Oct 1", volume: 63285000 },
  { date: "Oct 14", volume: 39882100 },
  { date: "Oct 22", volume: 38846600 },
  { date: "Nov 1", volume: 65276700 },
  { date: "Nov 22", volume: 38168300 },
  { date: "Nov 26", volume: 45986200 },
  { date: "Dec 2", volume: 48137100 },
  { date: "Dec 23", volume: 40858800 },
  { date: "Dec 26", volume: 27237100 },
  { date: "Jan 2", volume: 55740700 },
  { date: "Jan 27", volume: 94863400 },
  { date: "Jan 29", volume: 45486100 },
  { date: "Feb 3", volume: 73063300 },
  { date: "Feb 10", volume: 33115600 },
  { date: "Feb 19", volume: 32204200 },
  { date: "Mar 3", volume: 47184000 },
  { date: "Mar 24", volume: 44299500 },
  { date: "Mar 26", volume: 34466100 },
  { date: "Apr 2", volume: 35905900 },
  { date: "Apr 8", volume: 120859500 }
];

const maData = [
  { date: "Apr 22", price: 165.06, ma7: 165.36, ma30: 167.21 },
  { date: "May 1", price: 168.5, ma7: 167.42, ma30: 170.04 },
  { date: "May 13", price: 185.66, ma7: 180.95, ma30: 174.32 },
  { date: "May 20", price: 190.4, ma7: 188.14, ma30: 179.27 },
  { date: "Jun 3", price: 193.38, ma7: 191.74, ma30: 184.67 },
  { date: "Jun 10", price: 192.47, ma7: 192.16, ma30: 188.55 },
  { date: "Jun 18", price: 213.57, ma7: 202.54, ma30: 192.96 },
  { date: "Jul 1", price: 216.02, ma7: 214.36, ma30: 198.78 },
  { date: "Jul 12", price: 229.77, ma7: 224.66, ma30: 207.67 },
  { date: "Jul 19", price: 223.56, ma7: 226.14, ma30: 214.93 },
  { date: "Aug 1", price: 217.63, ma7: 220.58, ma30: 218.88 },
  { date: "Aug 13", price: 220.78, ma7: 221.04, ma30: 221.67 },
  { date: "Aug 20", price: 226.01, ma7: 224.72, ma30: 224.29 },
  { date: "Sep 3", price: 222.28, ma7: 222.11, ma30: 224.93 },
  { date: "Sep 24", price: 226.87, ma7: 224.03, ma30: 225.34 },
  { date: "Sep 26", price: 227.02, ma7: 225.47, ma30: 225.78 },
  { date: "Oct 1", price: 225.71, ma7: 226.14, ma30: 226.13 },
  { date: "Oct 14", price: 230.79, ma7: 228.01, ma30: 227.19 },
  { date: "Oct 22", price: 235.34, ma7: 231.98, ma30: 228.77 },
  { date: "Nov 1", price: 222.42, ma7: 227.03, ma30: 229.01 },
  { date: "Nov 22", price: 229.62, ma7: 226.27, ma30: 228.64 },
  { date: "Nov 26", price: 234.8, ma7: 229.84, ma30: 229.12 },
  { date: "Dec 2", price: 239.33, ma7: 233.57, ma30: 230.74 },
  { date: "Dec 23", price: 254.99, ma7: 246.81, ma30: 236.22 },
  { date: "Dec 26", price: 258.74, ma7: 251.02, ma30: 239.87 },
  { date: "Jan 2", price: 243.58, ma7: 246.24, ma30: 241.79 },
  { date: "Jan 27", price: 229.61, ma7: 235.34, ma30: 239.62 },
  { date: "Jan 29", price: 239.1, ma7: 232.87, ma30: 237.93 },
  { date: "Feb 3", price: 227.76, ma7: 229.03, ma30: 236.15 },
  { date: "Feb 10", price: 227.65, ma7: 227.42, ma30: 233.66 },
  { date: "Feb 19", price: 244.87, ma7: 234.27, ma30: 233.2 },
  { date: "Mar 3", price: 238.03, ma7: 236.18, ma30: 233.37 },
  { date: "Mar 24", price: 220.73, ma7: 226.59, ma30: 231.7 },
  { date: "Mar 26", price: 221.53, ma7: 223.93, ma30: 230.41 },
  { date: "Apr 2", price: 223.89, ma7: 222.43, ma30: 229.2 },
  { date: "Apr 8", price: 172.42, ma7: 211.83, ma30: 225.67 }
];
interface MarketChartProps {
  type: "price" | "volume" | "ma"
}

export function MarketChart({ type }: MarketChartProps) {
  const [timeframe, setTimeframe] = useState<"1M" | "3M" | "6M" | "1Y" | "ALL">("6M")

  //  {

  // Filter data based on timeframe
  const getFilteredData = () => {
    const dataMap = {
      price: priceData,
      volume: volumeData,
      ma: maData,
    }

    const data = dataMap[type]
    const length = data.length

    switch (timeframe) {
      case "1M":
        return data.slice(length - 2)
      case "3M":
        return data.slice(length - 6)
      case "6M":
        return data
      case "1Y":
        return data
      case "ALL":
        return data
      default:
        return data
    }
  }

  const filteredData = getFilteredData()

  return (
    <div className="h-full w-full">
      <div className="mb-4 flex items-center justify-end gap-2">
        {(["1M", "3M", "6M", "1Y", "ALL"] as const).map((period) => (
          <button
            key={period}
            onClick={() => setTimeframe(period)}
            className={`rounded-md px-2.5 py-1 text-xs font-medium ${
              timeframe === period ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            }`}
          >
            {period}
          </button>
        ))}
      </div>

      {type === "price" && (
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={filteredData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} dy={10} />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => `$${value / 1000}k`}
            />
            <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
            <Tooltip formatter={(value) => [`$${value}`, "Price"]} />
            <Area
              type="monotone"
              dataKey="price"
              name="Price"
              stroke="#3b82f6"
              fillOpacity={1}
              fill="url(#colorPrice)"
            />
          </AreaChart>
        </ResponsiveContainer>
      )}

      {type === "volume" && (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={filteredData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} dy={10} />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => `${value / 1000}k`}
            />
            <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
            <Tooltip formatter={(value) => [`${value}`, "Volume"]} />
            <Bar dataKey="volume" name="Volume" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )}

      {type === "ma" && (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={filteredData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} dy={10} />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => `$${value / 1000}k`}
            />
            <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
            <Tooltip formatter={(value) => [`$${value}`, ""]} />
            <Line type="monotone" dataKey="price" name="Price" stroke="#3b82f6" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="ma7" name="7D MA" stroke="#10b981" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="ma30" name="30D MA" stroke="#f59e0b" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}
