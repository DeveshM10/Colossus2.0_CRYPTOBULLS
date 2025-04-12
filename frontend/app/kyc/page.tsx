"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Shield, Upload, Check, AlertCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { toast } from "@/components/ui/use-toast"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function KYCPage() {
  const [fullName, setFullName] = useState("")
  const [panNumber, setPanNumber] = useState("")
  const [dob, setDob] = useState("")
  const [address, setAddress] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [panCardImage, setPanCardImage] = useState<string | null>(null)
  const [isVerified, setIsVerified] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Check file type
      if (!file.type.startsWith("image/")) {
        toast({
          title: "Invalid File Type",
          description: "Please upload an image file (JPEG, PNG, etc.)",
          variant: "destructive",
        })
        return
      }

      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File Too Large",
          description: "Please upload an image smaller than 5MB",
          variant: "destructive",
        })
        return
      }

      const reader = new FileReader()
      reader.onload = (event) => {
        setPanCardImage(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!fullName || !panNumber || !dob || !address || !panCardImage) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all fields and upload your PAN card",
        variant: "destructive",
      })
      return
    }

    // Validate PAN format (ABCDE1234F)
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/
    if (!panRegex.test(panNumber)) {
      toast({
        title: "Invalid PAN Format",
        description: "Please enter a valid PAN number (e.g., ABCDE1234F)",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsVerified(true)
      toast({
        title: "KYC Submitted Successfully",
        description: "Your KYC details have been securely stored on the blockchain",
      })
    }, 2000)
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Know Your Customer (KYC)"
        text="Complete your KYC verification to unlock full platform features"
      />

      <div className="grid gap-8">
        {isVerified ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Alert className="bg-green-500/10 border-green-500/20">
              <Check className="h-5 w-5 text-green-500" />
              <AlertTitle className="text-green-500">KYC Verification Complete</AlertTitle>
              <AlertDescription>
                Your identity has been verified and your information is securely stored on the blockchain.
              </AlertDescription>
            </Alert>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card className="border-primary/20 bg-black/40 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  KYC Verification
                </CardTitle>
                <CardDescription>
                  Your information will be securely stored on the blockchain and used for verification purposes only
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                  <Alert className="bg-blue-500/10 border-blue-500/20">
                    <AlertCircle className="h-5 w-5 text-blue-500" />
                    <AlertTitle className="text-blue-500">Secure Blockchain Storage</AlertTitle>
                    <AlertDescription>
                      All your KYC information will be encrypted and stored securely on the blockchain, ensuring maximum
                      privacy and security.
                    </AlertDescription>
                  </Alert>

                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-sm font-medium">
                      Full Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="fullName"
                      placeholder="John Doe"
                      className="bg-black/60 border-primary/20"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="panNumber" className="text-sm font-medium">
                      PAN Number <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="panNumber"
                      placeholder="ABCDE1234F"
                      className="bg-black/60 border-primary/20 uppercase"
                      value={panNumber}
                      onChange={(e) => setPanNumber(e.target.value.toUpperCase())}
                      maxLength={10}
                      required
                    />
                    <p className="text-xs text-muted-foreground">Enter your 10-digit PAN card number</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dob" className="text-sm font-medium">
                      Date of Birth <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="dob"
                      type="date"
                      className="bg-black/60 border-primary/20"
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address" className="text-sm font-medium">
                      Address <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="address"
                      placeholder="Enter your full address"
                      className="bg-black/60 border-primary/20 min-h-[100px]"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">
                      Upload PAN Card <span className="text-red-500">*</span>
                    </Label>
                    <div className="flex flex-col items-center justify-center border-2 border-dashed border-primary/20 rounded-lg p-6 bg-black/40">
                      {panCardImage ? (
                        <div className="space-y-4 w-full">
                          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg border border-primary/20">
                            <img
                              src={panCardImage || "/placeholder.svg"}
                              alt="PAN Card Preview"
                              className="object-contain w-full h-full"
                            />
                          </div>
                          <Button
                            type="button"
                            variant="outline"
                            className="w-full border-primary/20 text-primary hover:bg-primary/10"
                            onClick={() => {
                              setPanCardImage(null)
                              if (fileInputRef.current) {
                                fileInputRef.current.value = ""
                              }
                            }}
                          >
                            Remove Image
                          </Button>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center space-y-2">
                          <Upload className="h-10 w-10 text-muted-foreground" />
                          <p className="text-sm text-muted-foreground">Drag and drop or click to upload</p>
                          <p className="text-xs text-muted-foreground">
                            Supported formats: JPEG, PNG, JPG (Max size: 5MB)
                          </p>
                          <Button
                            type="button"
                            variant="outline"
                            className="mt-2 border-primary/20 text-primary hover:bg-primary/10"
                            onClick={() => fileInputRef.current?.click()}
                          >
                            Select File
                          </Button>
                        </div>
                      )}
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    type="submit"
                    className="w-full bg-primary text-white"
                    disabled={isSubmitting || !fullName || !panNumber || !dob || !address || !panCardImage}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                        Processing...
                      </>
                    ) : (
                      "Submit KYC Information"
                    )}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </motion.div>
        )}
      </div>
    </DashboardShell>
  )
}
