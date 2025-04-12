export function MarketStats() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-muted-foreground">Market Cap</p>
          <p className="text-lg font-semibold">$3.87T</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">24h Volume</p>
          <p className="text-lg font-semibold">$32.6M</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-muted-foreground">Circulating Supply</p>
          <p className="text-lg font-semibold">$15.02B</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Max Supply</p>
          <p className="text-lg font-semibold">N/A</p>
        </div>
      </div>

      <div className="pt-2">
        <p className="text-sm text-muted-foreground">All Time High</p>
        <div className="flex items-baseline justify-between">
          <p className="text-lg font-semibold">$260.10</p>
          <p className="text-xs text-muted-foreground">Dec 26, 2024</p>
        </div>
      </div>

      <div className="pt-2">
        <p className="text-sm text-muted-foreground">All Time Low</p>
        <div className="flex items-baseline justify-between">
          <p className="text-lg font-semibold">$0.05</p>
          <p className="text-xs text-muted-foreground">July 8, 1982</p>
        </div>
      </div>

      <div className="rounded-lg border bg-muted/50 p-3">
        <p className="text-sm font-medium">Price Change (24h)</p>
        <div className="mt-1 flex items-center justify-between">
          <p className="text-lg font-bold text-green-500">+$5.72</p>
          <p className="text-lg font-bold text-green-500">+3.0%</p>
        </div>
      </div>

      <div className="rounded-lg border bg-muted/50 p-3">
        <p className="text-sm font-medium">Price Change (7d)</p>
        <div className="mt-1 flex items-center justify-between">
          <p className="text-lg font-bold text-green-500">+$5.39</p>
          <p className="text-lg font-bold text-green-500">+2.38%</p>
        </div>
      </div>
    </div>
  )
}
