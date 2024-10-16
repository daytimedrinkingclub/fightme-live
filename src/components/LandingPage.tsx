'use client'

import React, { useState, useEffect } from 'react'
import { db } from '../lib/firebase';
import { ref, get } from 'firebase/database';
import { motion, useAnimation } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { RoastStats } from './RoastStats'
import { FaGithub, FaInstagram, FaSpotify, FaTwitter } from 'react-icons/fa'
import { Github, Instagram, Flame, AlertCircle } from "lucide-react"
import { RecentRoasts } from './RecentRoasts';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const updatePosition = (e: MouseEvent) => setPosition({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', updatePosition)
    return () => window.removeEventListener('mousemove', updatePosition)
  }, [])

  if (!isClient) return null

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
  const router = useRouter()
  const [totalRoasts, setTotalRoasts] = useState(0)

  useEffect(() => {
    // Simulating fetching total roasts from an API
    const fetchTotalRoasts = async () => {
      const roastsRef = ref(db, 'roasts');
      const snapshot = await get(roastsRef);
      console.log("snapshot", snapshot);
      
      let total = 0;
      let single = 0;
      let headToHead = 0;

      snapshot.forEach((childSnapshot) => {
        const roast = childSnapshot.val();
        total++;
        if (roast.type === 'single') {
          single++;
        } else if (roast.type === '1v1') {
          headToHead++;
        }
      });
      console.log("total", total);
      setTotalRoasts(total+100);
    }
    fetchTotalRoasts()
  }, [])

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

  const handleButtonClick = (platform: string) => {
    setActiveTab(platform)
    if (platform === 'github') {
      router.push('/githubroast')
    } else if (platform === 'github-vs') {
      router.push('/headtohead')
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-hidden">
      <CustomCursor />
      <FlameAnimation />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="container mx-auto px-4 py-8"
      >
        <header className="flex flex-col sm:flex-row justify-between items-center mb-12">
  <motion.div
    initial={{ x: -100, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ delay: 0.2, type: 'spring', stiffness: 120 }}
    className="mb-4 sm:mb-0 flex items-center"
  >
    <h1
      className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-yellow-500"
      onClick={triggerEasterEgg}
    >
      FightMe
    </h1>
    <div className="ml-2 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded-full flex items-center">
      <div className="w-2 h-2 bg-white rounded-full mr-1 animate-pulse"></div>
      LIVE
    </div>
  </motion.div>
  <motion.p
    initial={{ x: 100, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ delay: 0.3, type: 'spring', stiffness: 120 }}
    className="text-sm text-gray-400"
  >
    Powered by{' '}
    <a
      href="https://incubatorop.com/"
      target="_blank"
      rel="noopener noreferrer"
      className="text-red-500 hover:text-red-400 transition duration-300"
    >
      IncubatorOP
    </a>
  </motion.p>
</header>

        <main className="space-y-16">
          <div className="text-center space-y-6">
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, type: 'spring', stiffness: 120 }}
              className="text-5xl md:text-7xl font-bold mb-8"
            >
              Get <span className="text-red-500">Burned</span> to a Crisp!
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, type: 'spring', stiffness: 120 }}
              className="text-xl md:text-2xl text-gray-400"
            >
              Your online presence is about to get roasted harder than a marshmallow in hell!
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, type: 'spring', stiffness: 120 }}
              className="text-3xl md:text-4xl font-bold text-red-500"
            >
              {totalRoasts.toLocaleString()} Roasts Served! 🔥
            </motion.div>
          </div>

          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, type: 'spring', stiffness: 120 }}
          >
            {['github', 'github-vs', 'instagram', 'spotify'].map((platform, index) => (
              <motion.div
                key={platform}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <button
                  onClick={() => handleButtonClick(platform)}
                  className={`w-full p-6 rounded-lg transition duration-300 ease-in-out ${
                    activeTab === platform
                      ? 'bg-gradient-to-r from-red-500 to-yellow-500'
                      : 'bg-gray-800 hover:bg-gray-700'
                  }`}
                >
                  <div className="flex flex-col items-center space-y-3">
                    {platform === 'github' && <Github className="w-8 h-8" />}
                    {platform === 'github-vs' && (
                      <div className="flex items-center">
                        <Github className="w-6 h-6 mr-1" />
                        <span className="text-xl font-bold mx-1">VS</span>
                        <Github className="w-6 h-6 ml-1" />
                      </div>
                    )}
                    {platform === 'instagram' && <Instagram className="w-8 h-8" />}
                    {platform === 'spotify' && <FaSpotify className="w-8 h-8" />}
                    <h3 className="text-lg font-bold capitalize">
                      {platform === 'github-vs' ? 'GitHub 1v1' : platform}
                    </h3>
                    {platform === 'github' || platform === 'github-vs' ? (
                      <p className="text-xs">Ready to burn!</p>
                    ) : (
                      <p className="text-xs">Roasting soon...</p>
                    )}
                  </div>
                </button>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, type: 'spring', stiffness: 120 }}
          >
          </motion.div>
          <RecentRoasts />
        </main>
      </motion.div>
    </div>
  )
}

export default LandingPage