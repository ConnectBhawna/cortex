'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/navbar';
import {
  connectToArConnect,
  disconnectFromArConnect,
  isWalletConnected
} from '@/lib/arconnect'

export default function ArConnectPage() {
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

  return (
  
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <Navbar/>
    </div>
  )
}