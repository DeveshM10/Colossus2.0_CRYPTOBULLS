"use client"

import { useEffect, useRef } from "react"

interface TradingViewChartProps {
  symbol: string
  type?: "stocks" | "crypto" | "memecoins"
}

export function TradingViewChart({ symbol, type = "crypto" }: TradingViewChartProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Clean up any existing chart
    containerRef.current.innerHTML = ""

    // Create a new chart
    const script = document.createElement("script")
    script.src = "https://s3.tradingview.com/tv.js"
    script.async = true
    script.onload = () => {
      if (typeof window.TradingView !== "undefined" && containerRef.current) {
        // Determine the symbol format based on the asset type
        let formattedSymbol = symbol

        if (type === "stocks") {
          // For stocks, we need to add the exchange prefix
          // This is a simplification - in a real app, you'd have the actual exchange info
          formattedSymbol = `NASDAQ:${symbol}`
        } else if (type === "crypto" || type === "memecoins") {
          formattedSymbol = `BINANCE:${symbol}USDT`

          // Fallback for common cryptos if BINANCE pair doesn't exist
          if (symbol === "BTC") formattedSymbol = "BINANCE:BTCUSDT"
          if (symbol === "ETH") formattedSymbol = "BINANCE:ETHUSDT"
        }

        new window.TradingView.widget({
          autosize: true,
          symbol: formattedSymbol,
          interval: "D",
          timezone: "Etc/UTC",
          theme: "dark",
          style: "1",
          locale: "en",
          toolbar_bg: "#131722",
          enable_publishing: false,
          hide_top_toolbar: false,
          hide_legend: false,
          save_image: false,
          container_id: containerRef.current.id,
          studies: ["RSI@tv-basicstudies", "MAExp@tv-basicstudies", "MACD@tv-basicstudies"],
          disabled_features: ["header_symbol_search"],
          enabled_features: ["use_localstorage_for_settings"],
          overrides: {
            "mainSeriesProperties.candleStyle.upColor": "#26a69a",
            "mainSeriesProperties.candleStyle.downColor": "#ef5350",
            "mainSeriesProperties.candleStyle.wickUpColor": "#26a69a",
            "mainSeriesProperties.candleStyle.wickDownColor": "#ef5350",
          },
        })
      }
    }

    containerRef.current.appendChild(script)

    return () => {
      if (containerRef.current) {
        const script = containerRef.current.querySelector("script")
        if (script) {
          script.remove()
        }
      }
    }
  }, [symbol, type])

  return <div id="tradingview_chart" ref={containerRef} className="h-full w-full" />
}

// Add TradingView types
declare global {
  interface Window {
    TradingView: {
      widget: any
    }
  }
}
