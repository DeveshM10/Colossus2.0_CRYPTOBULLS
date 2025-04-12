"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { User, Shield, Edit, Save } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function UserPage() {
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [loading, setLoading] = useState(true)

  const [userData, setUserData] = useState({
    name: "",
    username: "",
    email: "",
    mobile: "",
  })

  // Fetch user data on mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token")
        if (!token) throw new Error("No token found")

        const res = await fetch("http://localhost:5000/api/user/profile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (!res.ok) {
          throw new Error("Failed to fetch user data")
        }

        const data = await res.json()
        setUserData({
          name: data.name,
          username: data.username,
          email: data.email,
          mobile: data.mobile,
        })
      } catch (err) {
        toast({ title: "Error", description: (err as Error).message })
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [])

  const handleEditToggle = () => setIsEditing(!isEditing)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setUserData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSaveProfile = async () => {
    setIsSaving(true)
    try {
      const token = localStorage.getItem("token")
      const res = await fetch("http://localhost:5000/api/user/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      })

      if (!res.ok) throw new Error("Failed to update user")

      toast({
        title: "Profile Updated",
        description: "Your profile information has been updated successfully",
      })
      setIsEditing(false)
    } catch (err) {
      toast({ title: "Error", description: (err as Error).message })
    } finally {
      setIsSaving(false)
    }
  }

  if (loading) return <div className="p-4 text-white">Loading profile...</div>

  return (
    <Tabs defaultValue="profile" className="w-full">
      <TabsList className="grid w-full grid-cols-2 bg-black/60">
        <TabsTrigger value="profile">Profile Information</TabsTrigger>
        <TabsTrigger value="preferences">Trading Preferences</TabsTrigger>
      </TabsList>

      <TabsContent value="profile" className="mt-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Card className="border-primary/20 bg-black/40 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  Personal Information
                </CardTitle>
                <CardDescription>Your personal information is securely stored.</CardDescription>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="border-primary/20 text-primary hover:bg-primary/10"
                onClick={handleEditToggle}
              >
                {isEditing ? (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Done
                  </>
                ) : (
                  <>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </>
                )}
              </Button>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {["name", "username", "email", "mobile"].map((field) => (
                  <div className="space-y-2" key={field}>
                    <Label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</Label>
                    <Input
                      id={field}
                      value={(userData as any)[field]}
                      className="bg-black/60 border-primary/20"
                      onChange={handleInputChange}
                      readOnly={!isEditing}
                    />
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2 rounded-md bg-blue-500/10 p-3 border border-blue-500/20">
                <Shield className="h-5 w-5 text-blue-500" />
                <p className="text-sm text-blue-500">Your personal information is encrypted and securely stored</p>
              </div>
            </CardContent>

            {isEditing && (
              <CardFooter>
                <Button className="w-full bg-primary text-white" onClick={handleSaveProfile} disabled={isSaving}>
                  {isSaving ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                      Saving...
                    </>
                  ) : ( 
                    "Save Changes"
                  )}
                </Button>
              </CardFooter>
            )}
          </Card>
        </motion.div>
      </TabsContent>

      {/* Trading Preferences remains unchanged */}
      <TabsContent value="preferences" className="mt-6">
        {/* ...your existing preferences content... */}
      </TabsContent>
    </Tabs>
  )
}
