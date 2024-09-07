import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function ComparisonDisplay({ comparisonData }: { comparisonData: any }) {
  // if (!comparisonData || !comparisonData.name1 || !comparisonData.name2) {
  //   return <div className="text-white text-center">Loading comparison data...</div>;
  // }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="mt-8 p-6 bg-gray-800 rounded-lg shadow-md w-full max-w-2xl mx-auto"
    >
      {/* <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-yellow-500 mb-4 text-center">GitHub Battle</h2> */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <div className="p-4 bg-gray-700 rounded-lg shadow-md w-full md:w-1/2 mx-2 text-center mb-4 md:mb-0">
          <img src={comparisonData.avatar_url1} alt={`${comparisonData.name1}'s avatar`} width={96} height={96} className="rounded-full mx-auto mb-4" />
          <p className="text-white text-xl font-bold">{comparisonData.name1}</p>
          <p className="text-gray-300">@{comparisonData.username1}</p>
        </div>
        <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-yellow-500 my-4 md:mx-4">VS</div>
        <div className="p-4 bg-gray-700 rounded-lg shadow-md w-full md:w-1/2 mx-2 text-center">
          <img src={comparisonData.avatar_url2} alt={`${comparisonData.name2}'s avatar`} width={96} height={96} className="rounded-full mx-auto mb-4" />
          <p className="text-white text-xl font-bold">{comparisonData.name2}</p>
          <p className="text-gray-300">@{comparisonData.username2}</p>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8 p-4 bg-gray-700 rounded-lg shadow-md text-center"
      >
        {/* <h3 className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-yellow-500 mb-4">Battle Result</h3> */}
        <p className="text-white text-base md:text-lg">{comparisonData.battleResult}</p>
      </motion.div>
    </motion.div>
  );
}