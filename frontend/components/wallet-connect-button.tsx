import { Button } from "@/components/ui/button"
import { Wallet } from "lucide-react"

export function WalletConnectButton() {
  return (
    <Button variant="outline" className="w-full">
      <Wallet className="mr-2 h-4 w-4" />
      Wallet
    </Button>
  )
}
