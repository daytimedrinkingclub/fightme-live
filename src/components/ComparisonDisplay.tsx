

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaTrophy, FaSkull, FaXTwitter, FaDownload } from 'react-icons/fa6';
import { toPng } from 'html-to-image';

export default function ComparisonDisplay({ comparisonData }: { comparisonData: any }) {
  const [host, setHost] = useState('');
  const comparisonRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setHost(window.location.origin);
  }, []);

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

  const getShareableLink = () => `${host}`;

  const shareOnTwitter = () => {
    const shareableLink = getShareableLink();
    const tweetText = encodeURIComponent(`🔥 Check out this GitHub battle on FightMe.Live!

${shareableLink}

#GitHubBattle #CodeFight #DevShowdown`);
    
    window.open(`https://twitter.com/intent/tweet?text=${tweetText}`, '_blank');
  };

  const handleDownload = async () => {
    if (contentRef.current) {
      try {
        // ... similar download logic as in RoastDisplay ...
      } catch (err) {
        console.error('Error generating image:', err);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="mt-8 p-6 bg-gray-800 rounded-lg shadow-md w-full max-w-2xl mx-auto relative z-10"
      ref={comparisonRef}
    >
      <div ref={contentRef} className="relative">
        <svg xmlns="http://www.w3.org/2000/svg" width="200" height="50" viewBox="0 0 200 50" className="absolute top-0 right-0">
          {/* ... FightMe.Live logo SVG ... */}
        </svg>
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
          <p className="text-gray-300 text-lg font-ibm-plex-mono">{comparisonData.battleResult}</p>
        </motion.div>
      </div>
      <div className="flex justify-center space-x-4 mt-4">
        <button
          onClick={shareOnTwitter}
          className="bg-black text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg flex items-center"
        >
          <FaXTwitter className="mr-2" />
          Share on Twitter
        </button>
        <motion.button
          onClick={handleDownload}
          className="bg-gradient-to-r from-red-500 to-yellow-500 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg flex items-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaDownload className="mr-2" />
          Save as Image
        </motion.button>
      </div>
    </motion.div>
  );
}
