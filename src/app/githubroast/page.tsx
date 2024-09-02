'use client';

import { useState } from 'react';
import InputForm from '../../components/InputForm';
import RoastDisplay from '../../components/RoastDisplay';

export default function GitHubRoast() {
  const [roastData, setRoastData] = useState<{ roast: string, name: string, avatar_url: string } | null>(null);

  return (
    <div>
      <h1>GitHub Roaster</h1>
      <InputForm setRoastData={setRoastData} />
      {roastData && <RoastDisplay roastData={roastData} />}
    </div>
  );
}