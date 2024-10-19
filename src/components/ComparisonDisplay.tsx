import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaTrophy, FaSkull } from 'react-icons/fa';

export default function ComparisonDisplay({ comparisonData }: { comparisonData: any }) {
  const getProfileClass = (username: string) => {
    if (username === comparisonData.winner) {
      return "border-4 border-yellow-400 shadow-lg shadow-yellow-400/50";
    } else if (username === comparisonData.loser) {
      return "border-4 border-red-600 shadow-lg shadow-red-600/50";
    }
    return "";
  };

  const getScore = (username: string) => {
    if (username === comparisonData.winner) {
      return comparisonData.winnerScore;
    } else if (username === comparisonData.loser) {
      return comparisonData.loserScore;
    }
    return 0;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="mt-8 p-6 bg-gray-800 rounded-lg shadow-md w-full max-w-2xl mx-auto"
    >
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        {[
          { username: comparisonData.username1, name: comparisonData.name1, avatar: comparisonData.avatar_url1 },
          { username: comparisonData.username2, name: comparisonData.name2, avatar: comparisonData.avatar_url2 }
        ].map((user, index) => (
          <div key={user.username} className={`p-4 bg-gray-700 rounded-lg shadow-md w-full md:w-1/2 mx-2 text-center mb-4 md:mb-0 ${getProfileClass(user.username)}`}>
            <div className="relative">
              <img src={user.avatar} alt={`${user.name}'s avatar`} width={96} height={96} className="rounded-full mx-auto mb-4" />
              {user.username === comparisonData.winner && (
                <FaTrophy className="absolute top-0 right-0 text-yellow-400 text-2xl" />
              )}
              {user.username === comparisonData.loser && (
                <FaSkull className="absolute top-0 right-0 text-red-600 text-2xl" />
              )}
            </div>
            <p className="text-white text-xl font-bold">{user.name}</p>
            <p className="text-gray-300">@{user.username}</p>
            <p className="text-lg mt-2">
              Score: {getScore(user.username)}/100
            </p>
            {user.username === comparisonData.winner && (
              <p className="text-yellow-400 font-bold mt-2">Winner</p>
            )}
            {user.username === comparisonData.loser && (
              <p className="text-red-600 font-bold mt-2">Loser</p>
            )}
          </div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8 p-4 bg-gray-700 rounded-lg shadow-md text-center"
      >
        <p className="text-white text-base md:text-lg">{comparisonData.battleResult}</p>
      </motion.div>
    </motion.div>
  );
}
