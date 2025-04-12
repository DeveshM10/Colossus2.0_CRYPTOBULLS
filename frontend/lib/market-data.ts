// Mock data for stocks, cryptocurrencies, and memecoins

// Top stocks from various exchanges
export const stocksData = [
  // NYSE
  { symbol: "AAPL", name: "Apple Inc.", price: 198.11, change: 1.45, marketCap: 2950000000000, riskLevel: 25 },
  {
    symbol: "MSFT",
    name: "Microsoft Corporation",
    price: 328.45,
    change: 0.92,
    marketCap: 2450000000000,
    riskLevel: 20,
  },
  { symbol: "GOOGL", name: "Alphabet Inc.", price: 142.65, change: -0.78, marketCap: 1850000000000, riskLevel: 30 },
  { symbol: "AMZN", name: "Amazon.com Inc.", price: 132.45, change: 0.56, marketCap: 1350000000000, riskLevel: 35 },
  { symbol: "NVDA", name: "NVIDIA Corporation", price: 432.89, change: 2.34, marketCap: 1070000000000, riskLevel: 40 },
  { symbol: "TSLA", name: "Tesla, Inc.", price: 245.67, change: -1.23, marketCap: 780000000000, riskLevel: 55 },
  { symbol: "META", name: "Meta Platforms, Inc.", price: 325.78, change: 1.67, marketCap: 830000000000, riskLevel: 45 },
  {
    symbol: "BRK.A",
    name: "Berkshire Hathaway Inc.",
    price: 528456.0,
    change: 0.34,
    marketCap: 760000000000,
    riskLevel: 15,
  },
  { symbol: "V", name: "Visa Inc.", price: 267.89, change: 0.45, marketCap: 550000000000, riskLevel: 20 },
  { symbol: "JPM", name: "JPMorgan Chase & Co.", price: 178.45, change: -0.23, marketCap: 520000000000, riskLevel: 30 },

  // BSE/NSE (India)
  {
    symbol: "RELIANCE",
    name: "Reliance Industries Ltd.",
    price: 2456.78,
    change: 1.23,
    marketCap: 166000000000,
    riskLevel: 35,
  },
  {
    symbol: "TCS",
    name: "Tata Consultancy Services Ltd.",
    price: 3567.89,
    change: 0.45,
    marketCap: 131000000000,
    riskLevel: 25,
  },
  { symbol: "HDFCBANK", name: "HDFC Bank Ltd.", price: 1678.9, change: -0.67, marketCap: 112000000000, riskLevel: 30 },
  { symbol: "INFY", name: "Infosys Ltd.", price: 1456.78, change: 0.89, marketCap: 60000000000, riskLevel: 25 },
  {
    symbol: "HINDUNILVR",
    name: "Hindustan Unilever Ltd.",
    price: 2567.89,
    change: 0.12,
    marketCap: 60000000000,
    riskLevel: 20,
  },

  // Shanghai Stock Exchange
  {
    symbol: "601398",
    name: "Industrial and Commercial Bank of China",
    price: 4.56,
    change: -0.45,
    marketCap: 224000000000,
    riskLevel: 40,
  },
  {
    symbol: "601288",
    name: "Agricultural Bank of China",
    price: 3.45,
    change: 0.23,
    marketCap: 140000000000,
    riskLevel: 45,
  },
  { symbol: "601857", name: "PetroChina Co Ltd.", price: 5.67, change: 1.23, marketCap: 138000000000, riskLevel: 50 },
  { symbol: "601988", name: "Bank of China Ltd.", price: 3.23, change: -0.12, marketCap: 122000000000, riskLevel: 40 },
  {
    symbol: "601628",
    name: "China Life Insurance Co Ltd.",
    price: 15.67,
    change: 0.45,
    marketCap: 89000000000,
    riskLevel: 45,
  },

  // London Stock Exchange
  { symbol: "HSBA", name: "HSBC Holdings plc", price: 625.4, change: 0.34, marketCap: 126000000000, riskLevel: 35 },
  { symbol: "AZN", name: "AstraZeneca PLC", price: 10456.0, change: 1.23, marketCap: 162000000000, riskLevel: 25 },
  { symbol: "SHEL", name: "Shell plc", price: 2567.5, change: -0.45, marketCap: 183000000000, riskLevel: 30 },
  { symbol: "ULVR", name: "Unilever PLC", price: 4056.0, change: 0.12, marketCap: 103000000000, riskLevel: 20 },
  { symbol: "RIO", name: "Rio Tinto Group", price: 5245.0, change: 0.78, marketCap: 87000000000, riskLevel: 40 },
]

