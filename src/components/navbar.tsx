"use client"

import * as React from "react"
import Link from "next/link"
import { useState, useEffect } from 'react'
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

import {
  connectToArConnect,
  disconnectFromArConnect,
  isWalletConnected
} from '@/lib/arconnect'

interface NavItem {
  href: string
  label: string
}

const navItems: NavItem[] = [
  { href: "/about", label: "About" },
  { href: "/features", label: "Features" },
  { href: "/docs", label: "Docs" },
  { href: "/support", label: "Support" }
]

export default function Navbar() {

  const [address, setAddress] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)


  useEffect(() => {
    // Check initial wallet connection status on component mount
    const checkWalletStatus = async () => {
      try {
        const connected = await isWalletConnected()
        if (connected) {
          const walletAddress = await connectToArConnect()
          setAddress(walletAddress)
        }
      } catch (err) {
        setError((err as Error).message)
      }
    }

    checkWalletStatus()
  }, [])

  const handleConnect = async () => {
    setIsConnecting(true)
    setError(null)
    try {
      const walletAddress = await connectToArConnect()
      setAddress(walletAddress)
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setIsConnecting(false)
    }
  }

  const handleDisconnect = async () => {
    try {
      await disconnectFromArConnect()
      setAddress(null)
    } catch (err) {
      setError((err as Error).message)
    }
  }



  const pathname = usePathname()
  const [hoveredPath, setHoveredPath] = React.useState<string | null>(null)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-black-100 bg-white">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8">
              <svg viewBox="0 0 24 24" className="h-full w-full">
                <rect width="24" height="24" fill="black" />
                <path d="M7 7h10v2H7zm0 4h10v2H7zm0 4h10v2H7z" fill="white" />
              </svg>
            </div>
            <span className="text-xl font-bold">Cortex</span>
          </Link>
        </div>

        <div className="relative flex items-center bg-[#d1d1d1] rounded-md">
          <div className="flex rounded-full bg-black-50 p-1">
            {navItems.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  "relative rounded-full px-4 py-1 text-sm transition-colors",
                  pathname === href
                    ? "text-black-900 bg-gray-300" // Active link style
                    : "text-black-600 hover:text-black-900 hover:bg-[#b0b0b0]"
                  )}
                  onMouseEnter={() => setHoveredPath(href)}
                  onMouseLeave={() => setHoveredPath(null)}
              >
                <span className="relative z-10">{label}</span>
                {pathname === href && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-white"
                    layoutId="navbar-active"
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30,
                    }}
                  />
                )}
                {hoveredPath === href && pathname !== href && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-black-100"
                    layoutId="navbar-hover"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30,
                    }}
                  />
                )}
              </Link>
            ))}
          </div>
        </div>

        <div>
        {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          {error}
        </div>
      )}

      {address ? (
        <div className="space-y-4">
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
            <p>Connected Wallet:</p>
            <p className="font-mono break-all">{address}</p>
          </div>
          <button
            onClick={handleDisconnect}
            className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
          >
            Disconnect Wallet
          </button>
        </div>
      ) : (
        <button
          onClick={handleConnect}
          disabled={isConnecting}
          className={`w-full py-2 rounded transition ${isConnecting
              ? 'bg-gray-400 cursor-not-allowed'
              : 'rounded-full bg-black px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-black-800 active:bg-black-900'
            }`}
        >
          {isConnecting ? 'Connecting...' : 'Connect Wallet'}
        </button>
      )}
        </div>
      </nav>
    </header>
  )
}

