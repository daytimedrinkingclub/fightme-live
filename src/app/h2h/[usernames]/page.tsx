'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ComparisonDisplay from '@/components/ComparisonDisplay';
import CustomCursor from '@/components/CustomCursor';
import FlameAnimation from '@/components/FlameAnimation';


export default function HeadToHeadPage() {
  const { usernames } = useParams();
  const [comparisonData, setComparisonData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchComparison() {
      console.log('Fetching comparison for usernames:', usernames);
      try {
        const response = await fetch(`/api/h2h/${usernames}`);
        if (response.ok) {
          const data = await response.json();
          console.log('Comparison data received:', data);
          setComparisonData(data);
        } else {
          console.error('Failed to fetch comparison');
        }
      } catch (error) {
        console.error('Error fetching comparison:', error);
      } finally {
        console.log('Fetch operation completed');
        setLoading(false);
      }
    }

    if (usernames) {
      fetchComparison();
    } else {
      console.log('No usernames provided');
    }
  }, [usernames]);

  console.log('Rendering HeadToHeadPage');
  console.log('Loading state:', loading);
  console.log('Comparison data:', comparisonData);

  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-hidden">
      <CustomCursor />
      <FlameAnimation />

      {loading ? (
        <div className="flex justify-center mt-8">
          <div className="loader"></div>
        </div>
      ) : !comparisonData ? (
        <div className="text-center">Comparison not found</div>
      ) : (
        <ComparisonDisplay comparisonData={comparisonData} />
      )}
    </div>
  );
}