"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { FileCheck, CheckCircle, Wallet, Send, Eye, AlertCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { BlockchainService, type Transaction } from "@/lib/blockchain-service"
import { toast } from "@/components/ui/use-toast"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function ValidifyPage() {
  const [transactionHash, setTransactionHash] = useState("")
  const [verifiedTransaction, setVerifiedTransaction] = useState<Transaction | null>(null)
  const [isVerifying, setIsVerifying] = useState(false)
  const [verificationSuccess, setVerificationSuccess] = useState<boolean | null>(null)

  const [username, setUsername] = useState("")
  const [userTransactions, setUserTransactions] = useState<Transaction[]>([])
  const [isLoadingTransactions, setIsLoadingTransactions] = useState(false)

  const [sender, setSender] = useState("")
  const [receiver, setReceiver] = useState("")
  const [amount, setAmount] = useState("")
  const [password, setPassword] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [transactionSuccess, setTransactionSuccess] = useState<boolean | null>(null)

  const [balances, setBalances] = useState<Record<string, number>>({})
  const [isLoadingBalances, setIsLoadingBalances] = useState(false)

  const handleVerifyTransaction = () => {
    if (!transactionHash) {
      toast({
        title: "Missing Hash",
        description: "Please enter a transaction hash to verify.",
        variant: "destructive",
      })
      return
    }

    setIsVerifying(true)
    setVerificationSuccess(null)

    try {
      const transaction = BlockchainService.verifyTransaction(transactionHash)
      setVerifiedTransaction(transaction)

      if (transaction) {
        setVerificationSuccess(true)
        toast({
          title: "Transaction Verified",
          description: "The transaction has been successfully verified on the blockchain.",
        })
      } else {
        setVerificationSuccess(false)
        toast({
          title: "Transaction Not Found",
          description: "No transaction found with the provided hash.",
          variant: "destructive",
        })
      }
    } catch (error) {
      setVerificationSuccess(false)
      toast({
        title: "Verification Failed",
        description: "An error occurred while verifying the transaction.",
        variant: "destructive",
      })
    } finally {
      setIsVerifying(false)
    }
  }

  const handleViewTransactions = () => {
    if (!username) {
      toast({
        title: "Missing Username",
        description: "Please enter a username to view transactions.",
        variant: "destructive",
      })
      return
    }

    setIsLoadingTransactions(true)

    try {
      const transactions = BlockchainService.getUserTransactions(username)
      setUserTransactions(transactions)

      if (transactions.length === 0) {
        toast({
          title: "No Transactions",
          description: "No transactions found for the provided username.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Failed to Load Transactions",
        description: "An error occurred while loading transactions.",
        variant: "destructive",
      })
    } finally {
      setIsLoadingTransactions(false)
    }
  }

  const handleSubmitTransaction = () => {
    if (!sender || !receiver || !amount || !password) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all fields to submit a transaction.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)
    setTransactionSuccess(null)

    try {
      const transaction = BlockchainService.createTransaction(sender, receiver, Number.parseFloat(amount), password)

      if (transaction) {
        setTransactionSuccess(true)
        toast({
          title: "Transaction Successful",
          description: `Transaction has been successfully submitted with hash: ${transaction.hash.substring(0, 10)}...`,
        })

        // Reset form
        setSender("")
        setReceiver("")
        setAmount("")
        setPassword("")
      } else {
        setTransactionSuccess(false)
        toast({
          title: "Transaction Failed",
          description: "Failed to submit transaction. Please check your credentials.",
          variant: "destructive",
        })
      }
    } catch (error) {
      setTransactionSuccess(false)
      toast({
        title: "Transaction Failed",
        description: "An error occurred while submitting the transaction.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleViewBalances = () => {
    setIsLoadingBalances(true)

    try {
      const allBalances = BlockchainService.getAllBalances()
      setBalances(allBalances)
    } catch (error) {
      toast({
        title: "Failed to Load Balances",
        description: "An error occurred while loading balances.",
        variant: "destructive",
      })
    } finally {
      setIsLoadingBalances(false)
    }
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Validify"
        text="Verify transactions, check balances, and manage your blockchain interactions"
      />

      <Tabs defaultValue="verify" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-black/60">
          <TabsTrigger value="verify">Verify Transaction</TabsTrigger>
          <TabsTrigger value="transactions">Show Transactions</TabsTrigger>
          <TabsTrigger value="submit">Make Transaction</TabsTrigger>
          <TabsTrigger value="balances">Check Balances</TabsTrigger>
        </TabsList>

        <TabsContent value="verify" className="mt-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card className="border-primary/20 bg-black/40 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Verify Transaction</CardTitle>
                <CardDescription>Enter a transaction hash to verify its authenticity</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="hash">Transaction Hash</Label>
                  <div className="flex gap-2">
                    <Input
                      id="hash"
                      placeholder="0x..."
                      className="bg-black/60 border-primary/20"
                      value={transactionHash}
                      onChange={(e) => setTransactionHash(e.target.value)}
                    />
                    <Button
                      onClick={handleVerifyTransaction}
                      disabled={isVerifying || !transactionHash}
                      className="bg-primary text-white"
                    >
                      {isVerifying ? (
                        <>
                          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                          Verifying...
                        </>
                      ) : (
                        <>
                          <FileCheck className="mr-2 h-4 w-4" />
                          Verify
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                {verificationSuccess === true && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="rounded-lg border border-green-500/20 bg-green-500/10 p-4 mt-4"
                  >
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <div className="space-y-2">
                        <h3 className="font-medium text-green-500">Transaction Verified</h3>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="text-muted-foreground">Transaction Hash:</div>
                          <div className="font-medium">{verifiedTransaction?.hash}</div>

                          <div className="text-muted-foreground">From:</div>
                          <div className="font-medium">{verifiedTransaction?.sender}</div>

                          <div className="text-muted-foreground">To:</div>
                          <div className="font-medium">{verifiedTransaction?.receiver}</div>

                          <div className="text-muted-foreground">Amount:</div>
                          <div className="font-medium">${verifiedTransaction?.amount.toLocaleString()}</div>

                          <div className="text-muted-foreground">Timestamp:</div>
                          <div className="font-medium">
                            {verifiedTransaction && new Date(verifiedTransaction.timestamp).toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {verificationSuccess === false && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="rounded-lg border border-red-500/20 bg-red-500/10 p-4 mt-4"
                  >
                    <div className="flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
                      <div>
                        <h3 className="font-medium text-red-500">Transaction Not Found</h3>
                        <p className="text-sm text-red-400">
                          The transaction hash you provided could not be verified on the blockchain.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="transactions" className="mt-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card className="border-primary/20 bg-black/40 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Show Transactions for User</CardTitle>
                <CardDescription>View all transactions for a specific user</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <div className="flex gap-2">
                    <Input
                      id="username"
                      placeholder="alice"
                      className="bg-black/60 border-primary/20"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                    <Button
                      onClick={handleViewTransactions}
                      disabled={isLoadingTransactions || !username}
                      className="bg-primary text-white"
                    >
                      {isLoadingTransactions ? (
                        <>
                          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                          Loading...
                        </>
                      ) : (
                        <>
                          <Eye className="mr-2 h-4 w-4" />
                          View Transactions
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                {userTransactions.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mt-4"
                  >
                    <h3 className="font-medium mb-3">Transactions for {username}</h3>
                    <div className="rounded-md border border-primary/20">
                      <div className="grid grid-cols-5 gap-4 p-4 text-sm font-medium text-muted-foreground">
                        <div>Transaction</div>
                        <div>From</div>
                        <div>To</div>
                        <div>Amount</div>
                        <div>Date</div>
                      </div>
                      <div className="divide-y divide-primary/20">
                        {userTransactions.map((transaction, index) => (
                          <motion.div
                            key={transaction.id}
                            className="grid grid-cols-5 gap-4 p-4 text-sm hover:bg-primary/5 transition-colors"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 + index * 0.05 }}
                          >
                            <div className="font-medium">{transaction.hash.substring(0, 10)}...</div>
                            <div>{transaction.sender}</div>
                            <div>{transaction.receiver}</div>
                            <div className={transaction.sender === username ? "text-red-500" : "text-green-500"}>
                              {transaction.sender === username ? "-" : "+"}${transaction.amount.toLocaleString()}
                            </div>
                            <div>{new Date(transaction.timestamp).toLocaleDateString()}</div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="submit" className="mt-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card className="border-primary/20 bg-black/40 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Make Transaction</CardTitle>
                <CardDescription>Create a new transaction on the blockchain</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {transactionSuccess === true && (
                  <Alert className="bg-green-500/10 border-green-500/20 mb-4">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <AlertTitle className="text-green-500">Transaction Successful</AlertTitle>
                    <AlertDescription>
                      Your transaction has been successfully submitted to the blockchain.
                    </AlertDescription>
                  </Alert>
                )}

                {transactionSuccess === false && (
                  <Alert className="bg-red-500/10 border-red-500/20 mb-4">
                    <AlertCircle className="h-5 w-5 text-red-500" />
                    <AlertTitle className="text-red-500">Transaction Failed</AlertTitle>
                    <AlertDescription>
                      Your transaction could not be processed. Please check your details and try again.
                    </AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label htmlFor="sender">Sender Username</Label>
                  <Input
                    id="sender"
                    placeholder="alice"
                    className="bg-black/60 border-primary/20"
                    value={sender}
                    onChange={(e) => setSender(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="receiver">Receiver Username</Label>
                  <Input
                    id="receiver"
                    placeholder="bob"
                    className="bg-black/60 border-primary/20"
                    value={receiver}
                    onChange={(e) => setReceiver(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="amount">Amount</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="1000"
                    className="bg-black/60 border-primary/20"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="bg-black/60 border-primary/20"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">For demo purposes, use "password" as the password</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full bg-primary text-white"
                  onClick={handleSubmitTransaction}
                  disabled={isSubmitting || !sender || !receiver || !amount || !password}
                >
                  {isSubmitting ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Submit Transaction
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="balances" className="mt-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card className="border-primary/20 bg-black/40 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Check Balances</CardTitle>
                <CardDescription>View the balance of all users on the blockchain</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  className="w-full bg-primary text-white"
                  onClick={handleViewBalances}
                  disabled={isLoadingBalances}
                >
                  {isLoadingBalances ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                      Loading Balances...
                    </>
                  ) : (
                    <>
                      <Wallet className="mr-2 h-4 w-4" />
                      View Balances
                    </>
                  )}
                </Button>

                {Object.keys(balances).length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mt-4"
                  >
                    <h3 className="font-medium mb-3">User Balances</h3>
                    <div className="rounded-md border border-primary/20">
                      <div className="grid grid-cols-2 gap-4 p-4 text-sm font-medium text-muted-foreground">
                        <div>Username</div>
                        <div>Balance</div>
                      </div>
                      <div className="divide-y divide-primary/20">
                        {Object.entries(balances).map(([username, balance], index) => (
                          <motion.div
                            key={username}
                            className="grid grid-cols-2 gap-4 p-4 text-sm hover:bg-primary/5 transition-colors"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 + index * 0.05 }}
                          >
                            <div className="font-medium">{username}</div>
                            <div className={balance >= 0 ? "text-green-500" : "text-red-500"}>
                              ${balance.toLocaleString()}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}
