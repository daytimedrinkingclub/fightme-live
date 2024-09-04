import { useState } from 'react';
import { motion } from 'framer-motion';

export default function InputForm({ setRoastData, setLoading }: { setRoastData: (data: { roast: string, name: string, avatar_url: string }) => void, setLoading: (loading: boolean) => void }) {
  const [username, setUsername] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const apiKey = localStorage.getItem('anthropicApiKey');
    const response = await fetch(`/api/roast?username=${username}&apiKey=${apiKey}`);
    const data = await response.json();
    setRoastData(data);
    setLoading(false);
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
          placeholder="Enter GitHub username"
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
    </motion.form>
  );
}