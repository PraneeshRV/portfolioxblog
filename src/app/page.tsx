'use client'

import { useState } from 'react'
import TerminalIntro from '@/components/TerminalIntro'
import Hero from '@/components/Hero'
import Mounted from '@/components/Mounted'

export default function Home() {
  const [showMain, setShowMain] = useState(false)

  return (
    <Mounted>
      {showMain ? (
        <Hero />
      ) : (
        <TerminalIntro onComplete={() => setShowMain(true)} />
      )}
    </Mounted>
  )
}
