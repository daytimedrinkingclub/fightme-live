'use client';

import { useState } from 'react';
import { useRouter } from 'next/router';
import InputForm from '../components/InputForm';
import RoastDisplay from '../components/RoastDisplay';

export default function Home() {
  const [roastData, setRoastData] = useState<{ roast: string, name: string, avatar_url: string } | null>(null);
  const router = useRouter();

  return (
    <div>
      <h1>GitHub Roaster</h1>
      <InputForm setRoastData={setRoastData} />
      {roastData && <RoastDisplay roastData={roastData} />}
      <button
        onClick={() => router.push('/headtohead')}
        className="mt-4 bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
      >
        Head-to-Head
      </button>
    </div>
  );
}