// Top cryptocurrencies
export const cryptoData = [
  { symbol: "BTC", name: "Bitcoin", price: 42568.23, change: 2.34, marketCap: 830000000000, riskLevel: 45 },
  { symbol: "ETH", name: "Ethereum", price: 2345.67, change: 1.45, marketCap: 280000000000, riskLevel: 50 },
  { symbol: "BNB", name: "Binance Coin", price: 345.67, change: -0.78, marketCap: 53000000000, riskLevel: 55 },
  { symbol: "SOL", name: "Solana", price: 98.45, change: 3.45, marketCap: 42000000000, riskLevel: 65 },
  { symbol: "XRP", name: "XRP", price: 0.5678, change: 0.23, marketCap: 31000000000, riskLevel: 60 },
  { symbol: "ADA", name: "Cardano", price: 0.4567, change: -1.23, marketCap: 16000000000, riskLevel: 60 },
  { symbol: "AVAX", name: "Avalanche", price: 34.56, change: 2.34, marketCap: 12000000000, riskLevel: 70 },
  { symbol: "DOT", name: "Polkadot", price: 6.78, change: 0.45, marketCap: 9800000000, riskLevel: 65 },
  { symbol: "MATIC", name: "Polygon", price: 0.7845, change: 1.23, marketCap: 7600000000, riskLevel: 60 },
  { symbol: "LINK", name: "Chainlink", price: 14.56, change: 2.34, marketCap: 8400000000, riskLevel: 65 },
  { symbol: "UNI", name: "Uniswap", price: 5.67, change: -0.45, marketCap: 4300000000, riskLevel: 70 },
  { symbol: "ATOM", name: "Cosmos", price: 9.45, change: 1.23, marketCap: 3600000000, riskLevel: 65 },
  { symbol: "ALGO", name: "Algorand", price: 0.1845, change: 0.34, marketCap: 1400000000, riskLevel: 60 },
  { symbol: "FIL", name: "Filecoin", price: 4.56, change: 1.45, marketCap: 2300000000, riskLevel: 75 },
  { symbol: "NEAR", name: "NEAR Protocol", price: 3.45, change: 2.34, marketCap: 3400000000, riskLevel: 70 },
]

// Top memecoins
export const memecoinsData = [
  { symbol: "DOGE", name: "Dogecoin", price: 0.0832, change: 5.67, marketCap: 11800000000, riskLevel: 80 },
  { symbol: "SHIB", name: "Shiba Inu", price: 0.00002345, change: -2.34, marketCap: 13900000000, riskLevel: 85 },
  { symbol: "PEPE", name: "Pepe", price: 0.00000123, change: 12.34, marketCap: 5200000000, riskLevel: 90 },
  { symbol: "FLOKI", name: "Floki Inu", price: 0.0000234, change: 8.45, marketCap: 2100000000, riskLevel: 90 },
  { symbol: "BONK", name: "Bonk", price: 0.00000034, change: 15.67, marketCap: 1800000000, riskLevel: 95 },
  {
    symbol: "BABYDOGE",
    name: "Baby Doge Coin",
    price: 0.000000002,
    change: -5.67,
    marketCap: 950000000,
    riskLevel: 95,
  },
  { symbol: "ELON", name: "Dogelon Mars", price: 0.0000002, change: 7.89, marketCap: 550000000, riskLevel: 95 },
  { symbol: "SAMO", name: "Samoyedcoin", price: 0.0045, change: 4.56, marketCap: 180000000, riskLevel: 90 },
  { symbol: "HOGE", name: "Hoge Finance", price: 0.00008, change: -3.45, marketCap: 32000000, riskLevel: 95 },
  { symbol: "CATE", name: "CateCoin", price: 0.000005, change: 9.87, marketCap: 95000000, riskLevel: 95 },
  { symbol: "MONA", name: "MonaCoin", price: 0.45, change: 1.23, marketCap: 29000000, riskLevel: 85 },
  { symbol: "DINU", name: "Dogey-Inu", price: 0.000001, change: 23.45, marketCap: 5000000, riskLevel: 95 },
  { symbol: "KISHU", name: "Kishu Inu", price: 0.000000001, change: -8.76, marketCap: 120000000, riskLevel: 95 },
  { symbol: "AKITA", name: "Akita Inu", price: 0.000002, change: 4.56, marketCap: 18000000, riskLevel: 95 },
  { symbol: "SAITAMA", name: "Saitama Inu", price: 0.000000012, change: 7.89, marketCap: 53000000, riskLevel: 95 },
]
