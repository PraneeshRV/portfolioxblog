'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

const BOOT_LINES = [
  '[BOOT] Initializing PortfoliOxBlog...',
  '[OK] Environment: Linux Arch x86_64',
  '[OK] Connecting to praneesh.xyz',
  '[OK] Loading CTF writeups...',
  '[OK] Spawning portfolio interface...',
  '[READY] Launching UI 👾'
]

export default function TerminalIntro({ onComplete }: { onComplete: () => void }) {
  const [lines, setLines] = useState<string[]>([])
  const [index, setIndex] = useState(0)
  const [hasMounted, setHasMounted] = useState(false)
  const [isDone, setIsDone] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  useEffect(() => {
    if (!hasMounted || index >= BOOT_LINES.length) return

    const timeout = setTimeout(() => {
      setLines((prev) => [...prev, BOOT_LINES[index]])
      setIndex((prev) => prev + 1)
    }, 500)

    return () => clearTimeout(timeout)
  }, [index, hasMounted])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && index >= BOOT_LINES.length) {
        setIsDone(true)
        setTimeout(() => {
          onComplete()
        }, 500) // Delay to finish animation
      }
    }

    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [index, onComplete])

  if (!hasMounted) return null

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="min-h-screen bg-black text-green-400 font-mono p-4 flex flex-col justify-center"
        >
          <div className="max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            {lines.map((line, idx) => (
              <div key={idx} className="whitespace-pre">{line}</div>
            ))}
            {index >= BOOT_LINES.length && (
              <div className="mt-4 animate-pulse">> PRESS ENTER TO CONTINUE</div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}