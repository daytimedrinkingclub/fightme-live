'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ApiKeyInput } from '../components/ApiKeyInput';

export default function LandingPage() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const storedApiKey = localStorage.getItem('anthropicApiKey');
    if (!storedApiKey) {
      setIsModalOpen(true);
    }
  }, []);

  const handleApiKeySubmit = (key: string) => {
    localStorage.setItem('anthropicApiKey', key);
    setIsModalOpen(false);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-50 -mt-16">
      <h1 className="text-3xl sm:text-4xl font-bold text-teal-600 mb-12 text-center">Welcome to GitHub Roaster</h1>
      <div className="flex flex-col items-center space-y-6 w-full max-w-xs">
        <button
          onClick={() => router.push('/githubroast')}
          className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-4 px-6 rounded-lg w-full text-lg"
        >
          GitHub Roast
        </button>
        <button
          onClick={() => router.push('/headtohead')}
          className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-4 px-6 rounded-lg w-full text-lg"
        >
          Head-to-Head Roast
        </button>
        <button
          onClick={() => router.push('/spotify')}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-lg w-full text-lg"
        >
          Spotify Roast
        </button>
      </div>
      <ApiKeyInput onApiKeySubmit={handleApiKeySubmit} isOpen={isModalOpen} />
    </main>
  );
}
