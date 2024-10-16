import { useState } from 'react';
import { motion } from 'framer-motion';
import { db } from '../lib/firebase';
import { ref, set } from 'firebase/database';

export default function TwitterRoastForm({ setRoastData, setLoading, setEnteredUsername }: {
  setRoastData: (data: { roast: string, name: string, profile_image_url: string, username: string }) => void,
  setLoading: (loading: boolean) => void,
  setEnteredUsername: (username: string) => void
}) {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!username) {
      setError('Username is required');
      return;
    }
    setError('');
    setLoading(true);
    setEnteredUsername(username);
    try {
      const response = await fetch(`/api/twitter-roast?username=${username}`);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'An error occurred');
      }
      setRoastData(data);
      
      // Save to Firebase
      const roastRef = ref(db, `roasts/${username}`);
      await set(roastRef, {
        ...data,
        type: 'twitter',
        timestamp: Date.now()
      });
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="w-full max-w-md mx-auto mt-8"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <div className="flex items-center">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter Twitter username"
          className="appearance-none bg-gray-800 border border-gray-700 rounded-l-lg w-full text-white py-2 px-4 leading-tight focus:outline-none focus:border-red-500"
        />
        <motion.button
          type="submit"
          className="flex-shrink-0 bg-gradient-to-r from-red-500 to-yellow-500 text-white font-bold py-2 px-4 rounded-r-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Roast Me
        </motion.button>
      </div>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </motion.form>
  );
}
