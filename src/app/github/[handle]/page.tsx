'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, useAnimation } from 'framer-motion';
import RoastDisplay from '@/components/RoastDisplay';
import CustomCursor from '@/components/CustomCursor';
import FlameAnimation from '@/components/FlameAnimation';
import { RiFireLine } from 'react-icons/ri';

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
        <main>
          <div className="mb-8 flex justify-center">
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

          {loading ? (
            <div className="flex justify-center mt-8">
              <div className="loader"></div>
            </div>
          ) : !roastData ? (
            <div className="text-center">Roast not found</div>
          ) : (
            <>
              <RoastDisplay roastData={roastData} enteredUsername={enteredUsername} />
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
