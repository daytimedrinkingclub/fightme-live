'use client';

import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const router = useRouter();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-50">
      <h1 className="text-3xl md:text-4xl font-bold text-teal-600 mb-8 text-center">Welcome to GitHub Roaster</h1>
      <div className="flex flex-col items-center space-y-4 w-full max-w-xs">
        <button
          onClick={() => router.push('/githubroast')}
          className="w-full bg-teal-500 hover:bg-teal-700 text-white font-bold py-3 px-6 rounded text-lg"
        >
          GitHub Roast
        </button>
        <button
          onClick={() => router.push('/headtohead')}
          className="w-full bg-teal-500 hover:bg-teal-700 text-white font-bold py-3 px-6 rounded text-lg"
        >
          Head-to-Head Roast
        </button>
      </div>
    </main>
  );
}
