'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import TwitterRoastForm from '../../components/TwitterRoastForm';
import TwitterRoastDisplay from '../../components/TwitterRoastDisplay';

import CustomCursor from '../../components/CustomCursor';
import FlameAnimation from '../../components/FlameAnimation';
import { db } from '../../lib/firebase';
import { ref, set } from 'firebase/database';

export default function TwitterRoast() {
  const [roastData, setRoastData] = useState<{ roast: string, name: string, profile_image_url: string, username: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [enteredUsername, setEnteredUsername] = useState('');

  const handleRoastData = async (data: { roast: string, name: string, profile_image_url: string, username: string }) => {
    setRoastData(data);
    
    // Save to Firebase
    const roastRef = ref(db, `roasts/${data.username}`);
    await set(roastRef, {
      ...data,
      type: 'twitter',
      timestamp: Date.now()
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-hidden flex flex-col items-center justify-center">
      <CustomCursor />
      <FlameAnimation />

      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-8 max-w-2xl"
      >
        <motion.h1
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 120 }}
          className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-yellow-500 mb-8 text-center"
        >
          Twitter Roaster
        </motion.h1>
        <TwitterRoastForm
          setRoastData={handleRoastData}
          setLoading={setLoading}
          setEnteredUsername={setEnteredUsername}
        />
        {loading && (
          <div className="flex justify-center mt-8">
            <div className="loader"></div>
          </div>
        )}
        {roastData && <TwitterRoastDisplay roastData={roastData} enteredUsername={enteredUsername} />}
      </motion.div>
    </div>
  );
}
