'use client'

import { useState, useEffect } from 'react'
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
      <h1 className="text-2xl font-bold mb-4">ArConnect Wallet</h1>

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
              : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
        >
          {isConnecting ? 'Connecting...' : 'Connect ArConnect Wallet'}
        </button>
      )}
    </div>
  )
}