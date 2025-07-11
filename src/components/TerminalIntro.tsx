// TerminalIntro.tsx
'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const BOOT_LINES = [
  '[  0.000000] loading kernel...',
  '[  0.156789] CPU: Ryzen 9 9800X3D x86_64 @ 6.9GHz',
  '[  0.298456] Memory: 1337MB available',
  '[  0.445123] Mounting /dev/nvme0n1...',
  '[  0.587890] cd /root/portfolio',
  '[  0.723456] Initializing praneeshrv.xyz',
  '[  0.856789] Spawning terminal interface...',
  '[  0.945123] All systems operational ✓.',
  '[  1.123456] Welcome! �.'
]

const kittyColors = [
  'text-red-400',      // red
  'text-orange-400',   // orange  
  'text-yellow-400',   // yellow
  'text-green-400',    // green
  'text-blue-400',     // blue
  'text-purple-400',   // purple
  'text-pink-400',     // pink
  'text-cyan-400',     // cyan
  'text-teal-400',     // teal
  'text-lime-400',     // lime
  'text-amber-400',    // amber
  'text-violet-400',   // violet
  'text-rose-400',     // rose
  'text-sky-400',      // sky
  'text-emerald-400',  // emerald
  'text-indigo-400',   // indigo
  'text-fuchsia-400'   // fuchsia
]

export default function TerminalIntro({ onComplete }: { onComplete: () => void }) {
  const [lines, setLines] = useState<string[]>([])
  const [index, setIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [pacmanToggle, setPacmanToggle] = useState(true)
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  useEffect(() => {
    if (!hasMounted || index >= BOOT_LINES.length) return
    const timeout = setTimeout(() => {
      setLines(prev => [...prev, BOOT_LINES[index]])
      setIndex(prev => prev + 1)
    }, 400) // Slightly faster for more dynamic feel
    return () => clearTimeout(timeout)
  }, [index, hasMounted])

  useEffect(() => {
    if (!hasMounted) return
    const interval = setInterval(() => {
      setProgress(prev => {
        const next = Math.min(prev + 5, 100)
        if (next === 100) {
          clearInterval(interval)
          setTimeout(() => onComplete(), 1000)
        }
        return next
      })
      setPacmanToggle(prev => !prev)
    }, 120)
    return () => clearInterval(interval)
  }, [hasMounted, onComplete])

  function renderProgressBar() {
    const totalDots = 20
    const eaten = Math.floor((progress / 100) * totalDots)
    const pacman = pacmanToggle ? 'C' : 'c'

    const segments = Array.from({ length: totalDots }, (_, i) => {
      if (i < eaten) {
        return ' ' // Eaten dots are empty spaces
      } else if (i === eaten && eaten < totalDots) {
        return <span key={i} className="text-yellow-400">●</span> // Current dot being eaten
      } else {
        return <span key={i} className="text-gray-600">●</span> // Uneaten dots
      }
    })

    return (
      <div className="font-mono text-sm sm:text-base mt-6 mb-2">
        <div className="flex items-center justify-center">
          <span className="text-[#cdd6f4] mr-2">[</span>
          <span className={`${kittyColors[Math.floor(progress / 6) % kittyColors.length]} mr-1`}>
            {pacman}
          </span>
          <div className="flex">
            {segments}
          </div>
          <span className="text-[#cdd6f4] ml-2">]</span>
          <span className="text-green-400 ml-3 font-bold">{progress}%</span>
        </div>
        <div className="text-center text-gray-500 text-xs mt-2">
          {progress < 100 ? 'Loading portfolio modules...' : 'Boot sequence complete!'}
        </div>
      </div>
    )
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#11111b',
          zIndex: 50
        }}
      >
        <div 
          style={{
            width: '600px',
            height: '400px',
            backgroundColor: '#1e1e2e',
            borderRadius: '8px',
            border: '1px solid #313244',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            overflow: 'hidden',
            fontFamily: 'JetBrains Mono, monospace'
          }}
          className="flex flex-col"
        >
          {/* Terminal Header */}
          <div className="flex items-center justify-between px-4 py-2 border-b border-[#313244] flex-shrink-0">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-[#f38ba8]"></div>
              <div className="w-3 h-3 rounded-full bg-[#f9e2af]"></div>
              <div className="w-3 h-3 rounded-full bg-[#a6e3a1]"></div>
            </div>
            <div className="text-[#cdd6f4] text-xs sm:text-sm font-mono">
              crimsonShadow@praneeshrv.xyz:~$
            </div>
          </div>

          {/* Boot Lines */}
          <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-8 py-8 overflow-y-auto">
            <div className="w-full max-w-3xl">
              {lines.map((line, idx) => (
                <motion.div
                  key={`line-${idx}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`font-mono text-sm sm:text-base mb-1 text-center ${kittyColors[idx % kittyColors.length]}`}
                >
                  {line}
                </motion.div>
              ))}
              
              {/* Blinking cursor */}
              {lines.length > 0 && lines.length < BOOT_LINES.length && (
                <motion.div
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="text-[#cdd6f4] font-mono text-sm sm:text-base text-center"
                >
                  ▋
                </motion.div>
              )}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="px-4 sm:px-8 pb-4 sm:pb-6 flex-shrink-0">
            {renderProgressBar()}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}