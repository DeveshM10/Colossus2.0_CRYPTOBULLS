import Link from "next/link"
import { ExternalLink } from "lucide-react"

interface NewsItem {
  title: string
  source: string
  time: string
  url: string
  description: string
}

const newsItems: NewsItem[] = [
  {
    title: "Bitcoin Falls, XRP Rises as Crypto Market Stabilizes After Rebound",
    source: "Barron's",
    time: "Today",
    url: "https://www.barrons.com/articles/bitcoin-price-cryptos-ethereum-xrp-d68ae4ed",
    description:
      "Bitcoin fell 0.9% over the past 24 hours to $80,835, while XRP rose by 0.5%, trading just under $2.",
  },
  {
    title: "Boarding School Is First in UK to Accept Bitcoin for Fees",
    source: "The Times UK",
    time: "Today",
    url: "https://www.thetimes.co.uk/article/boarding-school-is-first-in-uk-to-accept-bitcoin-for-fees-kgbpwhg9s",
    description:
      "Lomond School in Scotland becomes the first UK school to accept Bitcoin for tuition payments.",
  },
  {
    title: "Bitcoin Approaching “Escape Velocity” That Will Take Prices Past $70,000: Analyst",
    source: "NewsBTC",
    time: "Today",
    url: "https://www.newsbtc.com/news/bitcoin-approaching-escape-velocity-prices-past-70000/",
    description:
      "Analysts suggest Bitcoin is nearing a breakout point that could propel its price beyond $70,000.",
  },
  {
    title: "Bitcoin Market Cap Crosses $1 Trillion as Buyers Flood In",
    source: "Reuters",
    time: "Today",
    url: "https://www.reuters.com/technology/total-amount-invested-bitcoin-back-over-1-trillion-2024-02-14/?ref=mc.news",
    description:
      "Bitcoin’s market capitalization surpasses $1 trillion amid increased investor interest.",
  },
  {
    title: "BREAKING: Bloomberg Analyst Says He Heard Insider Rumors About Bitcoin Spot ETF, Bitcoin Price Soars",
    source: "Bitcoin Sistemi",
    time: "Today",
    url: "https://en.bitcoinsistemi.com/breaking-bloomberg-analyst-says-he-heard-insider-rumors-about",
    description:
      "Rumors of a potential Bitcoin spot ETF lead to a surge in Bitcoin’s price.",
  },
];

export function MarketNews() {
  return (
    <div className="space-y-4">
      {newsItems.map((item, index) => (
        <div
          key={index}
          className="rounded-lg border border-primary/20 bg-black/20 p-4 hover:bg-black/30 transition-colors"
        >
          <div className="flex flex-col space-y-2">
            <div className="flex items-start justify-between">
              <h3 className="font-medium">{item.title}</h3>
              <Link
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 flex-shrink-0 text-primary hover:text-primary/80 transition-colors"
              >
                <ExternalLink className="h-4 w-4" />
              </Link>
            </div>
            <p className="text-sm text-muted-foreground">{item.description}</p>
            <div className="flex items-center text-xs text-muted-foreground">
              <span className="font-medium">{item.source}</span>
              <span className="mx-1">•</span>
              <span>{item.time}</span>
              <Link
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-auto text-primary hover:underline"
              >
                Open link
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
