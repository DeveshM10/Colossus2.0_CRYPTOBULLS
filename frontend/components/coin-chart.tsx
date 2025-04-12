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
    {'date': 'Apr 16', 'price': 5296485.0},
    {'date': 'Apr 17', 'price': 5338995.5},
    {'date': 'Apr 20', 'price': 5322664.0},
    {'date': 'May 16', 'price': 5526996.5},
    {'date': 'May 24', 'price': 5657632.0},
    {'date': 'May 28', 'price': 5769932.5},
    {'date': 'Jun 16', 'price': 5530360.5},
    {'date': 'Jun 24', 'price': 5279561.0},
    {'date': 'Jun 28', 'price': 5140992.5},
    {'date': 'Jul 16', 'price': 5422395.5},
    {'date': 'Jul 24', 'price': 5518611.0},
    {'date': 'Jul 28', 'price': 5677502.5},
    {'date': 'Aug 16', 'price': 4832092.5},
    {'date': 'Aug 24', 'price': 5371991.5},
    {'date': 'Aug 28', 'price': 4993715.0},
    {'date': 'Sep 16', 'price': 4964555.0},
    {'date': 'Sep 24', 'price': 5291132.5},
    {'date': 'Sep 28', 'price': 5507767.0},
    {'date': 'Oct 16', 'price': 5635713.0},
    {'date': 'Oct 24', 'price': 5584820.0},
    {'date': 'Oct 28', 'price': 5712967.5},
    {'date': 'Nov 16', 'price': 7688734.0},
    {'date': 'Nov 24', 'price': 8256152.0},
    {'date': 'Nov 28', 'price': 8101210.0},
    {'date': 'Dec 16', 'price': 8845695.0},
    {'date': 'Dec 24', 'price': 8057719.5},
    {'date': 'Dec 28', 'price': 8040262.0},
    {'date': 'Jan 16', 'price': 8688016.0},
    {'date': 'Jan 24', 'price': 8989218.0},
    {'date': 'Jan 28', 'price': 8824174.0},
    {'date': 'Feb 9', 'price': 8470122.0},
    {'date': 'Feb 10', 'price': 8463903.0},
    {'date': 'Feb 26', 'price': 7727576.5},
    {'date': 'Mar 16', 'price': 7333338.0},
    {'date': 'Mar 24', 'price': 7400501.0},
    {'date': 'Mar 28', 'price': 7470829.0}
  ];
const volumeData = [
  {'date': 'Apr 16', 'volume': 3640531598569},
  {'date': 'Apr 17', 'volume': 3584956481589},
  {'date': 'Apr 20', 'volume': 4161885833820},
  {'date': 'May 16', 'volume': 3320757771571},
  {'date': 'May 24', 'volume': 3489354646955},
  {'date': 'May 28', 'volume': 2151089081955},
  {'date': 'Jun 16', 'volume': 1179853626821},
  {'date': 'Jun 24', 'volume': 933435331432},
  {'date': 'Jun 28', 'volume': 1771813795267},
  {'date': 'Jul 16', 'volume': 3184262428227},
  {'date': 'Jul 24', 'volume': 2980445487295},
  {'date': 'Jul 28', 'volume': 2904493161643},
  {'date': 'Aug 16', 'volume': 2995465025771},
  {'date': 'Aug 24', 'volume': 3564643594774},
  {'date': 'Aug 28', 'volume': 3281681906484},
  {'date': 'Sep 16', 'volume': 1520077726494},
  {'date': 'Sep 24', 'volume': 2623457799748},
  {'date': 'Sep 28', 'volume': 2683853259077},
  {'date': 'Oct 16', 'volume': 4107669964159},
  {'date': 'Oct 24', 'volume': 2712367203360},
  {'date': 'Oct 28', 'volume': 1406289933854},
  {'date': 'Nov 16', 'volume': 6606092339288},
  {'date': 'Nov 24', 'volume': 3750299312335},
  {'date': 'Nov 28', 'volume': 6005125676167},
  {'date': 'Dec 16', 'volume': 4337745330175},
  {'date': 'Dec 24', 'volume': 5551784543331},
  {'date': 'Dec 28', 'volume': 4475873491844},
  {'date': 'Jan 16', 'volume': 4996978383559},
  {'date': 'Jan 24', 'volume': 9001698829583},
  {'date': 'Jan 28', 'volume': 7693482014001},
  {'date': 'Feb 9', 'volume': 1970651506582},
  {'date': 'Feb 10', 'volume': 2432418289453},
  {'date': 'Feb 26', 'volume': 8023920062094},
  {'date': 'Mar 16', 'volume': 1186862439828},
  {'date': 'Mar 24', 'volume': 1083111306099},
  {'date': 'Mar 28', 'volume': 2092164918079}
];

const maData = [
  { date: "Oct 28", price: 5712967.5, ma7: 5384381.43, ma30: 6224818.67 },
  { date: "Nov 16", price: 7688734.0, ma7: 5769384.14, ma30: 6191509.27 },
  { date: "Nov 24", price: 8256152.0, ma7: 6239612.29, ma30: 6167073.73 },
  { date: "Nov 28", price: 8101210.0, ma7: 6641051.93, ma30: 6142974.93 },
  { date: "Dec 16", price: 8845695.0, ma7: 7117898.79, ma30: 6155494.03 },
  { date: "Dec 24", price: 8057719.5, ma7: 8113241.21, ma30: 6195111.63 },
  { date: "Dec 28", price: 8040262.0, ma7: 8126427.64, ma30: 6227222.17 },
  { date: "Jan 16", price: 8688016.0, ma7: 8269469.64, ma30: 6291441.5 },
  { date: "Jan 24", price: 8989218.0, ma7: 8565268.64, ma30: 6363539.17 },
  { date: "Jan 28", price: 8824174.0, ma7: 8626266.64, ma30: 6425771.8 },
  { date: "Feb 9", price: 8470122.0, ma7: 8562172.64, ma30: 6466439.43 },
  { date: "Feb 10", price: 8463903.0, ma7: 8617621.5, ma30: 6500540.7 },
  { date: "Feb 26", price: 7727576.5, ma7: 8611661.21, ma30: 6525107.9 },
  { date: "Mar 16", price: 7333338.0, ma7: 8335047.07, ma30: 6535692.57 },
  { date: "Mar 24", price: 7400501.0, ma7: 8262516.5, ma30: 6543653.5 },
  { date: "Mar 28", price: 7470829.0, ma7: 8038527.14, ma30: 6555203.87 }
];
interface MarketChartProps {
  type: "price" | "volume" | "ma"
}

export function CoinChart({ type }: MarketChartProps) {
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
