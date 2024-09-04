import { motion } from 'framer-motion';

export default function FlameAnimation() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-4 h-4 bg-orange-500 rounded-full"
          initial={{ 
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 0), 
            y: typeof window !== 'undefined' ? window.innerHeight + 20 : 0
          }}
          animate={{
            y: -20,
            x: `calc(${Math.random() * 200 - 100}px + ${Math.random() < 0.5 ? '-' : '+'}${Math.random() * 50}vw)`,
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'easeOut',
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
}