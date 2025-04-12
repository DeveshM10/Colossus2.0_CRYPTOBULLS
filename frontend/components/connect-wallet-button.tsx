"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast"

// ✅ Fix the "window.ethereum" error in TypeScript
declare global {
  interface Window {
    ethereum?: any
  }
}

interface ConnectWalletButtonProps {
  className?: string
}

export function ConnectWalletButton({ className }: ConnectWalletButtonProps) {
  const [isConnected, setIsConnected] = useState(false)
  const [address, setAddress] = useState<string | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleConnect = async (walletType: string) => {
    if (walletType === 'metamask') {
      if (typeof window.ethereum === 'undefined') {
        toast({
          title: "MetaMask Not Found",
          description: "Please install the MetaMask extension to continue.",
          variant: "destructive",
        })
        return
      }

      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
        const selectedAccount = accounts[0]

        setAddress(selectedAccount)
        setIsConnected(true)

        toast({
          title: "Wallet Connected",
          description: `Connected with ${selectedAccount}`,
        })

        setIsDialogOpen(false)
      } catch (error) {
        toast({
          title: "Connection Failed",
          description: "User rejected the connection request or an error occurred.",
          variant: "destructive",
        })
      }

      return
    }

    toast({
      title: "Unsupported Wallet",
      description: "Only MetaMask is supported in this version.",
      variant: "destructive",
    })
  }

  const handleDisconnect = () => {
    setIsConnected(false)
    setAddress(null)
    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected.",
    })
  }

  if (isConnected && address) {
    return (
      <Button
        variant="outline"
        className={`border-green-500 text-green-500 hover:bg-green-500/10 ${className}`}
        onClick={handleDisconnect}
      >
        <Wallet className="mr-2 h-4 w-4" />
        {address.slice(0, 6)}...{address.slice(-4)}
      </Button>
    )
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className={`border-primary text-primary hover:bg-primary/10 ${className}`}>
          <Wallet className="mr-2 h-4 w-4" />
          Connect Wallet
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md border border-primary/20 bg-black/90 backdrop-blur-md">
        <DialogHeader>
          <DialogTitle>Connect Wallet</DialogTitle>
          <DialogDescription>Choose a wallet provider to connect</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-4 rounded-lg border border-primary/20 p-4 hover:bg-primary/10 transition-colors"
            onClick={() => handleConnect("metamask")}
          >
            <div className="rounded-full bg-orange-100 p-2">
              {/* ✅ Replace with your actual MetaMask icon or leave as is */}
              <img src="/metamask-icon.svg" alt="MetaMask" className="h-8 w-8" />
            </div>
            <div className="text-left">
              <h3 className="font-medium">MetaMask</h3>
              <p className="text-sm text-muted-foreground">Connect to your MetaMask wallet</p>
            </div>
          </motion.button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
