'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import TwitterRoastDisplay from '@/components/TwitterRoastDisplay';
import CustomCursor from '@/components/CustomCursor';
import FlameAnimation from '@/components/FlameAnimation';


export default function TwitterRoastPage() {
  const { username } = useParams();
  const [roastData, setRoastData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRoast() {
      try {
        const response = await fetch(`/api/twitterroast/${username}`);
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

    if (username) {
      fetchRoast();
    }
  }, [username]);

  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-hidden">
      <CustomCursor />
      <FlameAnimation />

      {loading ? (
        <div className="flex justify-center mt-8">
          <div className="loader"></div>
        </div>
      ) : !roastData ? (
        <div className="text-center">Roast not found</div>
      ) : (
        <TwitterRoastDisplay roastData={roastData} enteredUsername={username as string} />
      )}
    </div>
  );
}