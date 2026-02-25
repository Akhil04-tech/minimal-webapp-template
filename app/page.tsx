'use client'

import { useState, useEffect } from 'react'
import StorageManager from './components/StorageManager'

export default function Home() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return null
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-800">
      <div className="container mx-auto px-4 py-20">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">My App</h1>
          <p className="text-xl text-blue-100">Data is stored in local browser storage</p>
        </header>

        <div className="max-w-2xl mx-auto">
          <StorageManager />
        </div>
      </div>
    </main>
  )
}
