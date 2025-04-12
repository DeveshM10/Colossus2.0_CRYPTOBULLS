"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Shield, X, Check, AlertTriangle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"

export function RegulationCheckButton() {
  const [showModal, setShowModal] = useState(false)
  const [assetSymbol, setAssetSymbol] = useState("")
  const [isChecking, setIsChecking] = useState(false)
  const [checkResult, setCheckResult] = useState<null | {
    symbol: string
    name: string
    status: "compliant" | "warning" | "non-compliant"
    score: number
    details: string[]
  }>(null)

  const handleCheck = () => {
    if (!assetSymbol) return

    setIsChecking(true)

    // Simulate API call
    setTimeout(() => {
      const randomScore = Math.floor(Math.random() * 100)
      let status: "compliant" | "warning" | "non-compliant"

      if (randomScore > 80) {
        status = "compliant"
      } else if (randomScore > 40) {
        status = "warning"
      } else {
        status = "non-compliant"
      }

      setCheckResult({
        symbol: assetSymbol.toUpperCase(),
        name: `${assetSymbol.toUpperCase()} Token`,
        status,
        score: randomScore,
        details: [
          status === "compliant"
            ? "Registered with appropriate regulatory bodies"
            : "May not be registered with all regulatory bodies",
          status === "compliant" ? "Transparent tokenomics and distribution" : "Limited transparency in tokenomics",
          status === "compliant" ? "Audited smart contract" : "Smart contract may have vulnerabilities",
          status === "compliant" ? "KYC verified team" : "Team information may be limited",
        ],
      })

      setIsChecking(false)
    }, 2000)
  }

  return (
    <>
      <Button
        variant="outline"
        className="border-primary/20 bg-black/60 hover:bg-primary/20"
        onClick={() => setShowModal(true)}
      >
        <Shield className="mr-2 h-4 w-4 text-primary" />
        Regulation Check
      </Button>

      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)}
          >
            <motion.div
              className="w-full max-w-md"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Card className="border-primary/20 bg-black/90 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-primary" />
                      <CardTitle>Regulation Compliance Check</CardTitle>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => setShowModal(false)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <CardDescription>Verify if an asset complies with regulatory requirements</CardDescription>
                </CardHeader>

                <CardContent>
                  {!checkResult ? (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="asset-symbol">Asset Symbol</Label>
                        <div className="flex gap-2">
                          <Input
                            id="asset-symbol"
                            placeholder="e.g. BTC, ETH, DOGE"
                            className="bg-black/60 border-primary/20"
                            value={assetSymbol}
                            onChange={(e) => setAssetSymbol(e.target.value)}
                          />
                          <Button
                            onClick={handleCheck}
                            disabled={!assetSymbol || isChecking}
                            className="bg-primary text-white"
                          >
                            {isChecking ? (
                              <>
                                <motion.div
                                  animate={{ rotate: 360 }}
                                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1, ease: "linear" }}
                                  className="mr-2"
                                >
                                  <Shield className="h-4 w-4" />
                                </motion.div>
                                Checking...
                              </>
                            ) : (
                              "Check"
                            )}
                          </Button>
                        </div>
                      </div>

                      <div className="rounded-lg border border-primary/20 bg-black/20 p-3">
                        <p className="text-sm text-muted-foreground">
                          Our regulation compliance check verifies if an asset:
                        </p>
                        <ul className="text-sm text-muted-foreground mt-2 space-y-1 list-disc pl-5">
                          <li>Is registered with appropriate regulatory bodies</li>
                          <li>Has transparent tokenomics and distribution</li>
                          <li>Uses audited and secure smart contracts</li>
                          <li>Has KYC verified team members</li>
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">{checkResult.name}</h3>
                          <p className="text-sm text-muted-foreground">{checkResult.symbol}</p>
                        </div>

                        <div className="flex items-center gap-2">
                          {checkResult.status === "compliant" ? (
                            <div className="rounded-full bg-green-500/20 p-1">
                              <Check className="h-5 w-5 text-green-500" />
                            </div>
                          ) : checkResult.status === "warning" ? (
                            <div className="rounded-full bg-yellow-500/20 p-1">
                              <AlertTriangle className="h-5 w-5 text-yellow-500" />
                            </div>
                          ) : (
                            <div className="rounded-full bg-red-500/20 p-1">
                              <X className="h-5 w-5 text-red-500" />
                            </div>
                          )}
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm">Compliance Score</span>
                          <span className="text-sm font-medium">{checkResult.score}/100</span>
                        </div>
                        <Progress
                          value={checkResult.score}
                          className="h-2"
                          indicatorClassName={
                            checkResult.status === "compliant"
                              ? "bg-green-500"
                              : checkResult.status === "warning"
                                ? "bg-yellow-500"
                                : "bg-red-500"
                          }
                        />
                      </div>

                      <div
                        className={`rounded-lg border p-3 ${
                          checkResult.status === "compliant"
                            ? "border-green-500/20 bg-green-500/10"
                            : checkResult.status === "warning"
                              ? "border-yellow-500/20 bg-yellow-500/10"
                              : "border-red-500/20 bg-red-500/10"
                        }`}
                      >
                        <h4
                          className={`font-medium ${
                            checkResult.status === "compliant"
                              ? "text-green-500"
                              : checkResult.status === "warning"
                                ? "text-yellow-500"
                                : "text-red-500"
                          }`}
                        >
                          {checkResult.status === "compliant"
                            ? "Compliant"
                            : checkResult.status === "warning"
                              ? "Partial Compliance"
                              : "Non-Compliant"}
                        </h4>

                        <ul className="mt-2 space-y-1 text-sm">
                          {checkResult.details.map((detail, index) => (
                            <li key={index} className="flex items-start gap-2">
                              {checkResult.status === "compliant" ? (
                                <Check className="h-4 w-4 text-green-500 mt-0.5" />
                              ) : (
                                <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5" />
                              )}
                              <span className="text-muted-foreground">{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="text-center">
                        <Button
                          variant="outline"
                          className="border-primary/20 bg-black/60"
                          onClick={() => {
                            setCheckResult(null)
                            setAssetSymbol("")
                          }}
                        >
                          Check Another Asset
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>

                <CardFooter className="flex justify-between border-t border-primary/20 pt-4">
                  <p className="text-xs text-muted-foreground">Powered by Trade.AI Regulation Service</p>
                </CardFooter>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
