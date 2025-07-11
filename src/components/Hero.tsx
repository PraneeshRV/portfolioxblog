'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function Hero() {
  const [currentCommand, setCurrentCommand] = useState('')
  const [showCursor, setShowCursor] = useState(true)
  const [isTyping, setIsTyping] = useState(false)

  const commands = [
    'whoami',
    'cat about.txt', 
    'ls skills/',
    'grep -r "passion" .',
    'find . -name "*.project"'
  ]

  const responses = [
    'Praneesh RV - Cybersecurity Enthusiast & Developer',
    'A passionate hacker who loves building secure applications and exploring the depths of technology.',
    'penetration-testing  reverse-engineering  web-security  cryptography  malware-analysis',
    './passion: Binary exploitation, CTF competitions, and breaking things to make them better.',
    './projects/portfolioxblog  ./projects/ctf-writeups  ./projects/redteam-utils'
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 500)
    return () => clearInterval(interval)
  }, [])

  const handleCommandClick = (index: number) => {
    setIsTyping(true)
    setCurrentCommand('')
    
    // Simulate typing animation
    const command = commands[index]
    let i = 0
    const typeInterval = setInterval(() => {
      setCurrentCommand(command.slice(0, i + 1))
      i++
      if (i >= command.length) {
        clearInterval(typeInterval)
        setIsTyping(false)
      }
    }, 50)
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/10" />
      
      {/* Navigation */}
      <nav className="relative z-20 fixed top-0 w-full bg-black/30 backdrop-blur-md border-b border-cyan-500/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-cyan-400 font-bold text-xl font-mono glow-text"
          >
            CrimsonShadow@praneeshrv.xyz:~$
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden md:flex space-x-8"
          >
            <a href="#about" className="nav-link">./about</a>
            <a href="#skills" className="nav-link">./skills</a>
            <a href="#projects" className="nav-link">./projects</a>
            <a href="#blog" className="nav-link">./blog</a>
            <a href="#contact" className="nav-link">./contact</a>
          </motion.div>
        </div>
      </nav>

      {/* Hero Content */}
      <main className="relative z-10 pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[85vh]">
            
            {/* Left Column - Name and Introduction */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div>
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.4 }}
                  className="hero-title"
                >
                  <span className="text-cyan-400 glow-text">Hello</span>
                  <span className="text-white">,</span><br />
                  <span className="text-white">I&apos;m </span>
                  <span className="text-magenta-400 glow-text">Praneesh</span>
                </motion.h1>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="hero-subtitle"
                >
                  <div className="text-xl lg:text-2xl text-gray-400">
                    Cybersecurity Student • CTF Player • Code Breaker
                  </div>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="space-y-6"
              >
                <p className="hero-description">
                  I specialize in finding vulnerabilities before the bad guys do. From penetration testing 
                  to reverse engineering, I turn curiosity into code and break things to make them stronger.
                </p>
              </motion.div>

              {/* Under Construction Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="under-construction"
              >
                <div className="construction-container">
                  <div className="construction-sign">
                    <div className="construction-icon">
                      🚧
                    </div>
                    <div className="construction-text">
                      <h3 className="text-2xl font-bold text-yellow-400 glow-text mb-2">
                        UNDER CONSTRUCTION
                      </h3>
                      <p className="text-gray-300 text-sm">
                        Building something awesome... Check back soon!
                      </p>
                    </div>
                    <div className="construction-icon">
                      🚧
                    </div>
                  </div>
                  
                  <div className="construction-details">
                    <div className="flex items-center justify-center space-x-4 text-sm text-gray-400">
                      <span className="flex items-center">
                        <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                        Portfolio sections coming soon
                      </span>
                      <span className="flex items-center">
                        <span className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse"></span>
                        
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Column - Enhanced Terminal */}
            {/* <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              <div className="terminal-window">
                <div className="terminal-header">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded-full bg-red-500 terminal-button"></div>
                    <div className="w-4 h-4 rounded-full bg-yellow-400 terminal-button"></div>
                    <div className="w-4 h-4 rounded-full bg-green-500 terminal-button"></div>
                  </div>
                  <div className="text-cyan-300 text-sm font-mono glow-text">
                    hack_the_planet.sh
                  </div>
                  <div className="w-16"></div>
                </div>

                <div className="terminal-content">
                  <div className="prompt-line">
                    <span className="text-magenta-400 glow-text">praneesh@portfolioxblog</span>
                    <span className="text-cyan-300">:</span>
                    <span className="text-blue-400">~</span>
                    <span className="text-cyan-300">$ </span>
                    <span className="text-yellow-300 glow-text">{currentCommand}</span>
                    {showCursor && !isTyping && <span className="cursor">▋</span>}
                    {isTyping && <span className="typing-cursor">▋</span>}
                  </div>

                  {currentCommand && !isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="output-line"
                    >
                      {responses[commands.indexOf(currentCommand)]}
                    </motion.div>
                  )}

                  <div className="space-y-2 pt-6">
                    <div className="text-gray-400 text-sm font-mono">Available commands:</div>
                    {commands.map((cmd, index) => (
                      <motion.button
                        key={cmd}
                        onClick={() => handleCommandClick(index)}
                        whileHover={{ x: 10, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="command-button"
                      >
                        <span className="text-cyan-300">$ </span>
                        <span className="command-text">{cmd}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div> */}
          </div>
        </div>
      </main>
    </div>
  )
}
