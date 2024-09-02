'use client'

import { useState } from 'react';
import InputForm from '../components/InputForm';
import RoastDisplay from '../components/RoastDisplay';

export default function Home() {
  const [roastData, setRoastData] = useState<{ roast: string, name: string, avatar_url: string } | null>(null);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-50">
      <h1 className="text-4xl font-bold text-teal-600 mb-8">GitHub Roaster</h1>
      <InputForm setRoastData={setRoastData} />
      {roastData && <RoastDisplay roastData={roastData} />}
    </main>
  );
}