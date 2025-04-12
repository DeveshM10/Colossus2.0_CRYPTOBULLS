"use client";

import { useState, useEffect } from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { motion } from "framer-motion";

// Mock data for the chart
const data = [
  { date: "Apr 24", btc: 69702.15, eth: 3505.03 },
  { date: "May 24", btc: 58254.01, eth: 2969.78 },
  { date: "Jun 24", btc: 67706.94, eth: 3813.2 },
  { date: "Jul 24", btc: 62851.98, eth: 3440.34 },
  { date: "Aug 24", btc: 65357.5, eth: 3201.56 },
  { date: "Sep 24", btc: 57325.49, eth: 2427.9 },
  { date: "Oct 24", btc: 60837.01, eth: 2448.92 },
  { date: "Nov 24", btc: 69482.47, eth: 2511.89 },
  { date: "Dec 24", btc: 97279.79, eth: 3711.17 },
  { date: "Jan 25", btc: 94419.76, eth: 3353.5 },
  { date: "Feb 25", btc: 100655.91, eth: 3118.33 },
  { date: "Mar 25", btc: 86031.91, eth: 2216.64 },
  { date: "Apr 25", btc: 85169.17, eth: 1905.49 },
];
export default function HeroChart() {
  const [activeAsset, setActiveAsset] = useState<"btc" | "eth">("btc");
  const [animatedData, setAnimatedData] = useState<typeof data>([]);

  useEffect(() => {
    // Animate data points appearing one by one
    const timer = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        if (i < data.length) {
          setAnimatedData((prev) => [...prev, data[i]]);
          i++;
        } else {
          clearInterval(interval);
        }
      }, 150);

      return () => clearInterval(interval);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-full w-full">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white">
            {activeAsset === "btc" ? "Bitcoin (BTC)" : "Ethereum (ETH)"}
          </h3>
          <p className="text-sm text-muted-foreground">
            Last 12 months performance
          </p>
        </div>
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveAsset("btc")}
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
              activeAsset === "btc"
                ? "bg-primary text-primary-foreground"
                : "bg-primary/20 text-primary hover:bg-primary/30"
            }`}
          >
            BTC
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveAsset("eth")}
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
              activeAsset === "eth"
                ? "bg-primary text-primary-foreground"
                : "bg-primary/20 text-primary hover:bg-primary/30"
            }`}
          >
            ETH
          </motion.button>
        </div>
      </div>
      <ResponsiveContainer width="100%" height="85%">
        <AreaChart
          data={animatedData}
          margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorBtc" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorEth" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: "#9ca3af" }}
            dy={10}
          />
          <YAxis
            domain={[
              (dataMin: number) => Math.floor(dataMin * 0.9),
              (dataMax: number) => Math.ceil(dataMax * 1.1),
            ]}
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: "#9ca3af" }}
            width={50}
            tickFormatter={(value) =>
              activeAsset === "btc"
                ? `$${(value / 1000).toFixed(0)}k`
                : `$${value}`
            }
          />

          <Tooltip
            formatter={(value) => [
              `$${value}`,
              activeAsset === "btc" ? "Bitcoin" : "Ethereum",
            ]}
            labelFormatter={(label) => `${label}`}
            contentStyle={{
              backgroundColor: "rgba(15, 23, 42, 0.8)",
              borderColor: "#3b82f6",
              borderRadius: "0.375rem",
              backdropFilter: "blur(8px)",
            }}
          />
          {activeAsset === "btc" ? (
            <Area
              type="monotone"
              dataKey="btc"
              stroke="#3b82f6"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorBtc)"
              animationDuration={1000}
            />
          ) : (
            <Area
              type="monotone"
              dataKey="eth"
              stroke="#8b5cf6"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorEth)"
              animationDuration={1000}
            />
          )}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
