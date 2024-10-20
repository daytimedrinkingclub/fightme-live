import { motion } from 'framer-motion';
import { FaXTwitter, FaDownload } from 'react-icons/fa6';
import { useState, useEffect, useRef } from 'react';
import html2canvas from 'html2canvas';
import { toPng } from 'html-to-image';

export default function RoastDisplay({ roastData, enteredUsername }: { 
  roastData: { roast: string, name: string, avatar_url: string, username: string },
  enteredUsername: string
}) {
  const [host, setHost] = useState('');
  const roastRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setHost(window.location.origin);
  }, []);

  const getShareableLink = () => `${host}/github/${enteredUsername}`;

  const shareOnTwitter = () => {
    const shareableLink = getShareableLink();
    const tweetText = encodeURIComponent(`🔥 I just got roasted on GitHub! Can you handle the heat?

Check out my savage roast at ${shareableLink}

#GitHubRoast #CodeBurn #DevHumor`);
    
    window.open(`https://twitter.com/intent/tweet?text=${tweetText}`, '_blank');
  };

  const handleDownload = async () => {
    if (contentRef.current) {
      try {
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const tempContainer = document.createElement('div');
        tempContainer.style.position = 'absolute';
        tempContainer.style.left = '-9999px';
        tempContainer.style.top = '-9999px';
        document.body.appendChild(tempContainer);
        
        const clone = contentRef.current.cloneNode(true) as HTMLElement;
        clone.style.width = '600px'; // Set a fixed width for consistency
        clone.style.padding = '20px';
        clone.style.background = '#1F2937';
        
        // Adjust styles for consistent layout
        const avatarImg = clone.querySelector('img');
        if (avatarImg) {
          avatarImg.style.width = '96px';
          avatarImg.style.height = '96px';
          avatarImg.style.marginRight = '16px';
        }
        
        const nameElement = clone.querySelector('h2');
        if (nameElement) {
          nameElement.style.fontSize = '24px';
          nameElement.style.textAlign = 'left';
        }
        
        const flexContainer = clone.querySelector('.flex');
        if (flexContainer) {
          flexContainer.classList.remove('flex-col', 'md:flex-row');
          flexContainer.classList.add('flex-row');
        }

        // Add FightMe.Live logo as SVG with gradient and LIVE badge
        const logoSvg = `
          <svg xmlns="http://www.w3.org/2000/svg" width="200" height="50" viewBox="0 0 200 50">
            <defs>
              <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style="stop-color:#ef4444;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#eab308;stop-opacity:1" />
              </linearGradient>
            </defs>
            <text x="0" y="35" font-family="var(--font-permanent-marker)" font-size="32" fill="url(#logoGradient)">FightMe</text>
            <g transform="translate(140, 10)">
              <rect x="0" y="0" width="50" height="24" rx="12" fill="#dc2626" />
              <circle cx="8" cy="12" r="4" fill="white">
                <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite" />
              </circle>
              <text x="16" y="16" font-family="var(--font-permanent-marker)" font-size="12" fill="white">LIVE</text>
            </g>
          </svg>
        `;
        const logoDiv = document.createElement('div');
        logoDiv.style.position = 'absolute';
        logoDiv.style.right = '20px';
        logoDiv.style.top = '20px';
        logoDiv.innerHTML = logoSvg;
        clone.appendChild(logoDiv);
        
        tempContainer.appendChild(clone);
        
        const dataUrl = await toPng(clone, {
          cacheBust: true,
          imagePlaceholder: roastData.avatar_url,
          width: 600, // Set fixed width
          height: clone.offsetHeight,
        });
        
        // Clean up
        document.body.removeChild(tempContainer);
        
        const link = document.createElement('a');
        link.download = `${enteredUsername}_roast.png`;
        link.href = dataUrl;
        link.click();
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
      ref={roastRef}
    >
      <div ref={contentRef} className="relative">
        <svg xmlns="http://www.w3.org/2000/svg" width="200" height="50" viewBox="0 0 200 50" className="absolute top-0 right-0">
          <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: '#ef4444', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#eab308', stopOpacity: 1 }} />
            </linearGradient>
          </defs>
          <text x="0" y="35" fontFamily="var(--font-permanent-marker)" fontSize="32" fill="url(#logoGradient)">FightMe</text>
          <g transform="translate(140, 10)">
            <rect x="0" y="0" width="50" height="24" rx="12" fill="#dc2626" />
            <circle cx="8" cy="12" r="4" fill="white">
              <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite" />
            </circle>
            <text x="16" y="16" fontFamily="var(--font-permanent-marker)" fontSize="12" fill="white">LIVE</text>
          </g>
        </svg>
        <div className="flex flex-col md:flex-row items-center mb-4">
          <img src={roastData.avatar_url} alt={`${roastData.name}'s avatar`} className="w-24 h-24 rounded-full mb-4 md:mb-0 md:mr-4" />
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-yellow-500 text-center md:text-left font-ibm-plex-mono">{roastData.name}</h2>
        </div>
        <p className="text-gray-300 text-lg mb-4 font-ibm-plex-mono">{roastData.roast}</p>
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
