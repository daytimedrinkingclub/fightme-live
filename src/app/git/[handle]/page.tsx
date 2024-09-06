'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import RoastDisplay from '@/components/RoastDisplay';

export default function GitRoastPage() {
  const { handle } = useParams();
  const [roastData, setRoastData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRoast() {
      try {
        const response = await fetch(`/api/git/${handle}`);
        if (response.ok) {
          const data = await response.json();
          setRoastData(data);
        } else {
          console.error('Failed to fetch roast');
        }
      } catch (error) {
        console.error('Error fetching roast:', error);
      } finally {
        setLoading(false);
      }
    }

    if (handle) {
      fetchRoast();
    }
  }, [handle]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!roastData) {
    return <div>Roast not found</div>;
  }

  return <RoastDisplay roastData={roastData} />;
}