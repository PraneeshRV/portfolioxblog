'use client'

import { useState } from 'react'
import TerminalIntro from '@/components/TerminalIntro'
import Mounted from '@/components/Mounted'

export default function Home() {
  const [showMain, setShowMain] = useState(false)

  return (
    <Mounted>
      {showMain ? (
        <main className="min-h-screen bg-background text-foreground flex items-center justify-center">
          <h1 className="text-4xl font-bold">Welcome to PortfoliOxBlog</h1>
        </main>
      ) : (
        <TerminalIntro onComplete={() => setShowMain(true)} />
      )}
    </Mounted>
  )
}
