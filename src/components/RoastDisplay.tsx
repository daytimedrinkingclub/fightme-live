import { motion } from 'framer-motion';

export default function RoastDisplay({ roastData }: { roastData: { roast: string, name: string, avatar_url: string } }) {
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
      <p className="text-gray-300 text-lg italic">{roastData.roast}</p>
    </motion.div>
  );
}