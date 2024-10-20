'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import TwitterRoastDisplay from '@/components/TwitterRoastDisplay';
import CustomCursor from '@/components/CustomCursor';
import FlameAnimation from '@/components/FlameAnimation';
import { motion } from 'framer-motion';
import { RiFireLine } from 'react-icons/ri';

export default function TwitterRoastPage() {
  const { username } = useParams();
  const router = useRouter();
  const [roastData, setRoastData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRoast() {
      try {
        const response = await fetch(`/api/twitterroast/${username}`);
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

    if (username) {
      fetchRoast();
    }
  }, [username]);

  const handleGetYourRoast = () => {
    router.push('/twitter');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-hidden">
      <CustomCursor />
      <FlameAnimation />

      <div className="mt-8 mb-8 flex justify-center">
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
        <TwitterRoastDisplay roastData={roastData} enteredUsername={username as string} />
      )}
    </div>
  );
}
