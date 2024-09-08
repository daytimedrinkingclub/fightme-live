'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, useAnimation } from 'framer-motion';
import RoastDisplay from '@/components/RoastDisplay';
import CustomCursor from '@/components/CustomCursor';
import FlameAnimation from '@/components/FlameAnimation';
import BackButton from '@/components/BackButton';
import { RiFireLine } from 'react-icons/ri';
import { FaXTwitter, FaDownload } from 'react-icons/fa6';

export default function GitRoastPage() {
  const { handle } = useParams();
  const router = useRouter();
  const [roastData, setRoastData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enteredUsername, setEnteredUsername] = useState('');
  const [easterEggCount, setEasterEggCount] = useState(0);
  const fireAnimation = useAnimation();

  useEffect(() => {
    async function fetchRoast() {
      try {
        const response = await fetch(`/api/git/${handle}`);
        if (response.ok) {
          const data = await response.json();
          setRoastData(data);
        } else {
          console.error('Failed to fetch roast');
        }
      } catch (error) {
        console.error('Error fetching roast:', error);
      } finally {
        setLoading(false);
      }
    }

    if (handle) {
      fetchRoast();
    }
  }, [handle]);

  const handleGetYourRoast = () => {
    router.push('/');
  };

  

  const triggerEasterEgg = () => {
    setEasterEggCount(prevCount => {
      const newCount = prevCount + 1;
      if (newCount >= 4) {
        fireAnimation.start({
          scale: [1, 1.2, 1],
          rotate: [0, 360],
          transition: { duration: 0.5 }
        });
        return 0;
      }
      return newCount;
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-hidden">
      <CustomCursor />
      <FlameAnimation />
      <BackButton />
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
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

        <main>
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-5xl md:text-7xl font-bold mb-8 text-center"
          >
            {/* Git <span className="text-red-500">Roast</span> */}
          </motion.h2>

          {loading ? (
            <div className="flex justify-center mt-8">
              <div className="loader"></div>
            </div>
          ) : !roastData ? (
            <div className="text-center">Roast not found</div>
          ) : (
            <>
              <RoastDisplay roastData={roastData} enteredUsername={enteredUsername} />
              <div className="mt-8 flex justify-center space-x-4">
                <motion.button
                  onClick={handleGetYourRoast}
                  className="bg-gradient-to-r from-red-500 to-yellow-500 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg flex items-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <RiFireLine className="mr-2" />
                  Get Your Roast
                </motion.button>
                
                
              </div>
            </>
          )}

          
        </main>

        <footer className="mt-16 text-center text-gray-500">
          <p>&copy; 2024 FightMe. All rights reserved. If you can't stand the heat, get out of the roast!</p>
        </footer>
      </motion.div>
    </div>
  );
}