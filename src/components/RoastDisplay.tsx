import { motion } from 'framer-motion';
import { FaTwitter } from 'react-icons/fa';
import html2canvas from 'html2canvas';

export default function RoastDisplay({ roastData }: { roastData: { roast: string, name: string, avatar_url: string } }) {
  const shareOnTwitter = async () => {
    console.log('Starting shareOnTwitter function');
    const element = document.getElementById('roast-card');
    if (!element) {
      console.error('Roast card element not found');
      return;
    }

    console.log('Roast card element found:', element);
    console.log('Element dimensions:', element.offsetWidth, 'x', element.offsetHeight);

    // Wait for a short time to ensure all elements are rendered
    await new Promise(resolve => setTimeout(resolve, 500));

    console.log('Capturing roast card as image');
    const canvas = await html2canvas(element, {
      width: element.offsetWidth,
      height: element.offsetHeight,
      scale: 2, // Increase scale for better quality
      logging: true, // Enable logging for debugging
      useCORS: true // This might help with loading external images (like avatars)
    });

    console.log('Canvas dimensions:', canvas.width, 'x', canvas.height);
    const imageData = canvas.toDataURL('image/png');
    console.log('Image data generated, length:', imageData.length);

    console.log('Sending image data to API');
    const response = await fetch('/api/upload-image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ imageData }),
    });

    console.log('API response received:', response);

    if (!response.ok) {
      console.error('API request failed:', response.statusText);
      return;
    }

    const { imageUrl } = await response.json();
    console.log('Image URL received:', imageUrl);

    const tweetText = encodeURIComponent(`🔥 I just got roasted on GitHub! Can you handle the heat?

Get your own savage roast at
https://fightme.live/

#GitHubRoast #CodeBurn #DevHumor`);

    const twitterUrl = `https://twitter.com/intent/tweet?text=${tweetText}&url=${encodeURIComponent(imageUrl)}`;
    console.log('Opening Twitter share URL:', twitterUrl);
    window.open(twitterUrl, '_blank');
  };

  return (
    <motion.div
      id="roast-card"  // Add this ID to the outer div
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
      <button
        onClick={shareOnTwitter}
        className="flex items-center justify-center bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded transition duration-300"
      >
        <FaTwitter className="mr-2" />
        Share on Twitter
      </button>
    </motion.div>
  );
}