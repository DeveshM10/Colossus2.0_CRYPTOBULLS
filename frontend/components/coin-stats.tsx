export function CoinStats() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-muted-foreground">Market Cap</p>
          <p className="text-lg font-semibold">$1.63T</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">24h Volume</p>
          <p className="text-lg font-semibold">$47.3B</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-muted-foreground">Circulating Supply</p>
          <p className="text-lg font-semibold">19.85M BTC</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Max Supply</p>
          <p className="text-lg font-semibold">21M BTC</p>
        </div>
      </div>

      <div className="pt-2">
        <p className="text-sm text-muted-foreground">All Time High</p>
        <div className="flex items-baseline justify-between">
          <p className="text-lg font-semibold"> $109,114.88</p>
          <p className="text-xs text-muted-foreground">JAN 20, 2025</p>
        </div>
      </div>

      <div className="pt-2">
        <p className="text-sm text-muted-foreground">All Time Low</p>
        <div className="flex items-baseline justify-between">
          <p className="text-lg font-semibold">$67.81</p>   
          <p className="text-xs text-muted-foreground">July 6, 2013</p>
        </div>
      </div>

      <div className="rounded-lg border bg-muted/50 p-3">
        <p className="text-sm font-medium">Price Change (24h)</p>
        <div className="mt-1 flex items-center justify-between">
          <p className="text-lg font-bold text-green-500">+$3535.00</p>
          <p className="text-lg font-bold text-green-500">+4.49%</p>
        </div>
      </div>

      <div className="rounded-lg border bg-muted/50 p-3">
        <p className="text-sm font-medium">Price Change (7d)</p>
        <div className="mt-1 flex items-center justify-between">
          <p className="text-lg font-bold text-green-500">+$3245.78</p>
          <p className="text-lg font-bold text-green-500">+8.26%</p>
        </div>
      </div>
    </div>
  )
}
