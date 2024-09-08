import { useState } from 'react';
import { motion } from 'framer-motion';

export default function HeadToHeadForm({ setComparisonData, setLoading }: { setComparisonData: (data: any) => void, setLoading: (loading: boolean) => void }) {
  const [username1, setUsername1] = useState('');
  const [username2, setUsername2] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!username1 || !username2) {
      setError('Both usernames are required');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const response = await fetch(`/api/headtohead?username1=${username1}&username2=${username2}`);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'An error occurred');
      }
      console.log(data);
      setComparisonData(data);
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
      <div className="flex flex-col mb-4">
        <input
          type="text"
          value={username1}
          onChange={(e) => setUsername1(e.target.value)}
          placeholder="Enter first GitHub username"
          className="appearance-none bg-gray-800 border border-gray-700 rounded-lg w-full text-white py-2 px-4 mb-4 leading-tight focus:outline-none focus:border-red-500"
        />
        <input
          type="text"
          value={username2}
          onChange={(e) => setUsername2(e.target.value)}
          placeholder="Enter second GitHub username"
          className="appearance-none bg-gray-800 border border-gray-700 rounded-lg w-full text-white py-2 px-4 leading-tight focus:outline-none focus:border-red-500"
        />
      </div>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      <motion.button
        type="submit"
        className="w-full bg-gradient-to-r from-red-500 to-yellow-500 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Compare
      </motion.button>
    </motion.form>
  );
}