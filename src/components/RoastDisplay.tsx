import { motion } from 'framer-motion';
import { FaTwitter, FaLink } from 'react-icons/fa';
import { useState, useEffect } from 'react';

export default function RoastDisplay({ roastData, enteredUsername }: { 
  roastData: { roast: string, name: string, avatar_url: string, username: string },
  enteredUsername: string
}) {
  const [host, setHost] = useState('');

  useEffect(() => {
    setHost(window.location.origin);
  }, []);

  const getShareableLink = () => `${host}/git/${enteredUsername}`;

  const shareOnTwitter = () => {
    const shareableLink = getShareableLink();
    const tweetText = encodeURIComponent(`🔥 I just got roasted on GitHub! Can you handle the heat?

Check out my savage roast at ${shareableLink}

#GitHubRoast #CodeBurn #DevHumor`);
    
    window.open(`https://twitter.com/intent/tweet?text=${tweetText}`, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="mt-8 p-6 bg-gray-800 rounded-lg shadow-md w-full max-w-2xl mx-auto"
    >
      <div className="flex flex-col md:flex-row items-center mb-4">
        <img src={roastData.avatar_url} alt={`${roastData.name}'s avatar`} className="w-24 h-24 rounded-full mb-4 md:mb-0 md:mr-4" />
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-yellow-500 text-center md:text-left">{roastData.name}</h2>
      </div>
      <p className="text-gray-300 text-lg italic mb-4">{roastData.roast}</p>
      <div className="flex justify-center">
        <button
          onClick={shareOnTwitter}
          className="flex items-center justify-center bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          <FaTwitter className="mr-2" />
          Share on Twitter
        </button>
      </div>
    </motion.div>
  );
}