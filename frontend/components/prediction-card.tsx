"use client"

import { motion } from "framer-motion"
import { Brain, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"

export function PredictionCard() {
  return (
    <div className="space-y-4">
      <motion.div
        className="flex items-center gap-2"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="rounded-full bg-primary/20 p-2">
          <Brain className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold">DogeCoin(DOGE)</h3>
          <p className="text-sm text-muted-foreground">Predicted to rise 3-4% in next 10 days</p>
        </div>
      </motion.div>

      <motion.div
        className="rounded-lg border border-primary/20 bg-black/20 backdrop-blur-sm p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <p className="text-sm">
          Our AI model has detected a bullish pattern for Doge based on increased institutional buying, positive
          developer activity, and favorable market sentiment. The upcoming network upgrade is likely to drive further
          price appreciation.
        </p>
      </motion.div>

      <motion.div
        className="flex items-center justify-between rounded-lg border border-primary/20 bg-black/20 backdrop-blur-sm p-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div>
          <p className="text-sm font-medium">Confidence Score</p>
          <p className="text-lg font-bold text-primary">81%</p>
        </div>
        <div>
          <p className="text-sm font-medium">Current Price</p>
          <p className="text-lg font-bold">13.59 Rs</p>
        </div>
        <div>
          <p className="text-sm font-medium">Target Price</p>
          <p className="text-lg font-bold text-green-500">14.13 Rs</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Button className="w-full bg-gradient-to-r from-primary to-indigo-600 hover:from-primary/90 hover:to-indigo-600/90 text-white">
          <TrendingUp className="mr-2 h-4 w-4" />
          Trade DogeCoin Now
        </Button>
      </motion.div>
    </div>
  )
}
