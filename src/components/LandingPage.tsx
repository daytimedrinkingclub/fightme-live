'use client'

import React, { useState, useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { FaGithub, FaInstagram, FaSpotify, FaTwitter, FaFacebook } from 'react-icons/fa'
import { RiFireLine } from 'react-icons/ri'

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const updatePosition = (e) => setPosition({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', updatePosition)
    return () => window.removeEventListener('mousemove', updatePosition)
  }, [])

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full bg-red-500 mix-blend-difference pointer-events-none z-50"
      style={{ x: position.x - 16, y: position.y - 16 }}
    />
  )
}

const FlameAnimation = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-4 h-4 bg-orange-500 rounded-full"
          initial={{ 
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 0), 
            y: typeof window !== 'undefined' ? window.innerHeight + 20 : 0
          }}
          animate={{
            y: -20,
            x: `calc(${Math.random() * 200 - 100}px + ${Math.random() < 0.5 ? '-' : '+'}${Math.random() * 50}vw)`,
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'easeOut',
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  )
}

const LandingPage = () => {
  const [activeTab, setActiveTab] = useState('github')
  const [roastIntensity, setRoastIntensity] = useState(50)
  const [easterEggCount, setEasterEggCount] = useState(0)
  const fireAnimation = useAnimation()

  const triggerEasterEgg = () => {
    setEasterEggCount(prevCount => {
      const newCount = prevCount + 1
      if (newCount >= 4) {
        fireAnimation.start({
          scale: [1, 1.2, 1],
          rotate: [0, 360],
          transition: { duration: 0.5 }
        })
        return 0
      }
      return newCount
    })
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-hidden">
      <CustomCursor />
      <FlameAnimation />
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-8"
      >
        <header className="flex justify-between items-center mb-12">
          <motion.h1
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 120 }}
            className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-yellow-500"
            onClick={triggerEasterEgg}
          >
            FightMe
          </motion.h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
          >
            Roast Me Now!
          </motion.button>
        </header>

        <main>
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-5xl md:text-7xl font-bold mb-8 text-center"
          >
            Get <span className="text-red-500">Burned</span> to a Crisp!
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-xl md:text-2xl text-gray-400 text-center mb-12"
          >
            Your online presence is about to get roasted harder than a marshmallow in hell!
          </motion.p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
            {['github', 'instagram', 'spotify'].map((platform, index) => (
              <motion.div
                key={platform}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 * (index + 4) }}
              >
                <button
                  onClick={() => setActiveTab(platform)}
                  className={`w-full p-4 rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-2 hover:shadow-xl ${
                    activeTab === platform
                      ? 'bg-gradient-to-r from-red-500 to-yellow-500'
                      : 'bg-gray-800 hover:bg-gray-700'
                  }`}
                >
                  <div className="flex flex-col items-center">
                    {platform === 'github' && <FaGithub className="text-3xl mb-2" />}
                    {platform === 'instagram' && <FaInstagram className="text-3xl mb-2" />}
                    {platform === 'spotify' && <FaSpotify className="text-3xl mb-2" />}
                    <h3 className="text-lg font-bold capitalize mb-1">{platform}</h3>
                    {platform === 'github' ? (
                      <p className="text-xs">Ready to burn!</p>
                    ) : (
                      <p className="text-xs">Roasting soon...</p>
                    )}
                  </div>
                </button>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="bg-gray-800 p-6 rounded-lg shadow-lg"
          >
            <h3 className="text-2xl font-bold mb-4">Roast of the Day</h3>
            <p className="text-gray-400 italic">
              "Your commit history reads like a horror novel"
            </p>
          </motion.div>

          <div className="mt-8 flex justify-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-blue-500 p-2 rounded-full"
            >
              <FaTwitter size={24} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-blue-700 p-2 rounded-full"
            >
              <FaFacebook size={24} />
            </motion.button>
          </div>
        </main>

        <footer className="mt-16 text-center text-gray-500">
          <p>&copy; 2023 FightMe. All rights reserved. If you can't stand the heat, get out of the roast!</p>
        </footer>
      </motion.div>
    </div>
  )
}

export default LandingPage