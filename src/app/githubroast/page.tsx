'use client';

import { useState } from 'react';
import InputForm from '../../components/InputForm';
import RoastDisplay from '../../components/RoastDisplay';
import BackButton from '../../components/BackButton';

export default function GitHubRoast() {
  const [roastData, setRoastData] = useState<{ roast: string, name: string, avatar_url: string } | null>(null);
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4 relative">
      <BackButton />
      <h1 className="text-3xl md:text-4xl font-bold text-teal-600 mb-8 text-center">GitHub Roaster</h1>
      <InputForm setRoastData={setRoastData} setLoading={setLoading} />
      {loading && <div className="loader mt-8"></div>}
      {roastData && <RoastDisplay roastData={roastData} />}
    </div>
  );
}