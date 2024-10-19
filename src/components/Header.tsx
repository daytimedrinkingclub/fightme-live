'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Header() {
  return (
    <header className="w-full flex flex-col sm:flex-row justify-between items-center bg-gray-900 text-white p-4">
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 120 }}
        className="mb-4 sm:mb-0 flex items-center"
      >
        <Link href="/">
          <h1
            className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-yellow-500 cursor-pointer"
          >
            FightMe
          </h1>
        </Link>
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
  );
}
