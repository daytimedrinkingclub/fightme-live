'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import InputForm from '../../components/InputForm';
import RoastDisplay from '../../components/RoastDisplay';
import BackButton from '../../components/BackButton';
import CustomCursor from '../../components/CustomCursor';
import FlameAnimation from '../../components/FlameAnimation';

export default function GitHubRoast() {
  const [roastData, setRoastData] = useState<{ roast: string, name: string, avatar_url: string } | null>(null);
  const [loading, setLoading] = useState(false);

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
        <motion.h1
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 120 }}
          className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-yellow-500 mb-8 text-center"
        >
          GitHub Roaster
        </motion.h1>
        <InputForm setRoastData={setRoastData} setLoading={setLoading} />
        {loading && (
          <div className="flex justify-center mt-8">
            <div className="loader"></div>
          </div>
        )}
        {roastData && <RoastDisplay roastData={roastData} />}
      </motion.div>
    </div>
  );
}