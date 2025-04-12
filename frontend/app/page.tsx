"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, BarChart3, Brain, Coins, LineChart, Shield, Wallet } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import PriceTicker from "@/components/price-ticker"
import HeroChart from "@/components/hero-chart"
import { NavBar } from "@/components/nav-bar"
import AnimatedGlobe from "@/components/animated-globe"
import CursorGlow from "@/components/cursor-glow"

export default function LandingPage() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-background to-background/80 overflow-hidden">
      <NavBar />
      <CursorGlow />

      {isLoaded && <AnimatedGlobe />}

      <main className="flex-1 relative z-10">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 md:py-32">
          <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-background to-background"></div>
          <div className="container relative z-10">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
                  The Future of Trading is Here
                </div>
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                  Trade Smarter with AI-Powered Insights
                </h1>
                <p className="text-xl text-muted-foreground">
                  Trade.AI combines advanced analytics, machine learning, and blockchain technology to give you the edge
                  in stocks, crypto, and memecoins.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-primary to-indigo-600 hover:from-primary/90 hover:to-indigo-600/90 text-white"
                    asChild
                  >
                    <Link href="/dashboard">
                      Launch App <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary/10"
                    asChild
                  >
                    <Link href="#features">Explore Features</Link>
                  </Button>
                </div>
              </motion.div>
              <motion.div
                className="relative h-[400px] rounded-xl border border-primary/20 bg-black/20 backdrop-blur-sm p-4 shadow-[0_0_15px_rgba(59,130,246,0.2)]"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <HeroChart />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Live Ticker */}
        <section className="w-full border-y border-primary/20 bg-black/40 backdrop-blur-sm py-4">
          <div className="container">
            <PriceTicker />
          </div>
        </section>

        {/* Features */}
        <section id="features" className="container py-20 md:py-32">
          <motion.div
            className="mx-auto text-center md:max-w-[58rem] mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-indigo-400">
              Powerful Features for Smart Trading
            </h2>
            <p className="mt-4 text-xl text-muted-foreground">
              Our platform combines cutting-edge technology with user-friendly interfaces to help you make informed
              trading decisions.
            </p>
          </motion.div>
          <motion.div
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <motion.div variants={item}>
              <Card className="border-primary/20 bg-black/40 backdrop-blur-sm hover:shadow-[0_0_15px_rgba(59,130,246,0.2)] transition-all duration-300">
                <CardHeader>
                  <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                    <Brain className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">AI-Powered Analysis</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Machine learning models analyze market trends and predict future movements.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Get daily predictions and insights based on advanced algorithms trained on historical data.</p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div variants={item}>
              <Card className="border-primary/20 bg-black/40 backdrop-blur-sm hover:shadow-[0_0_15px_rgba(59,130,246,0.2)] transition-all duration-300">
                <CardHeader>
                  <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                    <LineChart className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Advanced Charting</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Interactive charts with technical indicators and pattern recognition.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Visualize market data with customizable charts featuring over 50+ technical indicators.</p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div variants={item}>
              <Card className="border-primary/20 bg-black/40 backdrop-blur-sm hover:shadow-[0_0_15px_rgba(59,130,246,0.2)] transition-all duration-300">
                <CardHeader>
                  <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                    <Coins className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">MemeCoin Scanner</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Analyze risk and potential of emerging memecoins before investing.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Our proprietary algorithm evaluates tokenomics, community sentiment, and rug pull risk.</p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div variants={item}>
              <Card className="border-primary/20 bg-black/40 backdrop-blur-sm hover:shadow-[0_0_15px_rgba(59,130,246,0.2)] transition-all duration-300">
                <CardHeader>
                  <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                    <Wallet className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Multi-Asset Trading</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Trade stocks, cryptocurrencies, and memecoins all in one place.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Seamlessly switch between different asset classes with our unified trading interface.</p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div variants={item}>
              <Card className="border-primary/20 bg-black/40 backdrop-blur-sm hover:shadow-[0_0_15px_rgba(59,130,246,0.2)] transition-all duration-300">
                <CardHeader>
                  <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Regulatory Compliance</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Stay informed about trading regulations in your jurisdiction.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Our platform provides region-specific regulatory guidance to keep your trading compliant.</p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div variants={item}>
              <Card className="border-primary/20 bg-black/40 backdrop-blur-sm hover:shadow-[0_0_15px_rgba(59,130,246,0.2)] transition-all duration-300">
                <CardHeader>
                  <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                    <BarChart3 className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Portfolio Management</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Track performance and optimize your investment portfolio.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Visualize your holdings, analyze performance metrics, and get rebalancing suggestions.</p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </section>

        {/* CTA Section */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-background to-background"></div>
          <motion.div
            className="container relative z-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="mx-auto max-w-[58rem] text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-indigo-400">
                Ready to Transform Your Trading?
              </h2>
              <p className="mt-4 text-xl text-muted-foreground">
                Join thousands of traders who are already using Trade.AI to gain an edge in the markets.
              </p>
              <div className="mt-8">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-primary to-indigo-600 hover:from-primary/90 hover:to-indigo-600/90 text-white"
                  asChild
                >
                  <Link href="/dashboard">
                    Launch App <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-primary/20 bg-black/40 backdrop-blur-sm relative z-10">
        <div className="container py-12">
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                <span className="text-lg font-bold">Trade.AI</span>
              </div>
              <p className="text-sm text-muted-foreground">
                The future of intelligent trading, powered by AI and blockchain technology.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Features</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Market Analyser
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Learning Hub
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Memecoin Scanner
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Validify
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Notice</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    This
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Is
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    A
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Prototype
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Developers</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="https://www.linkedin.com/in/adrianrd7" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Adrian Ronan Das
                  </Link>
                </li>
                <li>
                  <Link href="https://www.linkedin.com/in/notbilalahmed" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Bilal K
                  </Link>
                </li>
                <li>
                  <Link href="https://www.linkedin.com/in/punith-kumar-b-969915355" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Punith Kumar
                  </Link>
                </li>
                <li>
                  <Link href="https://www.linkedin.com/in/devesh-mamadapur-46a811243" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Devesh M
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-primary/20 pt-8 text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Trade.AI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
