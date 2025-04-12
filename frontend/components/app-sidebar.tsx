"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import {
  BarChart3,
  BookOpen,
  Coins,
  Home,
  LogOut,
  PieChart,
  Search,
  TrendingUp,
  FileCheck,
  Shield,
  User,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useWallet } from "@/components/wallet-provider"
import { ConnectWalletButton } from "@/components/connect-wallet-button"

export function AppSidebar() {
  const pathname = usePathname()
  const { isConnected, balance } = useWallet()

  // Don't show sidebar on landing page
  if (pathname === "/") return null

  const isActive = (path: string) => {
    return pathname === path
  }

  const sidebarItems = [
    {
      title: "Dashboard",
      icon: Home,
      href: "/dashboard",
    },
    {
      title: "Market",
      icon: Search,
      href: "/market",
    },
    {
      title: "Trade",
      icon: TrendingUp,
      href: "/trade",
    },
    {
      title: "MemeCoin Scanner",
      icon: Coins,
      href: "/memecoin-scanner",
    },
    {
      title: "Learning Hub",
      icon: BookOpen,
      href: "/learning",
    },
    {
      title: "Validify",
      icon: FileCheck,
      href: "/validify",
    },
    {
      title: "KYC",
      icon: Shield,
      href: "/kyc",
    },
  ]

  const bottomItems = [
    {
      title: "User",
      icon: User,
      href: "/user",
    },
  ]

  return (
    <div className="hidden md:flex flex-col w-64 border-r border-primary/20 bg-black/40 backdrop-blur-md">
      <div className="p-4 flex items-center gap-2 border-b border-primary/20">
        <Link href="/" className="flex items-center gap-2">
          <BarChart3 className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">Trade.AI</span>
        </Link>
      </div>

      {/* Wallet Status */}
      <div className="p-4 border-b border-primary/20">
        {isConnected ? (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Wallet Balance</span>
              <span className="text-sm font-medium text-green-500">{balance}</span>
            </div>
            <ConnectWalletButton className="w-full" />
          </div>
        ) : (
          <ConnectWalletButton className="w-full" />
        )}
      </div>

      {/* Main Navigation */}
      <div className="flex-1 py-4 overflow-y-auto">
        <nav className="px-2 space-y-1">
          {sidebarItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <motion.div
                whileHover={{ x: 5 }}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors relative",
                  isActive(item.href)
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-primary/10 hover:text-primary",
                )}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.title}</span>
                {isActive(item.href) && (
                  <motion.div
                    layoutId="sidebar-indicator"
                    className="absolute right-2 h-2 w-2 rounded-full bg-white"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </motion.div>
            </Link>
          ))}
        </nav>
      </div>

      {/* Bottom Navigation */}
      <div className="border-t border-primary/20 py-4">
        <nav className="px-2 space-y-1">
          {bottomItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <motion.div
                whileHover={{ x: 5 }}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive(item.href)
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-primary/10 hover:text-primary",
                )}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.title}</span>
              </motion.div>
            </Link>
          ))}

          <Button
            variant="ghost"
            className="w-full justify-start text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
          >
            <LogOut className="mr-3 h-5 w-5" />
            Logout
          </Button>
        </nav>
      </div>
    </div>
  )
}
